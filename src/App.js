import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "./routes";
import { ModalComponent } from "./components/common";
import { logoutAction } from "./redux/features/AuthUser/authSlice";
import { logoutUser } from "./utills/logOut";
import { handleListenLogoutEvent } from "./utills/authChannel";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isExpired = useSelector((state) => state.authReducer.isSessionExpired);

  useEffect(() => {
    handleListenLogoutEvent(() => {
      dispatch(logoutAction());
      navigate("/");
    });
  }, [dispatch, navigate]);

  const handleModalClose = async() => {
     await logoutUser(); // backend logout
     dispatch(logoutAction()); // frontend logout
     navigate("/");
  };

  return (
    <div>
      <ModalComponent
        show={isExpired}
        onClose={handleModalClose}
        title="Session Expired"
        buttonName="OK"
      >
        {"Your session has expired. Please login again."}
      </ModalComponent>
      <PageRoutes />
    </div>
  );
}

export default App;
