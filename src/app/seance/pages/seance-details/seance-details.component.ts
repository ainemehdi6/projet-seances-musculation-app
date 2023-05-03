import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeanceService } from '../../services/seance.service';
import { Seance } from '../../models/seance';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-seance-details',
  templateUrl: './seance-details.component.html',
  styleUrls: ['./seance-details.component.scss']
})
export class SeanceDetailsComponent implements OnInit {

  seanceId: number;
  seance: Observable<Seance>;


  constructor(private route: ActivatedRoute, private seanceService: SeanceService, private location: Location) {
    /*
    route.params.subscribe(params => {
      this.seanceId = params['id'];
    })
    */
    this.seanceId = +this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    if (this.seanceId) {
      this.seance = this.seanceService.getById(this.seanceId);
    }
  }

  goBack() {
    this.location.back();
  }

  showReceivedValue(value: boolean) {
    console.log(value);
  }

}
