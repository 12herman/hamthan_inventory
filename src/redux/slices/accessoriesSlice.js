import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import Axios from 'axios';
import {ApiLink} from '../../apilinks/api'

//Get
export const getaccessories = createAsyncThunk('accessories/getaccessories',async()=>{
    return Axios.get(ApiLink.accessories)
                .then(res => {return res.data});
});
//Post
export const postaccessories = createAsyncThunk('accessories/postaccessories',async(newaccessories)=>{
    return Axios.post(ApiLink.accessories,newaccessories)
          .then(res => {return res.data});
});
//Put
export const putaccessories = createAsyncThunk('accessories/putaccessories',async(putdata)=>{
    const {id, ...restData} = putdata;
    return await Axios.put(`${ApiLink.accessories}/${id}`,{id,...restData}).then(res => res.data);
});
//Delete
export const deleteaccessories = createAsyncThunk('accessories/deleteaccessories',async(id)=>{
    console.log(id);
    return Axios.delete(`${ApiLink.accessories}/${id}`)
                .then(()=> id);
});


const accessoriesSlice = createSlice({
    name:"accessories",
    initialState:{
        accessories:[],
        accessoriesloading:false
    },
    extraReducers: (builder) =>{
        builder
        //Get
        .addCase(getaccessories.pending,(state)=>{
            state.accessoriesloading = true;
        })
        .addCase(getaccessories.fulfilled,(state,action)=>{
            state.accessoriesloading = false;
            state.accessories = action.payload;
        })
        .addCase(getaccessories.rejected,(state)=>{
            state.accessoriesloading = false;
        })
        //Post
        .addCase(postaccessories.pending, (state) => {
            state.loading = true;
        })
        .addCase(postaccessories.fulfilled, (state, action) => {
            state.loading = false;
            state.accessories = [...state.accessories, action.payload]
        })
        .addCase(postaccessories.rejected, (state) => {
            state.loading = false;
        })
         // Put 
         .addCase(putaccessories.pending, (state) => {
            state.loading = true;
        })
        .addCase(putaccessories.fulfilled, (state, action) => {
            state.loading = false;
            state.accessories = state.accessories.map((item) => item.id === action.payload.id ? action.payload : item);
        })
        .addCase(putaccessories.rejected, (state) => {
            state.loading = false;
        })
         // Delete 
      .addCase(deleteaccessories.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteaccessories.fulfilled, (state, action) => {
        state.loading = false;
        state.accessories = state.accessories.filter(item => item.id !== action.payload);
      })
      .addCase(deleteaccessories.rejected, (state) => {
        state.loading = false;
      });
        
    }
});
export default accessoriesSlice.reducer;