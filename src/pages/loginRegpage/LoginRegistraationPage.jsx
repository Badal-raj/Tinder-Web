import { TextBox, PasswordBox, Button } from "../../components/common";
import { SpinClipLoader } from "../../components/loader";

export const LoginRegistration = ({
  fields,
  errors,
  handleLoginReg,
  handleChange,
  handleUserAuth,
  isLogin,
  isLoading,
}) => {
  const handleClick = () =>{}
  return (
    <>
      <div className="page-container d-flex">
        <div className="page-body no-overflow bg-white">
          <h5 className="d-flex justify-content-center py-2 mt-3 e-comm-style">
            {isLogin ? "Login" : "Signup"}
          </h5>
          <div className="fields-container">
            {!isLogin && (
              <>
                <div className="my-2 mx-3">
                  <TextBox
                    name="firstName"
                    type="text"
                    id="firstName"
                    className="form-control"
                    placeholder="First Name"
                    label="Firstname*"
                    value={fields.firstName}
                    error={errors?.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="my-2 mx-3">
                  <TextBox
                    name="lastName"
                    type="text"
                    id="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    label="Lastname*"
                    value={fields.lastName}
                    error={errors?.lastName}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div className="my-2 mx-3">
              <TextBox
                name="emailId"
                type="text"
                id="email_id"
                className="form-control"
                placeholder="EmailId"
                label="EmailId*"
                value={fields.emailId}
                error={errors?.emailId}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3">
              <PasswordBox
                name="password"
                type="text"
                id="passsword_id"
                className="form-control"
                placeholder="Password"
                label="Password*"
                value={fields.password}
                error={errors?.password}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3 d-flex justify-content-center">
              <Button
                className="button-style w-50 my-2"
                onClick={isLoading ? handleClick : handleUserAuth}
              >
                 {isLogin ? <span> {isLoading ? <span className="d-flex justify-content-center gap-2"><span>{"Login"}</span> <SpinClipLoader loading={isLoading}/> </span>  : "Login" }</span> : <span> {isLoading ? <span className="d-flex justify-content-center gap-2"><span>{"SignUp"}</span> <SpinClipLoader loading={isLoading}/> </span>  : "SignUp" }</span>} 
              </Button>
            </div>
          </div>
          <span className="d-flex justify-content-end my-2 mx-3">
            <span className="info-text">
              {isLogin ? "New User" : "Already have account"}
              <span className="theme-link-style mx-2" onClick={handleLoginReg}>
                {isLogin ? "Signup" : "Login"}
              </span>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};
