import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {CoreAppComponent} from './components/core/core-app.component';
import {CpuComponent} from "./components/cpu/cpu";
import {RegisterComponent} from "./components/cpu/register";
import {MemoryComponent} from "./components/memory/memory";
import {ExecutionComponent} from "./components/execution/execution";
import {ConsoleComponent} from "./components/console/console";
import {AsmEditorComponent} from "./components/asm-editor/asm-editor";
import {FormsModule} from "@angular/forms";
import {AppRootComponent} from "./components/root/app-root.component";
import {LayoutComponent} from "./components/layout/layout.component";

@NgModule({
  declarations: [
    LayoutComponent,
    AppRootComponent,
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
  bootstrap: [AppRootComponent]
})
export class AppModule {

}
