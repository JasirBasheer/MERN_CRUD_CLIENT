import { ReactNode } from "react";

export interface UserType {
  _id?: any;
  id?: any;
  firstName: string;
  lastName: string | null;
  image: string | null;
  email: string | null;
  is_blocked?: boolean | null;
}

export interface RootState {
  user: UserType;
}

export interface UserProtectedRouteProps {
  children: ReactNode;
}

export interface UserState {
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