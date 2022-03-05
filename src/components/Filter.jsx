import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import FilterIcon from "../assets/FilterIcon";
import RidesContext from "../store/rides-context";

const useStyles = makeStyles({
  filter: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "& > span": {
      fontSize: "16px",
      color: "#F2F2F2",
      marginLeft: "8px",
    },
  },
  filterDrop: {
    position: "absolute",
    height: "190px",
    width: "228px",
    backgroundColor: "#131313",
    top: "145px",
    right: "40px",
    borderRadius: "15px",
    padding: "23px 30px",
    boxSizing: "border-box",
    transition: "all 300ms ease-out",
  },
  filterTitle: {
    fontSize: "20px",
    fontWeight: "300",
    color: "#A5A5A5",
    marginLeft: "12px",
    marginBottom: "12px",
  },
  bar: {
    borderTop: "1px solid #CBCBCB",
    margin: "0 5px 8px 5px",
  },
  filterTransition: {
    display: "none",
  },
  selectWrapper: {
    display: "flex",
    flexDirection: "column",
    "& > select": {
      marginTop: "12px",
      padding: "8px 12px",
      borderRadius: "5px",
      border: "none",
      outline: "none",
      backgroundColor: "#232323",
      color: "#FFFFFF",
      fontSize: "17px",
    },
  },
});
const Filter = () => {
  const classes = useStyles();
  const { listData: list } = useContext(RidesContext);
  const [filterClicked, setFilterClicked] = useState(false);
  const [filterList, setFilterList] = useState();
  const filterClickHandler = () => {
    setFilterClicked((prev) => !prev);
  };

  // const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);

  // const updateCitiesAndStates = useCallback((statesList, citiesList) => {
  //   states = statesList;
  //   cities = citiesList;
  //   console.log(states);
  //   console.log(cities);
  // }, []);

  // const filterListHandler = useCallback(() => {
  //   for (let obj in list) {
  //     let flag = false;
  //     let listState = list[obj].state;
  //     let listCity = list[obj].city;
  //     // if(filterList[listState]) {
  //     //   filterList[listState].push(listCity);
  //     // }
  //     // else {
  //     //   filterList[listState] = [listCity];
  //     // }

  //     for (let i in filterList) {
  //       // let filterListState = filterList[i].state;
  //       // let listState =
  //       if (
  //         filterList[i].state === list[obj].state &&
  //         !filterList[i].city.includes(list[obj].city)
  //       ) {
  //         filterList[i].city.push(list[obj].city);
  //         flag = true;
  //         break;
  //       }
  //     }
  //     let node = { state: list[obj].state, city: [list[obj].city] };
  //     if (filterList === undefined) {
  //       setFilterList([node]);
  //     }
  //     if (!flag && filterList !== undefined) {
  //       setFilterList((prev) => [...prev, node]);
  //     }
  //   }
  // }, [list, filterList]);

  // useEffect(() => {
  //   filterListHandler();
  // }, [list, filterListHandler]);

  return (
    <>
      <div className={classes.filter} onClick={filterClickHandler}>
        <FilterIcon />
        <span>Filters</span>
      </div>
      <div
        className={`${classes.filterDrop} ${
          !filterClicked && classes.filterTransition
        }`}
      >
        <div className={classes.filterTitle}>Filters</div>
        <div className={classes.bar}></div>
        <div className={classes.selectWrapper}>
          <select>
            <option value="" disabled selected>
              State
            </option>
            {filterList?.map((obj) => (
              <option>{obj.state}</option>
            ))}
          </select>
          <select>
            <option value="" disabled selected>
              City
            </option>
            {filterList?.map((obj) =>
              obj.city.map((city) => <option>{city}</option>)
            )}
          </select>
        </div>
      </div>
    </>
  );
};

export default Filter;
