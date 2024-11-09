import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  token: string | null;
}

export interface UserPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

const initialState: UserState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  token: Cookies.get('accessToken') || null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayload>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    }
  }
});

export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;