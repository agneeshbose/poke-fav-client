import "./style.css";
import favEmptyIcon from "../../../assets/images/fav-empty.svg";
import AttributeCard from "./attribute-card";

const Preview = () => {
  return (
    <div className="preview-container">
      <div className="preview-header">
        <div>PIKACHU</div>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/31.png"
          width="200rem"
        />
        <div className="add-favourite">
          <img src={favEmptyIcon} width="20rem" color="white" />
          Add to favourites
        </div>
      </div>
      <AttributeCard name="Abilities" values={["static", "lightning-rod"]} />
      <AttributeCard name="Types" values={["electric"]} />
      <AttributeCard name="Evolution options" values={["pika"]} />
    </div>
  );
};

export default Preview;
