import axios, { AxiosResponse } from "axios";
import User from "../components/types/user";


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const baseUrl="https://localhost:44313";

const UserAgent = {
  getUserList: () => request.get<User[]>(baseUrl+"/user/User"),
  addUser: (user: User) => request.post<User>(baseUrl+"/user/User", user),
  getUserById: (id: number) => request.get<User>(baseUrl+`/user/User/${id}`),
  update: (id: number,user:User) => request.put<void>(baseUrl+`/user/User/${id}`,user),
  delete: (id: number) => request.del<void>(baseUrl+`/user/User/${id}`),
};


const agent = {
  UserAgent,
};

export default agent;
