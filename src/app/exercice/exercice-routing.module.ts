import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciceComponent } from './exercice.component';
import { ExerciceDetailsComponent } from './pages/exercice-details/exercice-details.component';
import { ExerciceListComponent } from './pages/exercice-list/exercice-list.component';

const routes: Routes = [
  {
    path: '',
    component: ExerciceListComponent
  },
  {
    path: ':id',
    component: ExerciceDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciceRoutingModule { }
