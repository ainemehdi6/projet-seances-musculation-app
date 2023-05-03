import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { SeanceFormComponent } from '../../components/seance-form/seance-form.component';
import { Seance } from '../../models/seance';
import { SeanceService } from '../../services/seance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seance-list',
  templateUrl: './seance-list.component.html',
  styleUrls: ['./seance-list.component.scss']
})
export class SeanceListComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['name', 'description', 'date', 'update', 'delete'];

  seances: Observable<Seance[]>;


  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private seanceService: SeanceService, private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router) {


  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  ngOnInit(): void {
    this.fetchData();
  }

  openSeanceForm(seance?: Seance) {
    const dialogRef = this.dialog.open(SeanceFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: seance ? false : true,
        seance: seance ? seance : undefined
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.fetchData();
        }
      });
  }

  fetchData() {
    this.seances = this.seanceService.get();
  }

  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer cet seance ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Oui',
        noButtonLabel: 'Non',
      },
    })

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.seanceService.delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success']
              });
              this.fetchData();
            });
        }
      });
  }

  showSeanceDetails(seanceId: number) {
    this.router.navigate(['/seances/' + seanceId]);
  }

}