import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Box from "../Box";
import FlexBox from "../Flex";
import Input from "../Input";
import MagnifyingGlass from "../Icons/MagnifyingGlass";

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
    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      padding="$theme_spacing_1x_small"
      borderRadius="$theme_radius_full"
      border="1px solid $theme_neutral_color_70"
    >
      <Box width="90%">
        <Input
          border="none"
          width="100%"
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearch}
          onKeyDown={handleSearch}
          focusvisible={{ outline: "none" }}
        />
      </Box>
      <Box
        ml="theme_spacing_minus_base"
        cursor="pointer"
        onClick={() => onSearch(searchValue)}
        onMouseEnter={() => setHoverIconColor(magnifyingGlassColorHover)}
        onMouseLeave={() => setHoverIconColor(magnifyingGlassColor)}
        data-testid="search-icon"
      >
        <MagnifyingGlass color={hoverIconColor} />
      </Box>
    </FlexBox>
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
