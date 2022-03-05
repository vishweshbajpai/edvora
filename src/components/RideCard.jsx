import { makeStyles } from "@mui/styles";
import React from "react";
import Sugar from "sugar";

const useStyles = makeStyles({
  wrapper: {
    padding: "25px 20px 25px 30px",
    display: "flex",
    borderRadius: "10px",
    backgroundColor: "#171717",
    marginBottom: "13px",
  },
  img: {
    minWidth: "296px",
    height: "148px",
    borderRadius: "5px",
    marginRight: "44px",
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "18px",
    color: "#cfcfcf",
    width: "100%",
    "& > div > span": {
      color: "#FFFFFF",
    },
  },
  firstLine: {
    display: "flex",
    justifyContent: "space-between",
  },
  chip: {
    marginLeft: "24px",
    padding: "4px 10px",
    fontSize: "12px",
    color: "#FFFFFF",
    backgroundColor: "#0000008F",
    borderRadius: "16px",
  },
});
const RideCard = ({
  id,
  originStation,
  stationPath,
  date,
  distance,
  imgUrl,
  city,
  state,
}) => {
  const classes = useStyles();
  let path = `[ ${stationPath.join(", ")} ]`;
  const newDate = Sugar.Date.format(new Date(date), "{do} %b {yyyy} %R");
  return (
    <>
      <div className={classes.wrapper}>
        <img src={imgUrl} alt="map" className={classes.img} />
        <div className={classes.textWrapper}>
          <div className={classes.firstLine}>
            <div>
              Ride Id : <span>{id}</span>
            </div>
            <div>
              <span className={classes.chip}>{city}</span>
              <span className={classes.chip}>{state}</span>
            </div>
          </div>
          <div>
            Origin Station : <span>{originStation}</span>
          </div>
          <div>
            station_path : <span>{path}</span>
          </div>
          <div>
            Date : <span>{newDate}</span>
          </div>
          <div>
            Distance : <span>{distance}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RideCard;
