import {Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {TasksComponent} from "./components/tasks/tasks.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];
