export const logoutUser = async () => {
  try {
    await fetch("http://localhost:9001/api/logout", {
      method: "POST",
      credentials: "include", // 🔥 REQUIRED
    });
  } catch (_) {
    // ignore network error on logout
  }
};
