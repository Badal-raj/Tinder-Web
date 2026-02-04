import { useSelector, useDispatch } from "react-redux";
import { PageRoutes } from "./routes";
import { ModalComponent } from "./components/common";
import { logoutAction } from "./redux/features/AuthUser/authSlice";

function App() {
  const dispatch = useDispatch();
  const isExpired = useSelector((state) => state.authReducer.isSessionExpired);

  return (
    <div>
      <ModalComponent
        show={isExpired}
        onClose={() => dispatch(logoutAction())}
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
