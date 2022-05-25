import React, { MouseEvent } from "react";

import { useNavigate } from "react-router-dom";

export interface PlacementProps {
  id: string;
}

const Placement: React.FC<PlacementProps> = ({ id }) => {
  let navigate = useNavigate();
  console.log(useNavigate);
  console.log(navigate);

  const handleClick = (e: MouseEvent) => {
    // noinspection TypeScriptUnresolvedFunction
    // @ts-ignore
    const targetLink = e.target.closest("a");
    if (!targetLink) {
      return;
    } else {
      e.preventDefault();
      navigate(
        targetLink.href.toString().replace(new URL(targetLink.href).origin, "")
      );
    }
  };

  return <div className="nosto_element" id={id} onClick={handleClick} />;
};

export default Placement;
