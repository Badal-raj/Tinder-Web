import { sessionExpired } from "../features/AuthUser/authSlice";

export const AuthMiddleware = () => (next) => (action) => {
  if (
    action.type.endsWith("/rejected") &&
    action.payload === "AUTH_EXPIRED"
  ) {
    next(sessionExpired());
  }

  return next(action);
};
