import React from "react";
import { useHistory } from "react-router-dom";

function Placement({ id }) {
  let history = useHistory();

  const handleClick = (e) => {
    const targetLink = e.target.closest("a");
    if (!targetLink) {
      return;
    } else {
      e.preventDefault();
      history.push(
        targetLink.href.toString().replace(new URL(targetLink.href).origin, "")
      );
    }
  };

  return <div className="nosto_element" id={id} onClick={handleClick} />;
}

export default Placement;
