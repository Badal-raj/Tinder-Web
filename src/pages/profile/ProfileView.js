import { useSelector } from "react-redux";
export const ProfileView = () => {
  const { firstName, lastName, age, gender, about, skills } = useSelector(
    (state) => state.authReducer?.user,
  );

  return (
    <div className="no-overflow bg-white p-1">
      <div className="profile-label">
        {firstName && (
          <span>
            First Name: <span className="text-style"> {firstName} </span>
          </span>
        )}
      </div>
      <div className="profile-label">
        {lastName && (
          <span>
            Last Name: <span className="text-style"> {lastName} </span>
          </span>
        )}
      </div>
      <div className="profile-label">
        {age && (
          <span>
            Age: <span className="text-style">{age}</span>
          </span>
        )}
      </div>
      <div className="profile-label">
        {gender && (
          <span>
            Gender: <span className="text-style">{gender}</span>
          </span>
        )}
      </div>
      <div className="profile-label">
        {about && (
          <span>
            About: <span className="text-style">{about}</span>
          </span>
        )}
      </div>
      <div className="profile-label">
        {skills && (
          <span>
            Skills:
            <span className="text-style">
              {Array.isArray(skills) ? skills.toString() : skills}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};
