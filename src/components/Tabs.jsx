import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import RidesContext from "../store/rides-context";

const useStyles = makeStyles({
  navigation: {
    display: "flex",
    fontSize: "18px",
    color: "#D0CBCB",
  },
  nav: {
    marginRight: "44px",
    cursor: "pointer",
    paddingBottom: "6px",
  },
  activeTab: {
    color: "#FFFFFF",
    fontWeight: "bold",
    borderBottom: "2px solid white",
  },
});
const Tabs = ({ updateRidesList }) => {
  const classes = useStyles();
  const ridesCxt = useContext(RidesContext);
  const { nearestRides, upcomingRides, pastRides } = ridesCxt;
  const [activeTab, setActiveTab] = useState(0);
  const [upcomingRidesLength, setUpcomingRidesLength] = useState();
  const [pastRidesLength, setPastRidesLength] = useState();

  useEffect(() => {
    setUpcomingRidesLength(upcomingRides?.length);
    setPastRidesLength(pastRides?.length);
  }, [upcomingRides, pastRides]);

  const nearestRidesClickHandler = () => {
    setActiveTab(0);
    updateRidesList(nearestRides);
  };
  const upcomingRidesClickHandler = () => {
    setActiveTab(1);
    updateRidesList(upcomingRides);
  };
  const pastRidesClickHandler = () => {
    setActiveTab(2);
    updateRidesList(pastRides);
  };
  return (
    <>
      <div className={classes.navigation}>
        <div
          className={`${classes.nav} ${activeTab === 0 && classes.activeTab}`}
          onClick={nearestRidesClickHandler}
        >
          Nearest Rides
        </div>
        <div
          className={`${classes.nav} ${activeTab === 1 && classes.activeTab}`}
          onClick={upcomingRidesClickHandler}
        >
          {`Upcoming Rides (${upcomingRidesLength && upcomingRidesLength})`}
        </div>
        <div
          className={`${classes.nav} ${activeTab === 2 && classes.activeTab}`}
          onClick={pastRidesClickHandler}
        >
          {`Past Rides (${pastRidesLength && pastRidesLength})`}
        </div>
      </div>
    </>
  );
};

export default Tabs;
