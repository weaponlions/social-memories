import { combineReducers } from "redux";
import * as code from './actionTypes'
import { authReducer, spyReducer } from "./auth";


const postState = []
 
const postReducer = (state = postState, {type, payload}) =>{
    switch (type) {
        case code.CREATE: 
            if (state[0].length === 0) {
                return [{totalPage: 1, data: [payload], currentPage: 1 }]
            }  
            return [{...state[0], data: [payload, ...state[0]['data']] }]

        case code.UPDATE:
            return [{...state[0], data: state[0]['data'].map((post) => post._id === payload._id ? payload : post ) }]

        case code.SEARCH: 
            return [payload]

        case code.DELETE:
            // eslint-disable-next-line
            return [{...state[0], data: state[0]['data'].filter((post) => {if(post._id !== payload) return post}) }]
        
        case code.RESET: 
            return []
            
        case code.LIKE:
            return [{...state[0], data: state[0]['data'].map((post) => post._id === payload._id ? payload : post ) }] 

        default:
            return state
    }
}

// reducer for single Post
const singleData = null

const singlePost = (state=singleData, {type , payload} ) => {
    switch (type) {
        case code.FETCH_SINGLE:
             return payload
    
        case code.RESET_SINGLE:
             return null
        default:
            return state
    }
}

// these step for current post id reach to form page use for update data
const myID = null
 
const updateIdReducer = (state=myID, {type, payload}) => {
    switch (type) { 
        case code.SET_ID:
            return payload

        case code.ERASE_ID:
            return null
            
        default:
            return state 
    }
}


// comment Section

const commentState = []

const commentReducer = (state=commentState, {type, payload}) => {
    switch (type) {
        case code.FETCH_COMMENT:
            return [payload]
        
        case code.EXRTA_COMMENT:
            return [{...payload, data : [...state[0]['data'], ...payload['data']] }] 
        
        case code.CREATE_COMMENT:
            return [{...state[0] , data : [payload, ...state[0]['data']] }]

        case code.UPDATE_COMMENT: 
            return [{...state[0] , data : [...state[0]['data'].filter((comment) => comment._id === payload.parentID ? (comment['childExist'] = true) : comment )] }] 

        default:
            return state
    }
}
 

const childState = []

const childReducer = (state=childState, {type, payload}) => { 
    switch (type) {
        case code.CHILD_COMMENT:
            return [payload]

        case code.NEW_CHILD:
            if (state.length === 0)  
                return [{currentPage : 1, totalPage : 1, data : { [payload['parentID']] : [payload]}, commentID : [payload['parentID']]}]
            return [{...state[0], data: { [state[0]['commentID']] : [payload, ...state[0]['data'][state[0]['commentID']] ]} }]
            
        case code.EXRTA_CHILD:
            return [{...payload, data : [...state[0]['data'], ...payload['data']] }]
        default:
            return state
    }
}


const tagUserState = null

const tagUserReducer = (state=tagUserState, {type, payload}) => { 
    switch (type) {
        case code.SET_TAG: 
            return payload

        case code.RESET_TAG:
            return null

        default:
            return state
    }
}

const loading = true

const loadingReducer = (state = loading, {type, payload}) => {
    switch (type) {
        case code.START:
            return true
        
        case code.END:
            return false

        default:
            return state
    }
}


const alert = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    mode: 'success'
  }

const alertReducer = (state = alert, {type, payload}) => {
    switch (type) {
        case code.READY:
            return {...state, ...payload}

        case code.SEND:
            return {...state, open : true, ...payload}

        case code.STOP:
            return {...state, open: false}
    
        default:
            return state
    }
}

export default combineReducers({postReducer, updateIdReducer, authReducer, spyReducer, singlePost, commentReducer, childReducer, tagUserReducer, alertReducer, loadingReducer})