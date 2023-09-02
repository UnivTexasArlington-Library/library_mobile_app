import {createContext, useState} from "react";

export const LatestEventsContext = createContext({
  latestEvents: [],
  setInitialLatestEvents: (latestEvents) => [],
  addLatestEvents: (id) => {},
});

function LatestEventsContextProvider({children}) {
  const [latestEvents, setLatestEvents] = useState([]);

  function setInitialLatestEvents(latestEventsList) {
    setLatestEvents(latestEventsList);
  }

  function addLatestEvents(id) {
    setLatestEvents((currentLatestEvents) => [...currentLatestEvents, id]);
  }

  const value = {
    latestEvents: latestEvents,
    setInitialLatestEvents: setInitialLatestEvents,
    addLatestEvents: addLatestEvents,
  };
  return (
    <LatestEventsContext.Provider value={value}>
      {children}
    </LatestEventsContext.Provider>
  );
}

export default LatestEventsContextProvider;
