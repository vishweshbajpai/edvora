import { createContext, useCallback, useEffect, useState } from "react";

const RidesContext = createContext({
  userData: {},
  updateUserData: () => {},
  listData: [],
  updateListData: (data) => {},
  nearestRides: [],
  upcomingRides: [],
  pastRides: [],
});

export const RidesProvider = (props) => {
  const [user, setUser] = useState();
  const [list, setList] = useState();
  const [nearestRides, setNearestRides] = useState();
  const [upcomingRides, setUpcomingRides] = useState();
  const [pastRides, setPastRides] = useState();

  const [newList, setNewList] = useState();
  const stationCode = user?.station_code;

  const updateUserData = useCallback((data) => {
    setUser(data);
  }, []);

  const updateListData = useCallback((data) => {
    setList(data);
  }, []);

  const updateNewList = useCallback((data) => {
    setNewList(data);
  }, []);

  const updateNearestRides = useCallback((data) => {
    setNearestRides(data);
  }, []);

  const updateUpcomingRides = useCallback((data) => {
    setUpcomingRides(data);
  }, []);

  const updatePastRides = useCallback((data) => {
    setPastRides(data);
  }, []);

  useEffect(() => {
    let nearestRidesList = [];
    let updatedList = [];
    // nearest rides logic
    for (let obj in list) {
      const { station_path } = list[obj];
      let diff,
        min = Number.MAX_VALUE;
      for (let i in station_path) {
        diff = Math.abs(station_path[i] - stationCode);
        if (diff < min) {
          min = diff;
        }
      }
      const node = { ...list[obj], diff: min };
      updatedList.push(node);
    }
    nearestRidesList = [...updatedList];
    nearestRidesList.sort((a, b) => {
      return a.diff - b.diff;
    });
    updateNearestRides(nearestRidesList);
    updateNewList([...updatedList]);
  }, [list, stationCode, updateNearestRides, updateNewList]);

  useEffect(() => {
    //upcoming and past rides logic
    let calculatedUpcomingRides = [];
    let calculatedPastRides = [];
    for (let obj in newList) {
      const { date } = newList[obj];
      let rideDateObj = new Date(date);
      let currDateObj = new Date();
      let rideTime = rideDateObj.getTime();
      let currTime = currDateObj.getTime();
      let timeDifference = currTime - rideTime;
      if (timeDifference > 0) {
        //past rides
        calculatedPastRides = [...calculatedPastRides, newList[obj]];
      } else {
        //upcoming rides
        calculatedUpcomingRides = [...calculatedUpcomingRides, newList[obj]];
      }
    }
    updateUpcomingRides(calculatedUpcomingRides);
    updatePastRides(calculatedPastRides);
  }, [newList, updateUpcomingRides, updatePastRides]);

  const data = {
    userData: user,
    updateUserData: updateUserData,
    listData: list,
    updateListData: updateListData,
    nearestRides: nearestRides,
    upcomingRides: upcomingRides,
    pastRides: pastRides,
  };

  return (
    <RidesContext.Provider value={data}>{props.children}</RidesContext.Provider>
  );
};
export default RidesContext;
