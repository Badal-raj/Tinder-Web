import { configureStore } from '@reduxjs/toolkit'
import logger from "redux-logger";

import registrationSlice from "../features/loginRegistrtion/RegistrationSlice";
import loginUserSlice from '../features/loginRegistrtion/LoginSlice';
import userDetailSlice from '../features/profile/ProfileSlice';
import userAuthSlice from '../features/AuthUser/authSlice';
import userEditDetailsSlice from '../features/profile/UserEditSlice'

import { AuthMiddleware } from '../middleware/AuthMiddleWare';

export const Store = configureStore({
  reducer: {
    registeredData: registrationSlice,
    loginUserData: loginUserSlice,
    authReducer: userAuthSlice,
    userData: userDetailSlice,
    updatedUserData: userEditDetailsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AuthMiddleware, logger),
})