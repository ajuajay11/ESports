import {configureStore} from "@reduxjs/toolkit";
// setup using configure store 

const persistedState =localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")):{};

import authReducer from "./authSlice"
export const store = configureStore({
    reducer :{
        // here we need to add reducer
       auth : authReducer,
    },
    preloadedState:persistedState,
})

store.subscribe(()=>{
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});