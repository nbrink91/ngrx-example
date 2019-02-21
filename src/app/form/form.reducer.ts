import { ActionTypes, FormAction, FormPayload } from './form.actions';

export function formReducer(state: FormPayload[] = [], action: FormAction) {
    switch (action.type) {
        case ActionTypes.Add: {
            console.log(action.payload);
            return state.push(action.payload);
        }
        default:
            return state;
    }
}
