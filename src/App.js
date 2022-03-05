import { useContext, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import RidesContext from "./store/rides-context";

function App() {
  const ridesCxt = useContext(RidesContext);
  const { updateListData, updateUserData } = ridesCxt;

  useEffect(() => {
    try {
      const fetchRides = async () => {
        const response = await fetch("https://assessment.api.vweb.app/rides");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Could not fetch data from server!");
        }
        updateListData(data);
      };
      fetchRides();

      const fetchUser = async () => {
        const response = await fetch("https://assessment.api.vweb.app/user");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Could not fetch data from server!");
        }
        updateUserData(data);
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, [updateListData, updateUserData]);

  return <Layout />;
}

export default App;
