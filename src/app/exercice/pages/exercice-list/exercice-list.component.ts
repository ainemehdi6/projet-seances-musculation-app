import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { ExerciceFormComponent } from '../../components/exercice-form/exercice-form.component';
import { Exercice } from '../../models/exercice';
import { ExerciceService } from '../../services/exercice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercice-list',
  templateUrl: './exercice-list.component.html',
  styleUrls: ['./exercice-list.component.scss']
})
export class ExerciceListComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['name', 'description', 'nbrSeries', 'nbrRepParSerie', 'exerciceImg', 'seance', 'update', 'delete'];

  exercices: Observable<Exercice[]>;


  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private exerciceService: ExerciceService, private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router) {


  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  ngOnInit(): void {
    this.fetchData();
  }

  openExerciceForm(exercice?: Exercice) {
    const dialogRef = this.dialog.open(ExerciceFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: exercice ? false : true,
        exercice: exercice ? exercice : undefined
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
    this.exercices = this.exerciceService.get();
  }

  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer cet exercice ?',
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
          this.exerciceService.delete(id)
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

  showExerciceDetails(exerciceId: number) {
    this.router.navigate(['/exercices/' + exerciceId]);
  }

}