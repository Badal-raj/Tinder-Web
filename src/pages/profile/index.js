import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ProfilePage } from "./Profile";
import { emptyFields } from "../../constant/messages";
import { hangeGetUserDetails } from "../../redux/features/profile/ProfileSlice";
import { handleUpdateUser } from "../../redux/features/profile/UserEditSlice";
import { ModalComponent } from "../../components/common";
import { ProfileView } from "./ProfileView";

export const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.accessToken);
  const editPrifleLoading = useSelector(
    (state) => state.updatedUserData.loading,
  );

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    skills: "",
    about: "",
    profilePic: null,
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const formValidation = () => {
    let isFormValid = true;
    if (!fields.firstName) {
      errors.firstName = emptyFields;
      isFormValid = false;
    }
    if (!fields.lastName) {
      errors.lastName = emptyFields;
      isFormValid = false;
    }
    if (fields.age && !isNaN(fields.age) && Number(fields.age) < 18) {
      errors.age = "Age must be at least 18.";
      isFormValid = false;
    }
    setErrors({ ...errors });
    return isFormValid;
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "profilePic") {
      setFields((prev) => ({
        ...prev,
        profilePic: files[0],
      }));
      return;
    }
    if (name === "age" && !isNaN(value) && Number(value) < 18) {
      setErrors((prev) => ({
        ...prev,
        [name]: value ? "Age must be at least 18." : "",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: !value ? emptyFields : "" }));
    }

    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const getUserDetail = async () => {
    try {
      const result = await dispatch(hangeGetUserDetails());
      if (result && result.meta.requestStatus === "fulfilled") {
        const { firstName, lastName, age, gender, skills, about } = result.payload?.result;
        setFields((prev) => ({
          ...prev,
          firstName,
          lastName,
          age: age ?? "",
          gender,
          skills: skills?.toString() ?? "",
          about: about ?? "",
        }));
      } else {
        console.log(result.payload?.message);
      }
    } catch (error) {
      console.log(error.messages);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, [token]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      try {
        const formData = new FormData();

        formData.append("firstName", fields.firstName);
        formData.append("lastName", fields.lastName);
        if (fields.age !== "") {
          formData.append("age", Number(fields.age));
        }
        if (fields.gender) formData.append("gender", fields.gender);
        if (fields.skills) formData.append("skills", fields.skills);
        if (fields.about) formData.append("about", fields.about);
        if (fields.profilePic) {
          formData.append("profileImage", fields.profilePic);
        }
        const res = await dispatch(handleUpdateUser(formData));

        if (res && res.meta.requestStatus === "fulfilled") {
          console.log("fulfilled--->", res);
        } else {
          console.log("rejected or other ---->", res.payload);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleProfileView = () => {
    setModalOpen(true);
  };

  return (
    <>
      <ProfilePage
        fields={fields}
        errors={errors}
        handleChange={handleChange}
        handleProfileSave={handleProfileSave}
        handleProfileView={handleProfileView}
        isLoading={editPrifleLoading}
      />
      <ModalComponent
        show={isModalOpen}
        onClose={() => setModalOpen((prev) => !prev)}
        title="User Details"
      >
        <ProfileView />
      </ModalComponent>
    </>
  );
};
