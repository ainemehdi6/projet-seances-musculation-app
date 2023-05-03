import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeanceRoutingModule } from './seance-routing.module';
import { SeanceComponent } from './seance.component';
import { SharedModule } from '../shared/shared.module';
import { SeanceListComponent } from './pages/seance-list/seance-list.component';
import { SeanceService } from './services/seance.service';
import { SeanceFormComponent } from './components/seance-form/seance-form.component';
import { SeanceDetailsComponent } from './pages/seance-details/seance-details.component';
import { SeanceCardComponent } from './component/seance-card/seance-card.component';


@NgModule({
  declarations: [
    SeanceComponent,
    SeanceListComponent,
    SeanceFormComponent,
    SeanceDetailsComponent,
    SeanceCardComponent
  ],
  imports: [
    CommonModule,
    SeanceRoutingModule,
    SharedModule
  ],
  providers: [
    SeanceService
  ]
})
export class SeanceModule { }
