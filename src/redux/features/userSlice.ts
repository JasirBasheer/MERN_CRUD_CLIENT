import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { UserPayload, UserState } from "../../types/userTypes";


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