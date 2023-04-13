import React from "react";

export interface PlacementProps {
  id: string;
  pageType?: string;
}

const NostoPlacement: React.FC<PlacementProps> = ({ id, pageType }) => {
  return <div className="nosto_element" id={id} key={id + (pageType || "")} />;
};

export default NostoPlacement;
