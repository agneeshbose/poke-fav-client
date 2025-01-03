import "./style.css";
import Filter from "./Filter";
import List from "./List";

const ListView = () => {
  return (
    <div className="list-view-wrapper">
      <Filter />
      <List />
    </div>
  );
};

export default ListView;
