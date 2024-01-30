import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import Axios from 'axios';
import {ApiLink} from '../../apilinks/api'

//Get
export const getconsoles = createAsyncThunk('consoles/getconsoles',async()=>{
    return Axios.get(ApiLink.consoles)
                .then(res => {return res.data});
});
//Post
export const postconsoles = createAsyncThunk('consoles/postconsoles',async(newconsoles)=>{
    return Axios.post(ApiLink.consoles,newconsoles)
          .then(res => {return res.data});
});
//Put
export const putconsoles = createAsyncThunk('consoles/putconsoles',async(putdata)=>{
    const {id, ...restData} = putdata;
    return await Axios.put(`${ApiLink.consoles}/${id}`,{id,...restData}).then(res => res.data);
});
//Delete
export const deleteconsoles = createAsyncThunk('consoles/deleteconsoles',async(id)=>{
    console.log(id);
    return Axios.delete(`${ApiLink.consoles}/${id}`)
                .then(()=> id);
});


const consoleSlice = createSlice({
    name:"consoles",
    initialState:{
        consoles:[],
        consolesloading:false
    },
    extraReducers: (builder) =>{
        builder
        //Get
        .addCase(getconsoles.pending,(state)=>{
            state.consolesloading = true;
        })
        .addCase(getconsoles.fulfilled,(state,action)=>{
            state.consolesloading = false;
            state.consoles = action.payload;
        })
        .addCase(getconsoles.rejected,(state)=>{
            state.consolesloading = false;
        })
        //Post
        .addCase(postconsoles.pending, (state) => {
            state.loading = true;
        })
        .addCase(postconsoles.fulfilled, (state, action) => {
            state.loading = false;
            state.consoles = [...state.consoles, action.payload]
        })
        .addCase(postconsoles.rejected, (state) => {
            state.loading = false;
        })
         // Put 
         .addCase(putconsoles.pending, (state) => {
            state.loading = true;
        })
        .addCase(putconsoles.fulfilled, (state, action) => {
            state.loading = false;
            state.consoles = state.consoles.map((item) => item.id === action.payload.id ? action.payload : item);
        })
        .addCase(putconsoles.rejected, (state) => {
            state.loading = false;
        })
         // Delete 
      .addCase(deleteconsoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteconsoles.fulfilled, (state, action) => {
        state.loading = false;
        state.consoles = state.consoles.filter(item => item.id !== action.payload);
      })
      .addCase(deleteconsoles.rejected, (state) => {
        state.loading = false;
      });
        
    }
});
export default consoleSlice.reducer;