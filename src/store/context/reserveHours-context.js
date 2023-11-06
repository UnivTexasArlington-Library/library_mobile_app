import {createContext, useState} from "react";

export const ReserveHoursContext = createContext({
  availabilityAndBookings: [],
  setInitialAvailabilityAndBookings: (list) => [],
});

function ReserveHoursContextProvider({children}) {
  const [availabilityAndBookings, setAvailabilityAndBookings] = useState([]);

  function setInitialAvailabilityAndBookings(availabilityAndBookingsList) {
    setAvailabilityAndBookings(availabilityAndBookingsList);
  }

  const value = {
    availabilityAndBookings: availabilityAndBookings,
    setInitialAvailabilityAndBookings: setInitialAvailabilityAndBookings,
  };
  return (
    <ReserveHoursContext.Provider value={value}>
      {children}
    </ReserveHoursContext.Provider>
  );
}

export default ReserveHoursContextProvider;
