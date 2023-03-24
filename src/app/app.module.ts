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
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from "./app.routing.module";
import {InstructionsComponent} from "./components/pages/instructions/instructions.component";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    InstructionsComponent,
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
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppRootComponent]
})
export class AppModule {

}
