import React, { MouseEvent } from "react";

export interface PlacementProps {
  id: string;
}

const NostoPlacement: React.FC<PlacementProps> = ({ id }) => {
  const handleClick = (e: MouseEvent) => {
    // noinspection TypeScriptUnresolvedFunction
    // @ts-ignore
    const targetLink = e.target.closest("a");
    if (!targetLink) {
      return;
    } else {
      e.preventDefault();
      location.href = targetLink.href
        .toString()
        .replace(new URL(targetLink.href).origin, "");
    }
  };

  return <div className="nosto_element" onClick={handleClick} id={id} />;
};

export default NostoPlacement;
