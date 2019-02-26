import { Action } from '@ngrx/store';

export enum ActionTypes {
    Add = '[Form Component] Add',
}

export interface FormPayload {
    value: string;
}

export class FormAction implements Action {
    readonly type = ActionTypes.Add;

    constructor(public payload: FormPayload) { }
}
