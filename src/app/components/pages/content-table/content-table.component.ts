import { Component, Input } from "@angular/core";
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

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: "Fruit",
    children: [{ name: "Apple" }, { name: "Banana" }, { name: "Fruit loops" }],
  },
  {
    name: "Vegetables",
    children: [
      {
        name: "Green",
        children: [{ name: "Broccoli" }, { name: "Brussels sprouts" }],
      },
      {
        name: "Orange",
        children: [{ name: "Pumpkins" }, { name: "Carrots" }],
      },
    ],
  },
];

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

  constructor(private router: Router) {}

  @Input("currentDoc") set currentDoc(value: string | null) {
    this.setActiveElement(value).then((r) => r);
  }

  @Input("pages") set pages(value: string[][]) {
    if (this.pagesNames) return;
    this.pagesNames = value;
    let allDocElement = this.buildNestedDocElement(value);
    allDocElement = this.reorderDocElement(allDocElement);
    this.docElement[0] = allDocElement[0];
    this.dataSource.data = allDocElement[0].children;
  }

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  setActiveElement = async (value: string | null) => {
    if (!this.docElement[0].children.length) {
    }
    this.docElement[0] = this.setActiveDocElement(
      this.docElement,
      PagesService.DocIdToNamePage(value || "")
    )[0];
  };

  buildNestedDocElement(value: string[][]): DocElement[] {
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

  reorderDocElement(docElement: DocElement[]): DocElement[] {
    const recursiveSortDocElement = (docElement: DocElement): DocElement => {
      docElement.children.sort((a, b) => b.order - a.order);
      docElement.children = docElement.children.map((c) =>
        recursiveSortDocElement(c)
      );
      return docElement;
    };
    return docElement.map((d) => recursiveSortDocElement(d));
  }

  setActiveDocElement(docElement: DocElement[], path: string[]): DocElement[] {
    const recursiveSetSelectedDocElement = (
      docElement: DocElement
    ): DocElement => {
      console.log(docElement);
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
}
