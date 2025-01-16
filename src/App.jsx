import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import * as UserServices from "./services/UserServices";
import { jwtDecode } from "jwt-decode";
import { router } from "./router/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import './index.css';


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const { decoded, storegeData } = handleDecoded();

    const currentTime = new Date().getTime() / 1000;


    console.log("12", decoded?.exp, currentTime)

    // if (decoded?.id) {
    //   handleGetDetailsUser(decoded?.id, storegeData);
    // }
  }, []);

  const handleDecoded = () => {
    const token = localStorage.getItem("access_token");
    if (!token) return { decoded: null, token: null };

    try {
      const decoded = jwtDecode(token);
      return { decoded, token };
    } catch (error) {
      console.error("Failed to decode token:", error.message);
      return { decoded: null, token: null };
    }
  };


  UserServices.axiosJWT.interceptors.request.use(
    async (config) => {
      console.log("123")
      const { decoded, token } = handleDecoded();
      const currentTime = new Date().getTime();

      if (decoded?.exp * 1000 < currentTime) {
        console.log("Token expired, refreshing...");
        try {
          const data = await UserServices.refreshToken();
          localStorage.setItem("access_token", data?.access_token);
          // Cập nhật header Authorization với token mới
          config.headers["token"] = `Bearer ${data?.access_token}`;
        } catch (error) {
          console.error("Error refreshing token:", error);
          // Xử lý lỗi khi không thể làm mới token, ví dụ đăng xuất người dùng
        }
      }
      return config;


    },
    (error) => Promise.reject(error)
  );


  // const handleGetDetailsUser = async (id, token) => {
  //   const res = await UserServices.getDetailsUser(id, token);
  //   dispatch(updateUser({ ...res?.data, access_token: token }));
  //   console.log("res", res);
  // };

  const PrivateRoute = ({ children, isPrivate, allowedRoles }) => {
    const { decoded } = handleDecoded();
    const isAuthenticated = !!decoded;

    if (isPrivate && !isAuthenticated) {
      return <Navigate to="/sign-in" />;
    }

    if (isPrivate && allowedRoles && !allowedRoles.includes(decoded?.role)) {
      return <Navigate to="/sign-in" />;
    }

    return children;
  };

  return (
    <div>
      <Router>
        <Routes>
          {router.map((route) => {
            const Page = route.page;

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PrivateRoute isPrivate={route.isPrivate} allowedRoles={route.role}>
                    <Page />
                  </PrivateRoute>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App
