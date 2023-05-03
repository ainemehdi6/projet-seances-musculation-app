import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercice } from '../../models/exercice';

@Component({
  selector: 'app-exercice-card',
  templateUrl: './exercice-card.component.html',
  styleUrls: ['./exercice-card.component.scss']
})
export class ExerciceCardComponent implements OnInit {

  @Input() selectedExercice: Exercice;
  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.received.emit(true)
  }

}
