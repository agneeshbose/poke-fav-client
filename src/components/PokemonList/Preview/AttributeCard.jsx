import PropTypes from "prop-types";

const AttributeCard = ({ name, values }) => {
  return (
    <div className="attribute-card">
      <div className="attribute-name">{name}</div>
      <div className="attribute-values">
        {values?.map((value) => (
          <div className="attribute-value" key={value}>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

AttributeCard.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
};

export default AttributeCard;
