import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeanceComponent } from './seance.component';
import { SeanceDetailsComponent } from './pages/seance-details/seance-details.component';
import { SeanceListComponent } from './pages/seance-list/seance-list.component';

const routes: Routes = [
  {
    path: '',
    component: SeanceListComponent
  },
  {
    path: ':id',
    component: SeanceDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeanceRoutingModule { }
