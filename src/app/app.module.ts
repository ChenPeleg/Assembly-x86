import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CoreAppComponent } from "./components/core/core-app.component";
import { CpuPanelComponent } from "./components/cpu-panel/cpu-panel.component";
import { RegisterComponent } from "./components/cpu-panel/register";
import { MemoryComponent } from "./components/memory/memory";
import { ExecutionComponent } from "./components/execution/execution";
import { ConsoleComponent } from "./components/console/console";
import { FormsModule } from "@angular/forms";
import { AppRootComponent } from "./components/root/app-root.component";
import { LayoutComponent } from "./layout/layout.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule } from "./app.routing.module";
import { InstructionsComponent } from "./components/pages/instructions/instructions.component";
import { MatIconModule } from "@angular/material/icon";
import { NavBarComponent } from "./components/navbar/nav-bar.component";
import { WelcomePageComponent } from "./components/pages/welcome-page/welcome-page.component";
import { PagesService } from "./services/pages.service";
import { HttpClientModule } from "@angular/common/http";
import { DocumentationComponent } from "./components/pages/documentation/documentation.component";
import { ContentTableComponent } from "./components/pages/content-table/content-table.component";
import { MatTreeModule } from "@angular/material/tree";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DisplayCockpitComponent } from "./components/display-cockpit/display-cockpit.component";
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { StoreModule } from "@ngrx/store";
import { codeEditorReducer } from "./stores/reducers/code-editor.reducer";
import { UIStateReducer } from "./stores/reducers/ui.state.reducer";
import { SharedModule } from "./common/shared.module";
import { MatSliderModule } from "@angular/material/slider";
import { MemoryOptionsComponent } from "./components/memory-options/memory-options.component";
import { MatChipsModule } from "@angular/material/chips";
import { MemoryDisplayReducer } from "./stores/reducers/memory-display.reducer";
import { UserDataService } from "./services/user-data.service";
import { MatMenuModule } from "@angular/material/menu";
import { NgOptimizedImage } from "@angular/common";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatInputModule } from "@angular/material/input";
import { CodeMirrorHandlerComponent } from "./components/code/code-mirror-handler/code-mirror-handler.component";
import { CodeMirrorWrapperComponent } from "./components/code/code-mirror-wrapper/code-mirror-wrapper.component";
import { LegacyAsmEditorComponent } from "./components/legacy-asm-editor/legacy-asm-editor.component";

export const AllMatModules = [
  MatToolbarModule,
  MatCardModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatIconModule,
  MatTreeModule,
  MatTooltipModule,
  CdkDropList,
  CdkDrag,
];

@NgModule({
  declarations: [
    InstructionsComponent,
    NavBarComponent,
    LayoutComponent,
    AppRootComponent,
    CoreAppComponent,
    CpuPanelComponent,
    RegisterComponent,
    MemoryComponent,
    ExecutionComponent,
    ConsoleComponent,
    WelcomePageComponent,
    LegacyAsmEditorComponent,
    DocumentationComponent,
    ContentTableComponent,
    DisplayCockpitComponent,
    MemoryOptionsComponent,
    CodeMirrorWrapperComponent,
    CodeMirrorHandlerComponent,
  ],
  imports: [
    ...AllMatModules,
    StoreModule.forRoot(
      {
        count: codeEditorReducer,
        uiState: UIStateReducer,
        memoryDisplay: MemoryDisplayReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),

    // StoreModule.forRoot({ count: counterReducer }),
    SharedModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    AppRoutingModule,
    MatSliderModule,
    MatChipsModule,
    MatMenuModule,
    NgOptimizedImage,
    MatProgressBarModule,
    MatInputModule,
  ],
  providers: [PagesService, UserDataService],
  bootstrap: [AppRootComponent],
})
export class AppModule {}
