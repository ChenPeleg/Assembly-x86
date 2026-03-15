import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { PagesService } from "../../../services/pages.service";
import { Router } from "@angular/router";
import { sleep } from "../../../util/sleep";
import { getScreenMediaState } from "../../../util/screenMediaSatate";
import { extractNumberFromFileName } from "../../../util/extractNumberFromFileName";

export interface DocElement {
  type: "file" | "folder";
  name: string;
  fullPath: string[];
  father: DocElement | null;
  children: DocElement[];
  order: number;
  isSelected: boolean;
}

export interface FlatDocNode extends DocElement {
  level: number;
  visible: boolean;
}

@Component({
    selector: "content-table",
    templateUrl: "./content-table.component.html",
    styleUrls: ["./content-table.component.css"],
    animations: [
        trigger("slideVertical", [
            state("*", style({ height: 0 })),
            state("show", style({ height: "*" })),
            transition("* => show", [animate("200ms cubic-bezier(0.25, 0.8, 0.25, 1)")]),
        ]),
    ],
    standalone: false
})
export class ContentTableComponent {
  @Output()
  public contentTableItemClicked: EventEmitter<DocElement> = new EventEmitter<DocElement>();
  public isMobile: boolean = getScreenMediaState().isMobile;
  public readonly docElement: DocElement[] = [
    {
      children: [],
      father: null,
      name: "all",
      fullPath: [],
      type: "folder",
      order: 0,
      isSelected: false,
    },
  ];
  public pagesNames: string[][] | null = null;
  public flatNodes: FlatDocNode[] = [];
  private expandedNodes: Set<string> = new Set();

  constructor(private router: Router, private renderer: Renderer2) {}

  @Input("currentDoc") set currentDoc(value: string | null) {
    this.setActiveElement(value).then((r) => r);
  }

  @Input("pages") set pages(value: string[][]) {
    if (this.pagesNames) return;
    this.pagesNames = value;
    let allDocElement = ContentTableComponent.buildNestedDocElement(value);
    allDocElement = ContentTableComponent.reorderDocElement(allDocElement);
    this.docElement[0] = allDocElement[0];
    this.rebuildFlatNodes();
  }

  static buildNestedDocElement(value: string[][]): DocElement[] {
    const cloneFatherAndRemoveChildren = (father: DocElement) => {
      return father
        ? {
            children: [],
            father: father.father ? { ...father.father, children: [] } : null,
            name: father.name,
            fullPath: father.fullPath,
            type: father.type,
            order: father.order,
            isSelected: father.isSelected,
          }
        : null;
    };
    const docElement: DocElement[] = [
      {
        name: "all",
        type: "folder",
        fullPath: [],
        father: null,
        children: [],
        order: 0,
        isSelected: false,
      },
    ];
    value.forEach((pageWithLevelArray) => {
      let lastFatherOfThisDocument: DocElement = docElement[0];
      pageWithLevelArray.forEach((pagePartName, i) => {
        let element = lastFatherOfThisDocument.children.find(
          (c) => c.name === pagePartName
        );
        if (element) {
          lastFatherOfThisDocument = element;
        } else {
          element = {
            name: pagePartName,
            type: i === pageWithLevelArray.length - 1 ? "file" : "folder",
            fullPath: [
              ...lastFatherOfThisDocument.fullPath,
              pagePartName,
            ].filter((n) => n),
            children: [],
            father: cloneFatherAndRemoveChildren(lastFatherOfThisDocument),
            order: i === pageWithLevelArray.length - 1 ? -1 : 0,
            isSelected: false,
          };
          lastFatherOfThisDocument.children.push(element);
          lastFatherOfThisDocument = element;
        }
      });
    });
    return docElement;
  }

  static reorderDocElement(docElement: DocElement[]): DocElement[] {
    const recursiveSortDocElement = (docElement: DocElement): DocElement => {
      docElement.children.sort((a, b) => b.order - a.order);
      docElement.children = docElement.children.map((c) =>
        recursiveSortDocElement(c)
      );
      return docElement;
    };
    return docElement.map((d) => recursiveSortDocElement(d));
  }

  static isScrolledIntoView(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    return elemTop >= 0 && elemBottom <= window.innerHeight;
  }

  public calculateNodeName(node: DocElement): string {
    const allNumbers = node.fullPath.map(
      (n) => extractNumberFromFileName(n).number
    );
    const nodeNameText = extractNumberFromFileName(node.name).text;
    return `${allNumbers.join(".")} ${nodeNameText}`;
  }

  generateNodeID(node: DocElement) {
    return `tree_node_${node.fullPath.join("_")}`.replace(/[\s ]/g, "_");
  }

  hasChildren(node: DocElement): boolean {
    return !!node.children && node.children.length > 0;
  }

  isExpanded(node: DocElement): boolean {
    return this.expandedNodes.has(node.fullPath.join("/"));
  }

  toggleNode(node: DocElement) {
    const key = node.fullPath.join("/");
    if (this.expandedNodes.has(key)) {
      this.expandedNodes.delete(key);
    } else {
      this.expandedNodes.add(key);
    }
    this.rebuildFlatNodes();
  }

  setActiveElement = async (value: string | null) => {
    if (!this.docElement[0].children.length) {
      await sleep(200);
    }
    this.docElement[0] = this.setActiveDocElement(
      this.docElement,
      PagesService.DocIdToNamePage(value || "")
    )[0];
    this.expandParents(PagesService.DocIdToNamePage(value || ""));
    this.rebuildFlatNodes();
  };

  setActiveDocElement(docElement: DocElement[], path: string[]): DocElement[] {
    const recursiveSetSelectedDocElement = (docElement: DocElement): DocElement => {
      docElement.isSelected = false;
      if (docElement.fullPath[0] === path[0]) {
        if (docElement.fullPath.join() === path.join()) {
          docElement.isSelected = true;
        }
      }
      docElement.children = docElement.children.map((c) =>
        recursiveSetSelectedDocElement(c)
      );
      return docElement;
    };
    return docElement.map((d) => recursiveSetSelectedDocElement(d));
  }

  async clickLink(node: DocElement) {
    const docId = PagesService.NamePageToDocId(node.fullPath);
    this.contentTableItemClicked.emit(node);
    await this.router.navigate(["docs", docId]);
  }

  private rebuildFlatNodes() {
    this.flatNodes = [];
    this.buildFlatNodes(this.docElement[0].children, 0);
  }

  private buildFlatNodes(nodes: DocElement[], level: number) {
    for (const node of nodes) {
      const flatNode: FlatDocNode = { ...node, level, visible: true };
      this.flatNodes.push(flatNode);
      if (this.hasChildren(node) && this.isExpanded(node)) {
        this.buildFlatNodes(node.children, level + 1);
      }
    }
  }

  private expandParents(docs: string[]) {
    let currentNode: DocElement | null = this.docElement[0];
    docs.forEach((doc) => {
      currentNode = currentNode?.children.find((c) => c.name === doc) || null;
      if (currentNode && currentNode.father !== null) {
        const parentPath = currentNode.fullPath.slice(0, -1).join("/");
        this.expandedNodes.add(parentPath);
      }
      if (currentNode) {
        const key = currentNode.fullPath.slice(0, -1).join("/");
        if (key) this.expandedNodes.add(key);
      }
    });

    this.rebuildFlatNodes();

    if (this.isMobile) {
      return;
    }

    const nodeID = this.generateNodeID(currentNode as DocElement);
    const element = this.renderer.selectRootElement(`#${nodeID}`, true);
    if (!ContentTableComponent.isScrolledIntoView(element)) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}
