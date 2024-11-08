import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/uncommon/Home';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import store from "./redux/store";
import {Provider} from "react-redux";
import Login from "./components/login";
import Logout from "./components/logout";
import UserInfo from "./components/userDetail";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/user-detail" element={<UserInfo/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
