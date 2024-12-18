import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/uncommon/Home';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import store from "./redux/store";
import {Provider} from "react-redux";
import Staff from "./components/uncommon/Staff";
import Contract from "./components/uncommon/Contract";
import ContractDetail from "./components/uncommon/ContractDetail";
import AddContract from "./components/uncommon/AddContract";
import Login from "./components/uncommon/Login";
import Logout from "./components/uncommon/Logout";
import UserInfo from "./components/uncommon/UserDetail";
import Salary from "./components/uncommon/Salary";
import Chart8Component from "./components/uncommon/Report";
import CustomerList from "./components/uncommon/CustomerList";
import AddCustomer from "./components/uncommon/AddCustomer";
import ServiceList from "./components/uncommon/ServiceList";
import AddStaff from "./components/uncommon/AddStaff";
import EditStaff from "./components/uncommon/EditStaff";
import {EditBuilding} from './components/uncommon/EditBuilding';
import {Floor} from './components/uncommon/Floor/Floor';
import {AddEditFloor} from './components/uncommon/Floor/AddEditFloor';
import {Ground} from './components/uncommon/Ground/Ground';
import {AddEditGround} from './components/uncommon/Ground/AddEditGround';
import './assets/css/styles.css';
import AddService from "./components/uncommon/AddService";
import ServiceDetail from "./components/uncommon/ServiceDetail";
import EditCustomer from "./components/uncommon/EditCustomer";
import AddGroundToService from "./components/uncommon/AddGroundToService";
import EditService from "./components/uncommon/EditService";
import EditGroundService from "./components/uncommon/EditGroundService";
import ChangePassword from "./components/uncommon/ChangePassword";
import RoomFacilities from "./components/uncommon/RoomFacilities";
import AddFacilities from "./components/uncommon/AddFacilities";
import EditRoomFacilities from "./components/uncommon/EditRoomFacilities";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer/>
            <Routes>
                <Route path="/building/edit" element={<EditBuilding/>}/>
                <Route path="/floor/list" element={<Floor/>}/>
                <Route path="/floor/add" element={<AddEditFloor/>}/>
                <Route path="/floor/edit/:id" element={<AddEditFloor/>}/>
                <Route path="/ground/add" element={<AddEditGround />} />
                <Route path="/ground/edit/:id" element={<AddEditGround />} />
                <Route path="/ground/list" element={<Ground />} />
                <Route path="/staff/list" element={<Staff/>}/>
                <Route path="/staff/add" element={<AddStaff/>}/>
                <Route path="/staff/edit/:id" element={<EditStaff/>}/>
                <Route path="/staff/password" element={<ChangePassword/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/user/detail" element={<UserInfo/>}/>
                <Route path="/customer/list" element={<CustomerList/>}/>
                <Route path="/customer/add" element={<AddCustomer/>}/>
                <Route path="/customer/edit/:id" element={<EditCustomer/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/contract/add" element={<AddContract/>}/>
                <Route path="/contract/list" element={<Contract/>}/>
                <Route path="/contract/detail/:id" element={<ContractDetail/>}/>
                <Route path="/user/detail" element={<UserInfo/>}/>
                <Route path="/salary" element={<Salary/>}/>
                <Route path="/report" element={<Chart8Component/>}/>
                <Route path="/*" element={<Login/>}/>
                <Route path="/service/list" element={<ServiceList/>}/>
                <Route path="/service/add" element={<AddService/>}/>
                <Route path="/service/detail/:serviceId" element={<ServiceDetail/>}/>
                <Route path="/service/:serviceId/add-ground" element={<AddGroundToService/>}/>
                <Route path="/service/edit/:serviceId" element={<EditService/>}/>
                <Route path="/service/:serviceId/grounds/:groundId/edit" element={<EditGroundService/>}/>
                <Route path="/facilities/list" element={<RoomFacilities/>}/>
                <Route path="/facilities/add" element={<AddFacilities/>}/>
                <Route path="/facilities/edit/:id" element={<EditRoomFacilities/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
