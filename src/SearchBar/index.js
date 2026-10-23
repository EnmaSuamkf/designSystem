import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Box from "../Box";
import Input from "../Input";
import MagnifyingGlass from "../Icons/MagnifyingGlass";
import { getThemeValue, tintColor } from "../theme/util";
import { getFieldBaseStyles } from "../theme/fieldStyles";

// Same look as Input, but the border/focus ring live on the wrapper so the
// icon sits inside the field.
const SearchWrapper = styled.div`
  ${() => getFieldBaseStyles()}
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &:focus-within {
    border-color: ${() => getThemeValue("$theme_secondary_color_90")};
    box-shadow: 0 0 0 3px
      ${() => tintColor(getThemeValue("$theme_secondary_color_70"), 0.35)};
  }
`;

const SearchBar = ({
  onSearch = () => {},
  onEnter = () => {},
  onLoad = () => {},
  magnifyingGlassColor = "$theme_neutral_color_70",
  magnifyingGlassColorHover = "$theme_neutral_color_100",
  placeholder,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [hoverIconColor, setHoverIconColor] = useState(magnifyingGlassColor);

  useEffect(() => {
    onLoad();
  }, [onLoad]);
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.key === "Enter") {
      onEnter(searchValue);
    }
  };
  return (
    <SearchWrapper>
      <Box width="90%">
        <Input
          border="none"
          padding="0"
          height="38px"
          backgroundColor="transparent"
          width="100%"
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearch}
          onKeyDown={handleSearch}
          focusvisible={{ outline: "none", boxShadow: "none" }}
        />
      </Box>
      <Box
        cursor="pointer"
        onClick={() => onSearch(searchValue)}
        onMouseEnter={() => setHoverIconColor(magnifyingGlassColorHover)}
        onMouseLeave={() => setHoverIconColor(magnifyingGlassColor)}
        data-testid="search-icon"
      >
        <MagnifyingGlass color={hoverIconColor} />
      </Box>
    </SearchWrapper>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  onEnter: PropTypes.func,
  onLoad: PropTypes.func,
  magnifyingGlassColor: PropTypes.string,
  magnifyingGlassColorHover: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SearchBar;
