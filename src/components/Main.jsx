import { makeStyles } from "@mui/styles";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import RidesContext from "../store/rides-context";
import Filter from "./Filter";
import ListOfRides from "./ListOfRides";
import Tabs from "./Tabs";

const useStyles = makeStyles({
  root: {
    height: "calc(100vh - 84px);",
    backgroundColor: "#292929",
    padding: "30px 43px 0 43px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
  },

  bottom: {
    marginTop: "24px",
    overflow: "auto",
  },
});
const Main = () => {
  const classes = useStyles();
  const { nearestRides } = useContext(RidesContext);
  const [ridesList, setRidesList] = useState();

  useEffect(() => {
    setRidesList(nearestRides);
  }, [nearestRides]);

  const updateRidesList = useCallback((data) => {
    // console.log("asfdasdf");
    setRidesList(data);
  }, []);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.top}>
          <Tabs updateRidesList={updateRidesList} />
          <Filter ridesList={ridesList} updateRidesList={updateRidesList} />
        </div>
        <ListOfRides list={ridesList} />
      </div>
    </>
  );
};

export default Main;
