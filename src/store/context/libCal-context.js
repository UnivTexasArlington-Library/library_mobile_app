import {createContext, useState} from "react";

export const LibCalContext = createContext({
  todaysLibHours: [],
  setInitialLibHours: (todaysLibHours) => [],
});

function LibCalContextProvider({children}) {
  const [todaysLibHours, setTodaysLibHours] = useState([]);

  function setInitialLibHours(todaysLibHoursList) {
    setTodaysLibHours(todaysLibHoursList);
  }

  const value = {
    todaysLibHours: todaysLibHours,
    setInitialLibHours: setInitialLibHours,
  };
  return (
    <LibCalContext.Provider value={value}>{children}</LibCalContext.Provider>
  );
}

export default LibCalContextProvider;
