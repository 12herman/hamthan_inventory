import {configureStore} from '@reduxjs/toolkit';
import officeSlice from './slices/officeSlice';
import employeeSlice from './slices/employeeSlice';
import roleDetailSlice from './slices/roleDetailSlice';
import accountdetailsSlice from './slices/accountdetailsSlice';
import accessoriesSlice from './slices/accessoriesSlice';
import brandSlice from './slices/brandSlice';
import consoleSlice from './slices/consoleSlice';
import productSlice from './slices/productSlice';

export const store = configureStore({
    devTools:true,
    reducer:{
        office: officeSlice,
        employee: employeeSlice,
        roledetails: roleDetailSlice,
        account:accountdetailsSlice,      
        accessories:accessoriesSlice,
        brand:brandSlice,
        consoles:consoleSlice,
        products:productSlice
        
    }
});

export default store;