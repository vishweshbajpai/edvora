import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import RidesContext from "../store/rides-context";

const useStyles = makeStyles({
  root: {
    minHeight: "84px",
    padding: "20px 43px",
    backgroundColor: "#101010",
    display: "flex",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  header: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "36px",
  },
  user: {
    display: "flex",
    alignItems: "center",
  },
  username: {
    marginRight: "25px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  userimage: {
    height: "44px",
    width: "44px",
    borderRadius: "22px",
  },
});
const Header = () => {
  const classes = useStyles();
  const ridesCxt = useContext(RidesContext);
  const { userData } = ridesCxt;
  return (
    <div className={classes.root}>
      <div className={classes.header}>Edvora</div>
      <div className={classes.user}>
        <div className={classes.username}>{userData?.name}</div>
        <img
          src={userData?.url}
          alt="profile-pic"
          className={classes.userimage}
        />
      </div>
    </div>
  );
};

export default Header;
