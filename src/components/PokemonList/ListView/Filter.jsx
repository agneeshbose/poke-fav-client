import { useState } from "react";

const filters = [
  { label: "All", value: "all" },
  { label: "Favourites", value: "fav" },
];

const Filter = () => {
  const [activeFilter, setActiveFilter] = useState(filters[0].value);

  return (
    <div className="filter">
      <div className="filter-items">
        {filters.map(({ label, value }) => {
          const isActive = activeFilter === value;

          return (
            <div
              key={value}
              className={`filter-item ${isActive ? "active" : ""}`}
              onClick={() => setActiveFilter(value)}
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
