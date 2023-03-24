import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppRootComponent} from "./components/root/app-root.component";
import {InstructionsComponent} from "./components/pages/instructions/instructions.component"; // CLI imports router

const routes: Routes = [
  { path: 'second-component', component: AppRootComponent },
  { path: '', component: InstructionsComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
