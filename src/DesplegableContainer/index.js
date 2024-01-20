import React, { useMemo } from "react";
import PropTypes from "prop-types";

import Box from "../Box";
import Show from "../Show";

const DesplegableBox = ({
  displayStatus = false,
  callbackOnDisplay = () => {},
  children,
}) => {
  const showBlock = useMemo(() => {
    if (displayStatus) {
      callbackOnDisplay();
    }
    return displayStatus;
  }, [displayStatus]);

  return (
    <Show when={showBlock}>
      <Box>{children}</Box>
    </Show>
  );
};

DesplegableBox.propTypes = {
  displayStatus: PropTypes.bool,
  callbackOnDisplay: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default DesplegableBox;
