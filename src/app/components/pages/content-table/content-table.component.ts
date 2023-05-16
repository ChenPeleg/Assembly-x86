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
  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  public readonly docElement: DocElement = {
    children: [],
    father: null,
    name: "all",
    fullPath: [],
    type: "folder",
  };
  public pagesNames: string[][] | null = null;

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  @Input("pages") set pages(value: string[][]) {
    if (this.pagesNames) return;
    this.pagesNames = value;
    this.buildNestedDocElement(value);
  }

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  buildNestedDocElement(value: string[][]) {
    value.forEach((page) => {
      let lastFather = this.docElement;
      page.forEach((pagePartName, i) => {
        let element = lastFather.children.find((c) => c.name === pagePartName);
        if (element) {
          lastFather = element;
        } else {
          element = {
            children: [],
            father: lastFather,
            fullPath: [],
            name: pagePartName,
            type: i === page.length - 1 ? "file" : "folder",
          };
          lastFather.children.push(element);
          lastFather = element;
        }
      });
    });
    console.log(this.docElement);
  }
}
