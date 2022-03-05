import { makeStyles } from "@mui/styles";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

let stateKey = 101;
let cityKey = 1011;

const Filter = ({ ridesList, updateRidesList }) => {
  const classes = useStyles();
  const { listData: list } = useContext(RidesContext);
  const [filterClicked, setFilterClicked] = useState(false);
  const [filterList, setFilterList] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();

  const stateRef = useRef();
  const statesAndCitiesMap = useMemo(() => new Map(), []);

  const filterClickHandler = () => {
    setFilterClicked((prev) => !prev);
  };

  const updateFilterList = useCallback(() => {
    let calculatedList = [];
    statesAndCitiesMap?.forEach((value, key) => {
      let temp = [];
      value.forEach((item) => {
        temp.push(item);
      });

      let node = { state: key, cities: temp };
      calculatedList = [...calculatedList, node];
    });
    console.log(calculatedList);
    setFilterList(calculatedList);
  }, [statesAndCitiesMap]);

  const updateMap = useCallback(() => {
    for (let i in list) {
      let item = list[i];
      if (statesAndCitiesMap.has(item.state)) {
        statesAndCitiesMap.set(
          item.state,
          new Set([...statesAndCitiesMap.get(item.state), item.city])
        );
      } else {
        statesAndCitiesMap.set(item.state, new Set([item.city]));
      }
    }
    updateFilterList();
  }, [list, statesAndCitiesMap, updateFilterList]);

  //   console.log(statesAndCitiesMap);
  //   console.log(filterList);

  useEffect(() => {
    updateMap();
  }, [list, updateMap]);

  const stateChangeHandler = (e) => {
    console.log(e.target.value);
    setSelectedState(e.target.value);
  };

  const cityChangeHandler = (e) => {
    console.log(e.target.value);
    setSelectedCity(e.target.value);
  };

  const updateStateList = (data) => {
    setStateList(data);
  };

  const updateCityList = (data) => {
    setCityList(data);
  };

  const filterCityList = useCallback(
    (state) => {
      let node = filterList?.filter((item) => item.state === state);
      if (node !== undefined && node.length > 0) {
        let cities = node[0].cities;
        updateCityList(cities);
      }
    },
    [filterList]
  );

  // const filterRidesList = useCallback(
  //   (state, city) => {
  //     let calculatedList = [];
  //     console.log(state, city);
  //     if (state !== undefined) {
  //       calculatedList = ridesList?.filter((item) => item.state === state);
  //       console.log(calculatedList);
  //       if (city !== undefined) {
  //         calculatedList = calculatedList?.filter((item) =>
  //           item.city.includes(city)
  //         );
  //         console.log(calculatedList);
  //       }
  //     }
  //     // else if (city !== "") {
  //     // }
  //     if (calculatedList !== undefined && calculatedList.length > 0) {
  //       console.log(calculatedList);
  //       updateRidesList(calculatedList);
  //     }
  //   },
  //   [ridesList, updateRidesList]
  // );

  useEffect(() => {
    if (selectedState !== "DEFAULT_STATE") {
      //logic aaasashahhhhhhhhhhhh
      filterCityList(selectedState);
    }
    // filterRidesList(selectedState, selectedCity);
  }, [selectedState, filterCityList]);

  useEffect(() => {
    let newStateList = [];
    let newCityList = [];
    filterList?.forEach((obj) => {
      newStateList = [...newStateList, obj.state];
      obj.cities.forEach((item) => {
        newCityList = [...newCityList, item];
      });
    });
    updateStateList(newStateList);
    updateCityList(newCityList);
  }, [filterList]);

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
          <select
            ref={stateRef}
            onChange={stateChangeHandler}
            defaultValue="DEFAULT_STATE"
          >
            <option value="DEFAULT_STATE" disabled>
              State
            </option>
            {stateList?.map((state, index) => (
              <option key={index}>{state}</option>
            ))}
          </select>
          <select onChange={cityChangeHandler} defaultValue="DEFAULT_CITY">
            <option value="DEFAULT_CITY" disabled>
              City
            </option>
            {cityList?.length > 0 &&
              cityList?.map((city, index) => (
                <option key={index}>{city}</option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Filter;
