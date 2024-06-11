import "./nameOfTheater.scss";

const NameOfTheater = ({ nameOfTheater }) => {
  return (
    <p className="text__first">
      <span className="text__second">{nameOfTheater}</span>
    </p>
  );
};

export default NameOfTheater;
