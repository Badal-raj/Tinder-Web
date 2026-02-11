

import {
  setCredentials,
  sessionExpired,
} from "../redux/features/AuthUser/authSlice";

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((p) =>
    error ? p.reject(error) : p.resolve(token)
  );
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

  let response = await fetch(url, {
    ...options,
    headers: makeHeaders(accessToken),
    credentials: "include", // 🔥 REQUIRED for cookies
  });

  let data = {};
  try {
    data = await response.json();
  } catch (_) {}

  if (response.ok) return data;

  /* 🔐 ACCESS TOKEN EXPIRED */
  if (response.status === 401) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((newToken) =>
        fetch(url, {
          ...options,
          headers: makeHeaders(newToken),
          credentials: "include",
        }).then(async (r) => {
          if (!r.ok) throw new Error("Retry failed");
          return r.json();
        })
      );
    }

    isRefreshing = true;

    try {
      const refreshRes = await fetch(
        "http://localhost:9001/api/refresh-token",
        {
          method: "POST",
          credentials: "include", // 🍪 cookie auto-sent
        }
      );

      const refreshData = await refreshRes.json();
      if (!refreshRes.ok) throw new Error("Session expired");

      dispatch(
        setCredentials({
          accessToken: refreshData.accessToken,
          user,
        })
      );

      processQueue(null, refreshData.accessToken);

      return fetch(url, {
        ...options,
        headers: makeHeaders(refreshData.accessToken),
        credentials: "include",
      }).then(async (r) => {
        if (!r.ok) throw new Error("Retry failed");
        return r.json();
      });
    } catch (err) {
      processQueue(err);

      dispatch(sessionExpired());

      throw err;
    } finally {
      isRefreshing = false;
    }
  }

  throw new Error(data.message || "Something went wrong");
};

