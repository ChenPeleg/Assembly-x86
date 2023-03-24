import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppRootComponent} from "./components/root/app-root.component";
import {InstructionsComponent} from "./components/pages/instructions/instructions.component";
import {CoreAppComponent} from "./components/core/core-app.component"; // CLI imports router

const routes: Routes = [
  { path:  '', component: CoreAppComponent },
  { path: 'instructions', component: InstructionsComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
