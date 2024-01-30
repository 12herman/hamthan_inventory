import  {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import Axios from 'axios';
import { ApiLink } from "../../apilinks/api";

export const getbrand = createAsyncThunk('brand/getbrand',async() =>{
    return Axios.get(ApiLink.brand)
                .then(res => {return res.data});
});

export const postbrand = createAsyncThunk('brand/postbrand',async(newbrand) =>{
    return Axios.post(ApiLink.brand,newbrand)
                .then(res => {return res.data});
});

export const putbrand =createAsyncThunk('brand/putbrand',async(putdata) =>{
    const {id, ...restData} =putdata;
    console.log({id, ...restData});
    return await Axios.put(`${ApiLink.brand}/${id}`,{id,...restData})
                .then(res =>res.data);
});

export const deletebrand = createAsyncThunk('brand/deletebrand',async(id) =>{
    
    return Axios.delete(`${ApiLink.brand}/${id}`)
                .then(() => id);  
});

const brandSlice =createSlice({
    name:"brand",
    initialState:{
        brand:[],
        brandLoading:false
    },
    extraReducers:(builder) => {
        builder

        //Get
        .addCase(getbrand.pending,(state) =>{
            state.brandLoading =true;
        })
        .addCase(getbrand.fulfilled,(state,action) =>{
            state.brandLoading =false;
            state.brand =action.payload;
        })
        .addCase(getbrand.rejected,(state) =>{
            state.brandLoading =false;
        })

        //Post
        .addCase(postbrand.pending,(state) =>{
            state.loading =true;
        })
        .addCase(postbrand.fulfilled,(state,action)=>{
            state.loading =false;
            state.brand =[...state.brand,action.payload];
        })
        .addCase(postbrand.rejected,(state) =>{
            state.loading =false;
        })

        //Put
        .addCase(putbrand.pending,(state) =>{
            state.loading =true;
        })
        .addCase(putbrand.fulfilled,(state,action) =>{
            state.brandLoading = false;
            state.brand =state.brand.map((item) => item.id === action.payload.id ? action.payload : item);
        })
        .addCase(putbrand.rejected,(state) => {
            state.loading =false;
        })

        //Delete
        .addCase(deletebrand.pending,(state) =>
        {
            state.loading =true;
        })
        .addCase(deletebrand.fulfilled,(state,action) =>{
            state.brandLoading = false;
            state.brand =state.brand.filter(item => item.id !== action.payload);
        })
        .addCase(deletebrand.rejected,(state) =>{
            state.loading =false;
        });
    }

});

export default brandSlice.reducer;