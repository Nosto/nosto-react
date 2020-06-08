import React, { MouseEvent } from 'react';

import { useHistory } from "react-router-dom";
import { FunctionComponent } from "react";

export interface PlacementProps {
  id: string;
}

const Placement: FunctionComponent<PlacementProps> = ({ id }) => {

  let history = useHistory();

  const handleClick = (e: MouseEvent) => {
    // noinspection TypeScriptUnresolvedFunction
    // @ts-ignore
    const targetLink = e.target.closest("a");
    if (!targetLink) {
      return;
    } else {
      e.preventDefault();
      history.push(targetLink.href.toString().replace(new URL(targetLink.href).origin, ""));
    }
  };

  return (
    <div className="nosto_element" id={id} onClick={handleClick} />
  );
}

export default Placement;
