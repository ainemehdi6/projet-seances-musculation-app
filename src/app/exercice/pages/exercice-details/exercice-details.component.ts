import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciceService } from '../../services/exercice.service';
import { Exercice } from '../../models/exercice';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-exercice-details',
  templateUrl: './exercice-details.component.html',
  styleUrls: ['./exercice-details.component.scss']
})
export class ExerciceDetailsComponent implements OnInit {

  exerciceId: number;
  exercice: Observable<Exercice>;


  constructor(private route: ActivatedRoute, private exerciceService: ExerciceService, private location: Location) {
    /*
    route.params.subscribe(params => {
      this.exerciceId = params['id'];
    })
    */
    this.exerciceId = +this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    if (this.exerciceId) {
      this.exercice = this.exerciceService.getById(this.exerciceId);
    }
  }

  goBack() {
    this.location.back();
  }

  showReceivedValue(value: boolean) {
    console.log(value);
  }

}
