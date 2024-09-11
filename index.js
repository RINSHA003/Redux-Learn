
const redux = require('redux');
const createStore = redux.createStore;

const CAKE_ORDERED = 'CAKE_ORDERED';

function orderCake() {
    return {
        type: CAKE_ORDERED,  
        quantity: 1
    };
}


const initialState = {
    numOfCake: 10
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCake: state.numOfCake - 1
            };
        default:
            return state;  
    }
};


const store = createStore(reducer);

console.log('Initial state:', store.getState());


store.subscribe(() => console.log('Updated state:', store.getState()));


store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

const unsubscribe=store.subscribe(()=>console.log('hey',store.getState()))
store.dispatch(orderCake());
unsubscribe();
store.dispatch(orderCake());