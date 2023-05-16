import { Component, Input } from "@angular/core";

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
})
export class ContentTableComponent {
  public readonly docElement: DocElement = {
    children: [],
    father: null,
    name: "all",
    fullPath: [],
    type: "folder",
  };
  public pagesNames: string[][] | null = null;

  constructor() {}

  @Input("pages") set pages(value: string[][]) {
    if (this.pagesNames) return;
    this.pagesNames = value;
    this.buildNestedDocElement(value);
  }

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
