import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciceRoutingModule } from './exercice-routing.module';
import { ExerciceComponent } from './exercice.component';
import { SharedModule } from '../shared/shared.module';
import { ExerciceListComponent } from './pages/exercice-list/exercice-list.component';
import { ExerciceService } from './services/exercice.service';
import { ExerciceFormComponent } from './components/exercice-form/exercice-form.component';
import { ExerciceDetailsComponent } from './pages/exercice-details/exercice-details.component';
import { ExerciceCardComponent } from './component/exercice-card/exercice-card.component';
import { MatCardModule } from '@angular/material/card';
import { SeanceService } from '../seance/services/seance.service';


@NgModule({
  declarations: [
    ExerciceComponent,
    ExerciceListComponent,
    ExerciceFormComponent,
    ExerciceDetailsComponent,
    ExerciceCardComponent
  ],
  imports: [
    CommonModule,
    ExerciceRoutingModule,
    SharedModule,
    MatCardModule
  ],
  providers: [
    ExerciceService,
    SeanceService,
  ]
})
export class ExerciceModule { }
