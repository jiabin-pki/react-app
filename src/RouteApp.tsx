import React, { useCallback, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import UserInfo from "./components/user/userInfo";
import UserList from "./components/user/userList";

const RouteApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/userList" element={<UserList />} />
      <Route path="/userList/:id" element={<UserInfo />} />
    </Routes>
  );
};

export default RouteApp;
