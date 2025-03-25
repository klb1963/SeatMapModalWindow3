import {createStore} from 'redux'
import {StoreData} from '../interfaces/StoreData';

const defaultState: StoreData = {
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    method: 'GET',
    body: '',
    headers: '{}',
    response: ''
}

function reducer(state: StoreData = defaultState, action) {

    switch (action.type) {
        case 'SET_PARAMETER':
            return {
                ...state,
                [action.field]: action.newVal
            };
        default:
            return state
    }
}

export class LocalStore {

    public store = createStore(reducer);

    getData(): StoreData {
        return this.store.getState();
    }

}
