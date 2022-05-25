import React from "react";

export interface PlacementProps {
  id: string;
}

const Placement: React.FC<PlacementProps> = ({ id }) => {
  return <div className="nosto_element" id={id} />;
};

export default Placement;
