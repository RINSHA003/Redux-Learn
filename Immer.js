const redux = require('redux')
const createStore=redux.createStore
const produce=require('immer').produce

const initialState={
    name:'rinsha',
    place:'tirur',
    address:{
        street:'km road',
        pin:1234
    }
}

const STREETUPDATE = 'STREETUPDATE'

function streetUpdate(street){
    return{
        type:STREETUPDATE,
        payload:street
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case STREETUPDATE:
            // return {
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street:action.payload
            //     }
            // }
            return produce(state,(draft)=>{
                  draft.address.street=action.payload
            })
        default:
            return state
    }
}

const store=createStore(reducer)
console.log('initialstate',store.getState())
store.subscribe(()=>console.log('updated state',store.getState()))
store.dispatch(streetUpdate('tm'))

