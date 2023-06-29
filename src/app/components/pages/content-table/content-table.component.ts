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
import { getScreenMediaState } from "../../../styles/getScreenMediaSatate";

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
      transition("* => *", [animate("400ms cubic-bezier(0.25, 0.8, 0.25, 1)")]),
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
    this.setActiveElement(value).then((r) => r);
  }

  @Input("pages") set pages(value: string[][]) {
    if (this.pagesNames) return;
    this.pagesNames = value;
    let allDocElement = ContentTableComponent.buildNestedDocElement(value);
    allDocElement = ContentTableComponent.reorderDocElement(allDocElement);
    this.docElement[0] = allDocElement[0];
    this.dataSource.data = allDocElement[0].children;
  }

  static buildNestedDocElement(value: string[][]): DocElement[] {
    const docElement: DocElement[] = [
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
    value.forEach((page) => {
      let lastFather: DocElement = docElement[0];
      page.forEach((pagePartName, i) => {
        let element = lastFather.children.find((c) => c.name === pagePartName);
        if (element) {
          lastFather = element;
        } else {
          element = {
            children: [],
            father: lastFather,
            fullPath: [...lastFather.fullPath, pagePartName].filter((n) => n),
            name: pagePartName,
            type: i === page.length - 1 ? "file" : "folder",
            order: i === page.length - 1 ? -1 : 0,
            isSelected: false,
          };
          lastFather.children.push(element);
          lastFather = element;
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
    const nodeID = `tree_node_${currentNode.fullPath.join("_")}`;
    const element = this.renderer.selectRootElement(`#${nodeID}`, true);
    if (!ContentTableComponent.isScrolledIntoView(element)) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}
