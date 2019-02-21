import { ActionTypes, FormAction, FormPayload } from './form.actions';

export function formReducer(state: FormPayload, action: FormAction): FormPayload | undefined {
    switch (action.type) {
        case ActionTypes.Add: {
            return action.payload;
        }
        default:
            return state;
    }
}
