
// import React from 'react';
// import User from './userpages/User';
// import Loginpage from './Loginpage';
// import Registerpage from './Registerpage';
// import Accessories from './pages/Accessories';
// import { BrowserRouter , Route, Routes } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
 
// const App = () => {
//     return(
//         <BrowserRouter>
//         <Routes>
//                 <Route path="/" Component={Loginpage} />
//                 <Route path='/dashboard' Component={Dashboard}/>
//                 <Route path="/register" Component={Registerpage} />
//                 <Route path="/user" Component={User} />
//                 <Route path="/accessories" Component={Accessories} />
//             </Routes>
//         </BrowserRouter>
//     );
// };
 
// export default App;

import React, { useEffect } from 'react';
import User from './userpages/User';
import Accessories from './pages/Accessories';
import {useDispatch, useSelector} from 'react-redux';
import { getOffice } from './redux/slices/officeSlice';
/* src/index.css */




const App = () => {
//     const dispatch = useDispatch();
// const {office,loading} =useSelector(state=> state.office);
// useEffect(()=>{
//     dispatch(getOffice());
// },[]);

    return(
       <Accessories />
    );
};

export default App;