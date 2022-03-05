import { makeStyles } from "@mui/styles";
import React from "react";
import RideCard from "./RideCard";

const useStyles = makeStyles({
  root: {
    marginTop: "24px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

let keyValue = 101;

const ListOfRides = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        {props.list?.map((ride, index) => (
          <RideCard
            key={keyValue++}
            id={ride.id}
            originStation={ride.origin_station_code}
            stationPath={[...ride.station_path]}
            date={ride.date}
            distance={ride.diff}
            imgUrl={ride.map_url}
            city={ride.city}
            state={ride.state}
          />
        ))}
      </div>
    </>
  );
};

export default ListOfRides;
