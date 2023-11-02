import axios from "axios";
import { BACKEND_AUTH_URL, BACKEND_API_KEY } from "@env";

export const registerUser = (email, password) => {
  return axios.post(`${BACKEND_AUTH_URL}:signUp?key=${BACKEND_API_KEY}`, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
};

export const loginUser = (email, password) => {
  return axios.post(
    `${BACKEND_AUTH_URL}:signInWithPassword?key=${BACKEND_API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
};
