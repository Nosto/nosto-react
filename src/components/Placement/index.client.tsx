import React from "react";

export interface PlacementProps {
  /**
   * Indicates placement id from nosto dashboard recommendation campaigns
   */
  id: string;
  pageType?: string;
}

/**
 * Placement component takes prop id and renders nosto placement.
 * @example
 * ```
 *  <NostoProduct product={nostoProductId} tagging={product} />
 * ```
 */
const NostoPlacement: React.FC<PlacementProps> = ({ id, pageType }) => {
  return <div className="nosto_element" id={id} key={id + (pageType || "")} />;
};

export default NostoPlacement;
