import PropTypes from "prop-types";
import { createContext, useMemo, useState } from "react";
import { useFavourites } from "../hooks/favourites";

const DataProviderContext = createContext();

const DataProvider = ({ children }) => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activePreviewItemId, setActivePreviewItemId] = useState(null);
  const [activePreviewItem, setActivePreviewItem] = useState(null);
  const favourites = useFavourites();

  const updateActivePreviewItem = (item) => {
    if (item?.url) {
      const parts = item.url.split("/");
      const id = parts[parts.length - 2];
      setActivePreviewItemId(id);
    }
    setActivePreviewItem(item);
  };

  const contextValue = useMemo(
    () => ({
      favourites,
      activeFilter,
      updateActiveFilter: setActiveFilter,
      activePreviewItem,
      activePreviewItemId,
      updateActivePreviewItem,
    }),
    [favourites, activeFilter, activePreviewItem, activePreviewItemId]
  );

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
