import React, { useEffect } from "react";
import agent from "../../api/agent";
import User from "../types/user";

export const useUserDetail = () => {
  let inituser: User = {
    id: 0,
    name: "",
    age: 0,
    birthday: new Date().toString(),
  };
  const [userList, setUserList] = React.useState<User[]>();
  const [currentUser, setCurrentUser] = React.useState<User>(inituser);

  async function getUser() {
    await agent.UserAgent.getUserList().then((res) => {
      setUserList(res);
    });
  }

  async function getUserById(id: number) {
    await agent.UserAgent.getUserById(id).then((res: User) => {
      setCurrentUser(res);
    });
  }
  async function addUserItem(user: User) {
    await agent.UserAgent.addUser(user).then((res) => {
      getUser();
    });
  }
  async function updateUserItem(id: number, user: User) {
    await agent.UserAgent.update(id, user).then((res) => {
      getUser();
    });
  }

  async function delUserItem(id: number) {
    await agent.UserAgent.delete(id).then(() => {
      getUser();
    });
  }

  return {
    userList,
    currentUser,
    getUserById,
    getUser,
    addUserItem,
    updateUserItem,
    delUserItem,
  };
};
