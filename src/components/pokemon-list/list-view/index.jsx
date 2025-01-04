import "./style.css";
import Filter from "./filter";
import List from "./list";

const ListView = () => {
  return (
    <div className="list-view-wrapper">
      <Filter />
      <List />
    </div>
  );
};

export default ListView;
