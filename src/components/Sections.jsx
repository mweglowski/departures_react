import Section from "./Section";

const Sections = ({ areas, currentDepartures }) => {
  return (
    <div className="sections">
      {areas.map((area, index) => (
        <Section
          currentDepartures={currentDepartures}
          area={area}
          key={index}
        />
      ))}
    </div>
  );
};

export default Sections;
