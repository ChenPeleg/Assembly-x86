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
import { AppRoutingModule } from "./app.routing.module";
import { InstructionsComponent } from "./components/pages/instructions/instructions.component";
import { NavBarComponent } from "./components/navbar/nav-bar.component";
import { WelcomePageComponent } from "./components/pages/welcome-page/welcome-page.component";
import { PagesService } from "./services/pages.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { DocumentationComponent } from "./components/pages/documentation/documentation.component";
import { ContentTableComponent } from "./components/pages/content-table/content-table.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DisplayCockpitComponent } from "./components/display-cockpit/display-cockpit.component";
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { SharedModule } from "./common/shared.module";
import { MemoryOptionsComponent } from "./components/memory-options/memory-options.component";
import { UserDataService } from "./services/user-data.service";
import { NgOptimizedImage } from "@angular/common";
import { CodeEditorComponent } from "./components/code/code-editor/code-editor.component";

export const AllCdkModules = [
  CdkDropList,
  CdkDrag,
];

@NgModule({ declarations: [
        InstructionsComponent,
        NavBarComponent,
        LayoutComponent,
        AppRootComponent,
        CoreAppComponent,
        CpuPanelComponent,
        RegisterComponent,
        MemoryComponent,
        ExecutionComponent,
        CodeEditorComponent,
        ConsoleComponent,
        WelcomePageComponent,
        DocumentationComponent,
        ContentTableComponent,
        DisplayCockpitComponent,
        MemoryOptionsComponent,
    ],
    bootstrap: [AppRootComponent], imports: [...AllCdkModules,
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        NgOptimizedImage], providers: [PagesService, UserDataService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
