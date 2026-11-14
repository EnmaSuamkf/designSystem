import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { getThemeValue } from "../theme/util";

// A framed embedded page (for example a preview of another site). It always has a title, which
// screen readers announce, and it is lazy, so a page with many previews stays light.
const StyledFrame = styled.iframe`
  display: block;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  max-width: 100%;
  border: 1px solid ${() => getThemeValue("$theme_neutral_color_50")};
  border-radius: 8px;
  background: #ffffff;
`;

const Frame = ({ src, title, width = "100%", height = "480px" }) => (
  <StyledFrame
    src={src}
    title={title}
    loading="lazy"
    $width={width}
    $height={height}
  />
);

Frame.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Frame;
