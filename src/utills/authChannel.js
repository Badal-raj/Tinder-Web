//BroadcastChannel to handle logout from all tab of same window and domain.

let authChannel = null;

if ("BroadcastChannel" in window) {
  authChannel = new BroadcastChannel("auth_channel");
}

export const handleSendLogoutEvent = () => {
  if (authChannel) {
    authChannel.postMessage({ type: "LOGOUT" });
  } else {
    // fallback for older browsers
    localStorage.setItem("logout", Date.now());
  }
};

export const handleListenLogoutEvent = (callback) => {
  if (authChannel) {
    authChannel.onmessage = (event) => {
      if (event.data?.type === "LOGOUT") {
        callback();
      }
    };
  } else {
    window.addEventListener("storage", (event) => {
      if (event.key === "logout") {
        callback();
      }
    });
  }
};
