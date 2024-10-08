
const redux = require('redux');
const reduxlogger=require('redux-logger')
const logger=reduxlogger.createLogger()
const createStore = redux.createStore;
const bindActionCreators =redux.bindActionCreators
const CombinedReducer=redux.combineReducers
const applymiddleware=redux.applyMiddleware

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED='CAKE_RESTOCKED';
const ICECREAM_ORDERED='ICECREAM_ORDERED';
const ICECREAM_RESTOCKED='ICECREAM_RESTOCKED';

function orderCake() {
    return {
        type: CAKE_ORDERED,  
        quantity: 1
    };
}

function restockCake(qnty=1){
    return{
        type:CAKE_RESTOCKED,
        payload:qnty
    }
}

function icecreamordered(){
    return{
        type:'ICECREAM_ORDERED',
        quantity:1
    }
}

function icecreamrestocked(qnty=1){
    return{
        type:ICECREAM_RESTOCKED,
        payload:qnty

    }
}

const initialcakestate = {
    numOfCake: 10
};

const initialIcecreamstate={
    numOfIceCream:20
}


const cakeReducer = (state = initialcakestate, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCake: state.numOfCake - 1
            };
        case CAKE_RESTOCKED:
            return {
                ...state,
                numsOfCake:state.numOfCake + action.payload
            }
        default:
            return state;  
    }
};

const icecreamReducer=(state=initialIcecreamstate,action)=>{
    switch(action.type){
        case ICECREAM_ORDERED:
            return{
                ...state,
                numOfIceCream:state.numOfIceCream -1
            }
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                numOfIceCream:state.numOfIceCream + action.payload
            }
        default:
            return state
    }
}


// Combined Reducer
const RootReducer=CombinedReducer({
    cake:cakeReducer,
    iceCream:icecreamReducer
})


const store = createStore(RootReducer,applymiddleware(logger));

console.log('Initial state:', store.getState());


store.subscribe(() =>{});


// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3))

const actions=bindActionCreators({ orderCake,restockCake,icecreamordered,icecreamrestocked},store.dispatch)
actions.orderCake()
actions.restockCake()
actions.icecreamordered()
actions.icecreamrestocked()

const unsubscribe=store.subscribe(()=>console.log('hey',store.getState()))
store.dispatch(orderCake());
unsubscribe();
