import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

import { RootState } from "../../store";

import { TUserRole } from "@/src/types";

// export type TUser = {
//   email: string;
//   id: string;
//   role: string;
//   iat: number;
//   exp: number;
// };
type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role: TUserRole;
  profilePhoto?: string;
  terms?: boolean;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      // Cookies.remove("accessToken", { path: "/" });
      // Cookies.remove("refreshToken", { path: "/" });
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
