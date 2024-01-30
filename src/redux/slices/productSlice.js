import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import Axios from 'axios';
import {ApiLink} from '../../apilinks/api'

export const getProducts = createAsyncThunk('get/getProducts',async()=>{
    return Axios.get(ApiLink.products)
                .then(res => {return res.data}); 
});

// export const createProducts = createAsyncThunk('products/createProducts', async (newProductData) => {
//     return Axios.post(ApiLink.products, newProductData)
//         .then(res => { return res.data });
// });

// export const updateProductsAsync = createAsyncThunk('products/putProducts', async (updatedProductData) => {
//     const { id, ...restData } = updatedProductData;
//     return await Axios.put(`${ApiLink.products}/${id}`,{id,...restData}).then(res => res.data);
// });

// export const deleteProductAsync = createAsyncThunk('products/deleteProducts', async (ProductId) => {
//     return Axios.delete(`${ApiLink.products}/${ProductId}`)
//                 .then(() => ProductId);
//   });

const productSlice = createSlice({
    name:"products",
    initialState: {
        products:[],       
        loading:false,
    },
    // reducers:{},
    extraReducers:(builder)=>{
        
        builder
        //Get Method
        .addCase(getProducts.pending,(state)=>{
            state.loading = true;
            console.log('getProducts is pending');
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.products = action.payload;
            console.log('getProducts fulfilled. Updated products:', state.products);
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.loading = false;
            //state.error = action.error.message || 'An error occured';
            //console.log('Error Fetching Data:',action.error);
        })
        //Post Method
    //     .addCase(createProducts.pending, (state) => {
    //         state.loading = true;
    //     })
    //     .addCase(createProducts.fulfilled, (state, action) => {
    //         state.loading = false;
    //         state.products = [...state.products, action.payload]
    //     })
    //     .addCase(createProducts.rejected, (state) => {
    //         state.loading = false;
    //     })
    //      // Put method
    //      .addCase(updateProductsAsync.pending, (state) => {
    //         state.loading = true;
    //     })
    //     .addCase(updateProductsAsync.fulfilled, (state, action) => {
    //         state.loading = false;
    //         state.products = state.products.map((item) => item.id === action.payload.id ? action.payload : item);
    //         console.log(state.products);
    //     })
    //     .addCase(updateProductsAsync.rejected, (state) => {
    //         state.loading = false;
    //     })
    //     // Delete method
    //   .addCase(deleteProductAsync.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(deleteProductAsync.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.products = state.products.filter(item => item.id !== action.payload);
    //   })
    //   .addCase(deleteProductAsync.rejected, (state) => {
    //     state.loading = false;
    //   });
    },
});
export default productSlice.reducer;

