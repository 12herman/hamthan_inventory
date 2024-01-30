import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import Axios from 'axios';
import {ApiLink} from '../../apilinks/api'

const apiName = "account";
const apilink = ApiLink.account;


//Get 
export const getaccount = createAsyncThunk(`${apiName}/get${apiName}`, async()=>{
    return Axios.get(apilink)
                .then(res => {return res.data});
});

//Post
export const postaccount = createAsyncThunk(`${apiName}/post${apiName}`,async(data)=>{
    return Axios.post(apilink,data)
                .then(res => {return res.data});
});

//Put
export const putaccount = createAsyncThunk(`${apiName}/put${apiName}`,async(putdata)=>{
    const {id, ...restData} = putdata;
    return  Axios.put (`${apilink}/${id}`,{id,...restData})
                 .then(res => res.data);
});

//Delete
export const deletedaccount = createAsyncThunk(`${apiName}/delete${apiName}`,async(id)=>{
    return Axios.delete(`${apilink}?id=${id}`)
                .then(()=>id);
});



const accountSlice = createSlice({
    name:apiName,
    initialState:{
        account:[],
        accountloading:false
    },
    extraReducers: (builder) => {
        builder
        //Get
        .addCase(getaccount.pending,(state)=>{
            state.accountloading = true;
        })
        .addCase(getaccount.fulfilled,(state,action)=>{
            state.accountloading = false;
            state.account = action.payload;
        })
        .addCase(getaccount.rejected,(state)=>{
            state.accountloading = false;
        })
        //Post
        .addCase(postaccount.pending, (state) => {
            state.accountloading = true;
        })
        .addCase(postaccount.fulfilled, (state, action) => {
            state.accountloading = false;
            state.account = [...state.account, action.payload]
        })
        .addCase(postaccount.rejected, (state) => {
            state.accountloading = false;
        })
        // Put 
        .addCase(putaccount.pending, (state) => {
            state.accountloading = true;
        })
        .addCase(putaccount.fulfilled, (state, action) => {
            state.accountloading = false;
            state.account = state.account.map((item) => item.id === action.payload.id ? action.payload : item);
        })
        .addCase(putaccount.rejected, (state) => {
            state.accountloading = false;
        })
         // Delete 
      .addCase(deletedaccount.pending, (state) => {
        state.accountloading = true;
      })
      .addCase(deletedaccount.fulfilled, (state, action) => {
        state.accountloading = false;
        state.account = state.account.filter(item => item.id !== action.payload);
      })
      .addCase(deletedaccount.rejected, (state) => {
        state.accountloading = false;
      });
    }
});

export default accountSlice.reducer;