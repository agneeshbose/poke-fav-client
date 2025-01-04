import { useContext } from "react";
import { DataProviderContext } from "../../../contexts/data-provider.context";

const filters = [
  { label: "All", value: "ALL" },
  { label: "Favourites", value: "FAV" },
];

const Filter = () => {
  const { activeFilter, updateActiveFilter } = useContext(DataProviderContext);

  return (
    <div className="filter">
      <div className="filter-items">
        {filters.map(({ label, value }) => {
          const isActive = activeFilter === value;

          return (
            <div
              key={value}
              className={`filter-item ${isActive ? "active" : ""}`}
              onClick={() => updateActiveFilter(value)}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
