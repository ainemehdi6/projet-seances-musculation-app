import { SeanceService } from './../../services/seance.service';
import { Seance } from '../../models/seance';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface SeanceFormData {
  isCreateForm: boolean;
  seance: Seance;
}

@Component({
  selector: 'app-seance-form',
  templateUrl: './seance-form.component.html',
  styleUrls: ['./seance-form.component.scss']
})
export class SeanceFormComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  seanceForm = this.fb.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    date: ['', [Validators.required]],
  });

  constructor(public dialogRef: MatDialogRef<SeanceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SeanceFormData, private fb: FormBuilder,
    private seanceService: SeanceService, private _snackBar: MatSnackBar) {

    if (!data.isCreateForm) {
      this.setSeanceForm(data.seance);
    }

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setSeanceForm(seance: Seance) {
    this.seanceForm.setValue({
      id: seance.id,
      name: seance.name,
      description: seance.description,
      date: seance.date,
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
    if (this.seanceForm.valid) {
      this.seanceForm.value.date = new Date(this.seanceForm.value.date).toISOString();
      if (this.data.isCreateForm) {
        this.seanceForm.value.id = Date.now() + Math.random();
        this.seanceService.create(this.seanceForm.value as Seance)
          .pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            this._snackBar.open(result, '', {
              duration: 2000,
              panelClass: ['bg-success']
            });

            this.dialogRef.close(true);
          });
      } else {
        this.seanceService.update(this.seanceForm.value as Seance)
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
