// these are action type
export const CREATE = 'CREATE'
export const UPDATE = 'UPDATE'
export const DELETE = 'DELETE'
export const LIKE = 'LIKE'
export const SEARCH = 'SEARCH' 
export const RESET = 'RESET' 


// for update a record / post
export const SET_ID = 'SET_ID'
export const ERASE_ID = 'ERASE_ID'


// for login and regiteration
export const AUTH = 'AUTH'
export const GOOGLEAUTH = 'GOOGLEAUTH'


//for spy Reducer / spy local Storaeg Token
export const FIRSTLOAD = 'FIRSTLOAD'
export const EVERLOAD = 'EVERLOAD'
export const LOGOUT = 'LOGOUT'


// for Single Post
export const FETCH_SINGLE = 'FETCH_SINGLE'
export const RESET_SINGLE = 'RESET_SINGLE'


// Parent comment Action 
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const EXRTA_COMMENT = 'EXRTA_COMMENT'

// child Comment
export const CHILD_COMMENT = 'CHILD_COMMENT'
export const NEW_CHILD = 'NEW_CHILD'
export const EXRTA_CHILD = 'EXRTA_CHILD'

// Loading Icon 
export const START = 'START'
export const END = 'END'

// Notification
export const SEND = 'SEND'
export const STOP = 'STOP'
export const READY = 'READY'

// tag user when reply in comment section
export const SET_TAG = 'SET_TAG'
export const RESET_TAG = 'RESET_TAG'