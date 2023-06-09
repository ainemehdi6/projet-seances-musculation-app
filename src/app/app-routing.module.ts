import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'exercices',
    pathMatch: 'full'
  },
  {
    path: 'exercices',
    loadChildren: () => import('./exercice/exercice.module').then(m => m.ExerciceModule)
  },
  {
    path: 'seances',
    loadChildren: () => import('./seance/seance.module').then(m => m.SeanceModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
