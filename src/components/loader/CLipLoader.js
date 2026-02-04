import { ClipLoader } from "react-spinners";

export const SpinClipLoader = ({ loading, size=20 }) => {
  if (!loading) {
    return null;
  }
  return (
    <ClipLoader
      size={size}
      color="#ffffff" // white border
      speedMultiplier={0.7} // rotation speed
      cssOverride={{
        display: "inline-block",
        verticalAlign: "middle",
      }}
    />
  );
};
