import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import Axios from 'axios';
import {ApiLink} from '../../apilinks/api'

//Get
export const getroledetails = createAsyncThunk('role/getroledetails',async()=>{
    return Axios.get(ApiLink.roledetails)
                .then(res => {return res.data});
});
//Post
export const postrole = createAsyncThunk('role/postrole',async(newrole)=>{
    return Axios.post(ApiLink.roledetails,newrole)
          .then(res => {return res.data});
});
//Put
export const putrole = createAsyncThunk('role/putrole',async(putdata)=>{
    const {id, ...restData} = putdata;
    return await Axios.put(`${ApiLink.roledetails}/${id}`,{id,...restData}).then(res => res.data);
});
//Delete
export const deleterole = createAsyncThunk('role/deleterole',async(id)=>{
    console.log(id);
    return Axios.delete(`${ApiLink.roledetails}?id=${id}`)
                .then(()=> id);
});


const roleDetailSlice = createSlice({
    name:"roledetails",
    initialState:{
        roledetails:[],
        roledetailloading:false
    },
    extraReducers: (builder) =>{
        builder
        //Get
        .addCase(getroledetails.pending,(state)=>{
            state.roledetailloading = true;
        })
        .addCase(getroledetails.fulfilled,(state,action)=>{
            state.roledetailloading = false;
            state.roledetails = action.payload;
        })
        .addCase(getroledetails.rejected,(state)=>{
            state.roledetailloading = false;
        })
        //Post
        .addCase(postrole.pending, (state) => {
            state.loading = true;
        })
        .addCase(postrole.fulfilled, (state, action) => {
            state.loading = false;
            state.roledetails = [...state.roledetails, action.payload]
        })
        .addCase(postrole.rejected, (state) => {
            state.loading = false;
        })
         // Put 
         .addCase(putrole.pending, (state) => {
            state.loading = true;
        })
        .addCase(putrole.fulfilled, (state, action) => {
            state.loading = false;
            state.roledetails = state.roledetails.map((item) => item.id === action.payload.id ? action.payload : item);
        })
        .addCase(putrole.rejected, (state) => {
            state.loading = false;
        })
         // Delete 
      .addCase(deleterole.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleterole.fulfilled, (state, action) => {
        state.loading = false;
        state.roledetails = state.roledetails.filter(item => item.id !== action.payload);
      })
      .addCase(deleterole.rejected, (state) => {
        state.loading = false;
      });
        
    }
});
export default roleDetailSlice.reducer;