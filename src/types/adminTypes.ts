import { Dispatch, ReactNode, SetStateAction } from 'react';


export interface CreateUserProps {
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
  setIsCreateUserClicked: Dispatch<SetStateAction<boolean>>;
}

export interface EditUserProps {
  user: UserType;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}


export interface UserType {
  _id?: any;
  id?: any;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  email: string | null;
  is_blocked?: boolean | null;
}


export interface AdminProtectedRouteProps {
  children: ReactNode;
}
