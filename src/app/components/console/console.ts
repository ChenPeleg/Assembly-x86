import {Component} from "@angular/core";

@Component({
    selector: "console",
    templateUrl: "./console.html"
})
export class ConsoleComponent
{
    public value: string = "";

    public print(value: string)
    {
        this.value += value;
    }

     clear()
    {
        this.value = "";
    }
}
