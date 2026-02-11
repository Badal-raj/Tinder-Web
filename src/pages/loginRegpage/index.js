import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LoginRegistration } from "./LoginRegistraationPage";
import {
  emptyFields,
  invalidEmail,
  PasswordLength,
  PasswordValidation,
  isValidEmail,
  passwordRegex,
} from "../../constant/messages";
import { registerUserData } from "../../redux/features/loginRegistrtion/RegistrationSlice";
import { loginUser } from "../../redux/features/loginRegistrtion/LoginSlice";
import { setCredentials } from "../../redux/features/AuthUser/authSlice";

export const LoginRegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  const registerLoading = useSelector((state) => state.registeredData.loading);

  const loginLoading = useSelector((state) => state.loginUserData.loading);

  const isLoading = isLogin ? loginLoading : registerLoading;

  const handleResetFields = () => {
    setFields({
      firstName: "",
      lastName: "",
      emailId: "",
      password: "",
    });
  };

  const formValidation = () => {
    let isFormValid = true;
    if (!fields.firstName && !isLogin) {
      errors.firstName = emptyFields;
      isFormValid = false;
    }
    if (!fields.lastName && !isLogin) {
      errors.lastName = emptyFields;
      isFormValid = false;
    }
    if (!fields.emailId) {
      errors.emailId = emptyFields;
      isFormValid = false;
    } else if (!isValidEmail.test(fields.emailId)) {
      errors.emailId = invalidEmail;
      isFormValid = false;
    }
    if (!fields.password) {
      errors.password = emptyFields;
      isFormValid = false;
    } else if (fields.password && fields.password.length < 6) {
      errors.password = PasswordLength;
      isFormValid = false;
    } else if (fields.password && !passwordRegex.test(fields.password)) {
      errors.password = PasswordValidation;
      isFormValid = false;
    }
    setErrors({ ...errors });
    return isFormValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "emailId" && !isValidEmail.test(value)) {
      setErrors((prev) => ({...prev, [name]: !value ? emptyFields : invalidEmail}));
    } else if (name === "password" && value.length < 6) {
      setErrors((prev) => ({
        ...prev,
        [name]: !value ? emptyFields : PasswordLength,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: !value ? emptyFields : "" }));
    }
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginRegLink = () => {
    setIsLogin((prev) => !prev);
  };

  const handleUserAuth = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      if (!isLogin) {
        const result = await dispatch(registerUserData(fields));
        if (result && result.meta.requestStatus === "fulfilled") {
          handleResetFields();
          setIsLogin((prec) => !prec);
        }
      } else {
        const rest = await dispatch(
          loginUser({ emailId: fields.emailId, password: fields.password }),
        );
        if (rest && rest.meta.requestStatus === "fulfilled") {
          const { accessToken, user } = rest.payload;
          dispatch(setCredentials({ accessToken, user }));
          navigate("/profile");
        }
      }
    }
  };

  return (
    <>
      <LoginRegistration
        fields={fields}
        errors={errors}
        isLogin={isLogin}
        isLoading={isLoading}
        handleLoginReg={handleLoginRegLink}
        handleUserAuth={handleUserAuth}
        handleChange={handleChange}
      />
    </>
  );
};
