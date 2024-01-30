import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import  Axios  from 'axios';
import {ApiLink} from '../../apilinks/api'


export const getEmployees = createAsyncThunk('gets/getemployee', async()=>{
    return Axios.get(ApiLink.employedetails).then(res => {return res.data});
});


const employeeSlice = createSlice({
    name: "employee",
    initialState:{
        employee: [],
        loading:false
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getEmployees.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(getEmployees.fulfilled,(state,action)=>{
            state.loading = false;
            state.employee= action.payload; 
        })
        .addCase(getEmployees.rejected,(state,action)=>{
            state.loading = false;
        });
    }
});

export default employeeSlice.reducer;