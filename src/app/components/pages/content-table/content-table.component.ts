import { Component, Input, Renderer2 } from "@angular/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
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

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */

interface DocElement {
  type: "file" | "folder";
  name: string;
  fullPath: string[];
  father: DocElement | null;
  children: DocElement[];
  order: number;
  isSelected: boolean;
}

@Component({
  selector: "content-table",
  templateUrl: "./content-table.component.html",
  styleUrls: ["./content-table.component.scss"],
  animations: [
    trigger("slideVertical", [
      state(
        "*",
        style({
          height: 0,
        })
      ),
      state(
        "show",
        style({
          height: "*",
        })
      ),
      transition("* => show", [
        animate("200ms cubic-bezier(0.25, 0.8, 0.25, 1)"),
      ]),
    ]),
  ],
})
export class ContentTableComponent {
  public isMobile: boolean = getScreenMediaState().isMobile;
  treeControl = new NestedTreeControl<DocElement>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<DocElement>();
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

  constructor(private router: Router, private renderer: Renderer2) {}

  @Input("currentDoc") set currentDoc(value: string | null) {
    //this.setActiveElement(value).then((r) => r);
  }

  @Input("pages") set pages(value: string[][]) {
    if (this.pagesNames) return;
    this.pagesNames = value.slice(10, 18);
    let allDocElement = ContentTableComponent.buildNestedDocElement(value);
    // allDocElement = ContentTableComponent.reorderDocElement(allDocElement);
    this.docElement[0] = allDocElement[0];
    console.log(this.pagesNames);
    // console.log(JSON.stringify(allDocElement));
    console.log(allDocElement);
    this.dataSource.data = allDocElement[0].children;
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
    value.forEach((pageWithLevelArray, level) => {
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

    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;

    return isVisible;
  }

  generateNodeID(node: DocElement) {
    return `tree_node_${node.fullPath.join("_")}`.replace(/[\s ]/g, "_");
  }

  hasChild = (_: number, node: any) =>
    !!node.children && node.children.length > 0;

  setActiveElement = async (value: string | null) => {
    if (!this.docElement[0].children.length) {
      await sleep(200);
    }
    this.docElement[0] = this.setActiveDocElement(
      this.docElement,
      PagesService.DocIdToNamePage(value || "")
    )[0];
    this.expandParents(PagesService.DocIdToNamePage(value || ""));
  };

  setActiveDocElement(docElement: DocElement[], path: string[]): DocElement[] {
    const recursiveSetSelectedDocElement = (
      docElement: DocElement
    ): DocElement => {
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
    await this.router.navigate(["docs", docId]);
  }

  private expandParents(docs: string[]) {
    let currentNode: DocElement | null = this.docElement[0];
    docs.forEach((doc) => {
      currentNode = currentNode?.children.find((c) => c.name === doc) || null;
      if (currentNode) {
        this.treeControl.expand(currentNode);
      }
    });
    if (this.isMobile) {
      return;
    }
    const nodeID = this.generateNodeID(currentNode);

    const element = this.renderer.selectRootElement(`#${nodeID}`, true);

    if (!ContentTableComponent.isScrolledIntoView(element)) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}
