import React from "react";
import Proptypes from "prop-types";
import { format as formatter } from "date-fns";

const Date = ({ date, format = "dd/MM/yyyy", style }) => {
  return <div style={style}>{formatter(date, format)}</div>;
};

Date.propTypes = {
  date: Proptypes.string.isRequired,
  format: Proptypes.string,
  style: Proptypes.object,
};

export default Date;
