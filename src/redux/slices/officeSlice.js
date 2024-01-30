import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import Axios from 'axios';
import {ApiLink} from '../../apilinks/api'


export const getOffice = createAsyncThunk('gets/getOffices',async()=>{
    return Axios.get(ApiLink.office)
                .then(res => {return res.data});
});

export const createOffice = createAsyncThunk('offices/createOffice', async (newOfficeData) => {
    return Axios.post(ApiLink.office, newOfficeData)
        .then(res => { return res.data });
});

export const updateOfficeAsync = createAsyncThunk('offices/putOffice', async (updatedOfficeData) => {
    const { id, ...restData } = updatedOfficeData;
    return await Axios.put(`${ApiLink.office}/${id}`,{id,...restData}).then(res => res.data);
});

export const deleteOfficeAsync = createAsyncThunk('offices/deleteOffice', async (officeId) => {
    return Axios.delete(`${ApiLink.office}/${officeId}`)
                .then(() => officeId);
  });

const officeSlice = createSlice({
    name:"office",
    initialState: {
        office:[],
        loading:false
    },
    extraReducers:(builder)=>{
        
        builder
        //Get Method
        .addCase(getOffice.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getOffice.fulfilled,(state,action)=>{
            state.loading = false;
            state.office = action.payload;
        })
        .addCase(getOffice.rejected,(state)=>{
            state.loading = false;
        })
        //Post Method
        .addCase(createOffice.pending, (state) => {
            state.loading = true;
        })
        .addCase(createOffice.fulfilled, (state, action) => {
            state.loading = false;
            state.office = [...state.office, action.payload]
        })
        .addCase(createOffice.rejected, (state) => {
            state.loading = false;
        })
         // Put method
         .addCase(updateOfficeAsync.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateOfficeAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.office = state.office.map((item) => item.id === action.payload.id ? action.payload : item);
            console.log(state.office);
        })
        .addCase(updateOfficeAsync.rejected, (state) => {
            state.loading = false;
        })
        // Delete method
      .addCase(deleteOfficeAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOfficeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.office = state.office.filter(item => item.id !== action.payload);
      })
      .addCase(deleteOfficeAsync.rejected, (state) => {
        state.loading = false;
      });
    }
});
export default officeSlice.reducer;

// export const fetchOfficeData = async() =>{
//     try{
//         const response = await axios.get(ApiLink.office);
//         return response.data;
//     }
//     catch(error)
//     {
//         console.error('error fectching office Data', error);
//         throw error;
//     }
// }