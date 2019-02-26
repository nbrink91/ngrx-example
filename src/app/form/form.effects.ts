import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

@Injectable()
export class FormEffects {

  @Effect()
  loadMovies$ = this.actions$
    .pipe(
        ofType(ROUTER_NAVIGATION),
        mergeMap(() => this.moviesService.getAll().pipe(
            map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
            catchError(() => EMPTY)
        ))
    );


  constructor(
    private actions$: Actions
  ) {}
}