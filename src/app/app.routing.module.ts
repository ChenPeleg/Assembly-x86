import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InstructionsComponent } from "./components/pages/instructions/instructions.component";
import { CoreAppComponent } from "./components/core/core-app.component";
import { WelcomePageComponent } from "./components/pages/welcome-page/welcome-page.component";
import { DocumentationComponent } from "./components/pages/documentation/documentation.component";
import { CodeMirrorComponent } from "./components/code/code-mirror.component";

const routes: Routes = [
  { path: "", component: CoreAppComponent },
  { path: "instructions", component: InstructionsComponent },
  { path: "links", component: WelcomePageComponent },
  { path: "docs/:docId", component: DocumentationComponent },
  { path: "docs", component: DocumentationComponent },
  { path: "code-mirror", component: CodeMirrorComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
