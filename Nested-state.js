const redux = require('redux')
const createStore=redux.createStore

const initialState={
    name:'rinsha',
    place:'tirur',
    address:{
        street:'km road',
        post:'qwerty',
    }
}

const STREETUPDATE= 'STREETUPDATE'

function updateState(street){
    return{
        type:STREETUPDATE,
        payload:street
    }
}

const StreetReducer=(state=initialState,action)=>{
    switch(action.type){
        case STREETUPDATE:
            return {
                ...state,
                address:{
                   ...state.address,
                   street:action.payload
                }
            }
        default:
            return state
    }
}

const store=createStore(StreetReducer)
console.log('initialState',store.getState())
store.subscribe(()=>console.log('upadtedstate',store.getState()))
store.dispatch(updateState('tm road'))
