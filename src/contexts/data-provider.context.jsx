import PropTypes from "prop-types";
import { createContext, useState } from "react";

const DataProviderContext = createContext();

const DataProvider = ({ children }) => {
  const [activeFilter, setActiveFiter] = useState("ALL");

  const contextValue = {
    activeFilter,
    updateActiveFilter: setActiveFiter,
    activePreviewItem: null,
  };

  return (
    <DataProviderContext.Provider value={contextValue}>
      {children}
    </DataProviderContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node,
};

export { DataProvider, DataProviderContext };
