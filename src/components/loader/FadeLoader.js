import { FadeLoader } from "react-spinners";

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  }
};

export const SpinFadeLoader = ({loading}) => {
    if(!loading){
        return null
    }
  return <div style={styles.overlay}>
      <FadeLoader size={50} speedMultiplier={0.7} color="cadetblue"/>
    </div>;
};
