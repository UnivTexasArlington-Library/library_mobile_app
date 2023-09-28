import {createContext, useState} from "react";

export const InstagramContext = createContext({
  instagramReels: [],
  setInitialInstagramReels: (instagramReels) => [],
});

function InstagramContextProvider({children}) {
  const [instagramReels, setInstagramReels] = useState([]);

  function setInitialInstagramReels(instagramReelsList) {
    setInstagramReels(instagramReelsList);
  }

  const value = {
    instagramReels: instagramReels,
    setInitialInstagramReels: setInitialInstagramReels,
  };
  return (
    <InstagramContext.Provider value={value}>
      {children}
    </InstagramContext.Provider>
  );
}

export default InstagramContextProvider;
