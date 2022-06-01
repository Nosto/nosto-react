import React, { useEffect } from "react";

interface NostoTaggingProps {
  currentVariation: string;
}

const NostoTagging: React.FC<NostoTaggingProps> = ({
  currentVariation
}) => {
  useEffect(() => {
    // @ts-ignore
  }, []);

  return (
    <>
      { currentVariation && <div className="nosto_variation" style={{ display: "none" }}>{currentVariation}</div> }
    </>
  );
};

export default NostoTagging;
