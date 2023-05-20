import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    username:'',
    notification:0,
    flag:false,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        fatchUser:(state,action)=>{
            state.username=action.payload.username
        },
        getnotification:(state,action)=>{
            state.notification= action.payload.numberofnotification
        },
        changeflage:(state)=>{
            state.flag = !state.flag
        }

    }
})

export default userSlice.reducer
export const {fatchUser,getnotification,changeflage} = userSlice.actions