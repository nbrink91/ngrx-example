import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { FormPayload, FormAction } from './form.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  public formControl1: FormControl;

  public select1: string[] = [
    'Option1',
    'Option2',
    'Option3'
  ];

  constructor(private store: Store<FormPayload[]>) {
    this.store.pipe(
      select('form'),
    ).subscribe((state: FormPayload) => {
      this.formControl1 = new FormControl(state ? state.select1 : undefined);

      this.formControl1.valueChanges.subscribe((value: string) => {
        this.store.dispatch(new FormAction({ select1: value }));
      });
    });
  }

}
