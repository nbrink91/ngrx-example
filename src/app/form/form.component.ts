import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { FormPayload, FormAction } from './form.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  private formControl1: FormControl;

  private select1: string[] = [
    'Option1',
    'Option2',
    'Option3'
  ];

  constructor(private store: Store<FormPayload[]>) {
    store.pipe(
      select('form')
    ).subscribe(value => {
      console.log(value);
      this.formControl1 = new FormControl(value[0]);
    });
  }

  ngOnInit() {
    this.formControl1.valueChanges.subscribe(value => {
      this.store.dispatch(new FormAction({ select1: value }));
    });
  }

}
