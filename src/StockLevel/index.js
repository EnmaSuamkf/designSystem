import React from "react";
import PropTypes from "prop-types";

import Tag from "../Tag";

const StockLevel = ({
  reponer = 0,
  okLabel = "ok",
  replenishLabel,
  replenishStatus = "error",
  okStatus = "active",
}) => {
  if (reponer > 0) {
    const title = replenishLabel || `Reponer ${reponer}`;
    return <Tag variant="status" tags={[{ title, status: replenishStatus }]} />;
  }

  return <Tag variant="status" tags={[{ title: okLabel, status: okStatus }]} />;
};

StockLevel.propTypes = {
  reponer: PropTypes.number,
  okLabel: PropTypes.string,
  replenishLabel: PropTypes.string,
  replenishStatus: PropTypes.string,
  okStatus: PropTypes.string,
};

export default StockLevel;
