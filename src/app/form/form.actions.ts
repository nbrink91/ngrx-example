import { Action } from '@ngrx/store';

export enum ActionTypes {
    Add = '[Form Component] Add',
}

export interface FormPayload {
    select1: string;
}

export class FormAction implements Action {
    readonly type = ActionTypes.Add;

    constructor(public payload: FormPayload) { }
}
