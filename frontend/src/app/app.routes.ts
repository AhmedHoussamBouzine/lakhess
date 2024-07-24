import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { ResultComponent } from './layouts/result/result.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/main",
    pathMatch: "full",
  },
  { path: "main", component: MainComponent },
  { path: "result", component: ResultComponent },
];
