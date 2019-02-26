import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { FormPayload, FormAction } from './form.actions';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public value: FormControl = new FormControl();
  private sub: Subscription;

  constructor(
    private readonly store: Store<FormPayload[]>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams;
    if (params.value) {
      this.store.dispatch(new FormAction({ value: params.value }));
    }

    const storeSub = this.store.pipe(
      select('form')
    ).subscribe((payload: FormPayload) => {
      console.log(payload);
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: payload
      });
      this.value.patchValue(payload.value);
    });
    // const sub = this.store.pipe(
    //   select('router'),
    //   select('state'),
    //   select('queryParams')
    // ).subscribe((queryParams: any) => {
    //   console.log(`Patching: ${queryParams.value}`);
    //   console.log(queryParams);
    //   this.value.patchValue(queryParams.value);
    // });

    this.value.valueChanges.subscribe((value: string) => {
      console.log(`Navigating: ${value}`);
      storeSub.unsubscribe();
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { value }
      });
    });
  }
}
