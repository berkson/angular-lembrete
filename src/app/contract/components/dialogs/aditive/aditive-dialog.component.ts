import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contract } from 'src/app/shared';
import * as moment from 'moment';

@Component({
  selector: 'aditive-dialog',
  templateUrl: './aditive-dialog.component.html',
  styleUrls: ['./aditive-dialog.component.scss'],
})
export class AditiveDialogComponent implements OnInit {
  additiveForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<AditiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public contract: Contract,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  calcMaxMonths() {
    let months: number = moment(this.contract.finalDate).diff(
      moment.now(),
      'months'
    );
    return months < 0 ? 0 : months;
  }

  createForm() {
    this.additiveForm = this.fb.group({
      months: ['', [Validators.max(this.calcMaxMonths())]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
