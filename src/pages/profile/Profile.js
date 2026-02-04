import {
  TextBox,
  DropDownBox,
  TextArea,
  Button,
} from "../../components/common";
import { SpinFadeLoader } from "../../components/loader/FadeLoader";

export const ProfilePage = ({
  fields,
  errors,
  handleChange,
  handleProfileSave,
  handleProfileView,
  isLoading,
}) => {
  return (
    <>
      <SpinFadeLoader loading={isLoading} />
      <div className="d-flex page-container">
        <div className="page-body no-overflow bg-white">
          <h5 className="d-flex justify-content-center py-2 mt-3 e-comm-style">
            Edit Profile
          </h5>
          <div className="fields-container">
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
            <div className="my-2 mx-3">
              <TextBox
                name="age"
                type="number"
                id="age_id"
                className="form-control"
                placeholder="Age"
                label="Age"
                value={fields.age ?? ""}
                error={errors?.age}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3">
              <TextBox
                type="file"
                name="profilePic"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleChange}
                className="form-control"
                label="PhotoUrl"
              />
            </div>
            <div className="my-2 mx-3">
              <DropDownBox
                name="gender"
                id="gender_id"
                className="form-control"
                label="Gender"
                value={fields.gender}
                options={[
                  { label: "", value: "" },
                  { label: "male", value: "male" },
                  { label: "female", value: "female" },
                  { label: "others", value: "others" },
                ]}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3">
              <TextBox
                name="skills"
                type="text"
                id="skills_id"
                className="form-control"
                label="Skills (Skills should be camma seprated)"
                placeholder="Enter skills comma seprated"
                value={fields.skills}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3">
              <TextArea
                name="about"
                id="about_id"
                className="form-control"
                label="About"
                placeholder="maximum 500 characters"
                value={fields.about}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3 d-flex gap-2 justify-content-center">
              <Button
                className="button-style w-50 my-2"
                onClick={handleProfileSave}
              >
                Save Profile
              </Button>
              <Button
                className="button-style w-50 my-2"
                onClick={handleProfileView}
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
