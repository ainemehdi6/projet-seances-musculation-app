import { ExerciceService } from './../../services/exercice.service';
import { Exercice } from '../../models/exercice';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Seance } from 'src/app/seance/models/seance';
import { SeanceService } from 'src/app/seance/services/seance.service';


export interface ExerciceFormData {
  isCreateForm: boolean;
  exercice: Exercice;
}

@Component({
  selector: 'app-exercice-form',
  templateUrl: './exercice-form.component.html',
  styleUrls: ['./exercice-form.component.scss']
})
export class ExerciceFormComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  seances$: Observable<Seance[]>;

  exerciceForm = this.fb.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    exerciceImg: ['', [Validators.required]],
    nbrSeries: [4, [Validators.required]],
    nbrRepParSerie: [15, [Validators.required]],
    seance: ['', [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<ExerciceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExerciceFormData,
    private fb: FormBuilder,
    private exerciceService: ExerciceService,
    private _snackBar: MatSnackBar,
    private seanceService: SeanceService) {
    if (!data.isCreateForm) {
      this.setExerciceForm(data.exercice);
    }

  }

  ngOnInit(): void {
    this.seances$ = this.seanceService.get();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setExerciceForm(exercice: Exercice) {
    this.exerciceForm.setValue({
      id: exercice.id,
      name: exercice.name,
      description: exercice.description,
      exerciceImg: exercice.exerciceImg,
      nbrSeries: exercice.nbrSeries,
      nbrRepParSerie: exercice.nbrRepParSerie,
      seance: exercice.seance
    });
  }

  get title() {
    if (this.data.isCreateForm) {
      return 'Formulaire de création';
    }
    return 'Formulaire de modification';
  }

  get submitBtnName() {
    if (this.data.isCreateForm) {
      return 'Ajouter';
    }
    return 'Modifier';
  }

  onSubmit() {
    if (this.exerciceForm.valid) {
      if (this.data.isCreateForm) {
        this.exerciceForm.value.id = Date.now() + Math.random();
        this.exerciceService.create(this.exerciceForm.value as Exercice)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success']
            });

            this.dialogRef.close(true);
          });
      } else {
        this.exerciceService.update(this.exerciceForm.value as Exercice)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success']
            });
            this.dialogRef.close(true);
          });
      }
    }
  }
}
