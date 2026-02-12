import {
  setCredentials,
  sessionExpired,
} from "../redux/features/AuthUser/authSlice";
import { handleSendLogoutEvent } from "./authChannel";

let isRefreshing = false;
let refreshQueue = [];

 /******Resolve or reject all queued requests******/
const processQueue = (error, token = null) => {
  refreshQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  refreshQueue = [];
};

export const ApiFetch = async (url, options = {}, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  const { accessToken, user } = getState().authReducer || {};

  const isFormData = options.body instanceof FormData;

  const makeHeaders = (token) => ({
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...options.headers,
  });

  /********FIRST API CALL*************/
  let response = await fetch(url, {
    ...options,
    credentials: "include", // IMPORTANT for cookie
    headers: makeHeaders(accessToken),
  });

  let data = {};
  try {
    data = await response.json();
  } catch (_) {}

  // If request successful → return data
  if (response.ok) {
    return data;
  }

  /*****HANDLE ACCESS TOKEN EXPIRY******/
  if (
    response.status === 401 &&
    !url.includes("/refresh-token") // prevent infinite loop
  ) {
    // If refresh already in progress → queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((newAccessToken) => {
        return fetch(url, {
          ...options,
          credentials: "include",
          headers: makeHeaders(newAccessToken),
        }).then(async (res) => {
          if (!res.ok) throw new Error("Retry failed");
          return res.json();
        });
      });
    }

    // Start refresh process
    isRefreshing = true;

    try {
      const refreshResponse = await fetch(
        "http://localhost:9001/api/refresh-token",
        {
          method: "POST",
          credentials: "include", // 🔥 send httpOnly cookie
        },
      );

      // If refresh token expired → logout
      if (refreshResponse.status === 401 || refreshResponse.status === 403) {
        throw new Error("Refresh token expired");
      }
      const refreshData = await refreshResponse.json();
      const newAccessToken = refreshData.accessToken;

      // Update Redux with new access token
      dispatch(
        setCredentials({
          accessToken: newAccessToken,
          user,
        }),
      );
      // Resolve queued requests
      processQueue(null, newAccessToken);
      // Retry original request
      const retryResponse = await fetch(url, {
        ...options,
        credentials: "include",
        headers: makeHeaders(newAccessToken),
      });
      if (!retryResponse.ok) {
        throw new Error("Retry failed");
      }
      return retryResponse.json();
    } catch (error) {
      // If refresh fails → logout user globally
      processQueue(error);
      dispatch(sessionExpired());
      handleSendLogoutEvent();
      throw error;
    } finally {
      isRefreshing = false;
    }
  }
  // Other errors
  throw new Error(data.message || "Something went wrong");
};
