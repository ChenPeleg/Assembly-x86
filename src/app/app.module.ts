import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CoreAppComponent } from "./components/core/core-app.component";
import { CpuComponent } from "./components/cpu/cpu";
import { RegisterComponent } from "./components/cpu/register";
import { MemoryComponent } from "./components/memory/memory";
import { ExecutionComponent } from "./components/execution/execution";
import { ConsoleComponent } from "./components/console/console";
import { AsmEditorComponent } from "./components/asm-editor/asm-editor";
import { FormsModule } from "@angular/forms";
import { AppRootComponent } from "./components/root/app-root.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule } from "./app.routing.module";
import { InstructionsComponent } from "./components/pages/instructions/instructions.component";
import { MatIconModule } from "@angular/material/icon";
import { NavBarComponent } from "./components/navbar/nav-bar.component";
import { LinksComponent } from "./components/pages/links/links.component";
import { PagesService } from "./services/pages.service";
import { HttpClientModule } from "@angular/common/http";
import { DocumentationComponent } from "./components/pages/documentation/documentation.component";
import { ContentTableComponent } from "./components/pages/content-table/content-table.component";
import { MatTreeModule } from "@angular/material/tree";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DisplayCockpitComponent } from "./components/display-cockpit/display-cockpit.component";
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    InstructionsComponent,
    NavBarComponent,
    LayoutComponent,
    AppRootComponent,
    CoreAppComponent,
    CpuComponent,
    RegisterComponent,
    MemoryComponent,
    ExecutionComponent,
    ConsoleComponent,
    LinksComponent,
    AsmEditorComponent,
    DocumentationComponent,
    ContentTableComponent,
    DisplayCockpitComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    AppRoutingModule,
    MatIconModule,
    MatTreeModule,
    MatTooltipModule,
    CdkDropList,
    CdkDrag,
  ],
  providers: [PagesService],
  bootstrap: [AppRootComponent],
})
export class AppModule {}
