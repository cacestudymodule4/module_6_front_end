import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import store from "./redux/store";
import {Provider} from "react-redux";
import Login from "./components/login";
import Logout from "./components/logout";
import ChangePassword from "./components/changePassword";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/change-password" element={<ChangePassword/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
