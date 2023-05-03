import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Seance } from '../../models/seance';

@Component({
  selector: 'app-seance-card',
  templateUrl: './seance-card.component.html',
  styleUrls: ['./seance-card.component.scss']
})
export class SeanceCardComponent implements OnInit {

  @Input() selectedSeance: Seance;
  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.received.emit(true)
  }

}
