import React from "react";

export interface PlacementProps {
  id: string;
}

const NostoPlacement: React.FC<PlacementProps> = ({ id }) => {
  return <div className="nosto_element" id={id} />;
};

export default NostoPlacement;
