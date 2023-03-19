import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreAppComponent } from './components/app/core-app.component';
import {CpuComponent} from "./components/cpu/cpu";
import {RegisterComponent} from "./components/cpu/register";
import {MemoryComponent} from "./components/memory/memory";
import {ExecutionComponent} from "./components/execution/execution";
import {ConsoleComponent} from "./components/console/console";
import {AsmEditorComponent} from "./components/asm-editor/asm-editor";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
      CoreAppComponent,
      CpuComponent,
      RegisterComponent,
      MemoryComponent,
      ExecutionComponent,
      ConsoleComponent,
      AsmEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [CoreAppComponent]
})
export class AppModule
{

}
