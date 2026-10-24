import React from "react";
import PropTypes from "prop-types";

import FlexBox from "../Flex";
import Box from "../Box";
import StyledLink from "../StyledLink";
import Heading from "../Heading";

const getLinkProps = (item, onClick) => {
  return item.path ? { to: item.path, onClick } : { onClick };
};

const ListWithLink = ({ list, title, onClick = () => {} }) => {
  return (
    <FlexBox
      flexDirection="column"
      alignItems="flex-start"
      padding="$theme_spacing_2x_big"
      paddingTop="$theme_spacing_base"
    >
      <Box mb="$theme_spacing_base">
        <Heading type="3">{title}</Heading>
      </Box>
      {list.map((item) => {
        return (
          <FlexBox key={item._id} flexDirection="column">
            <Box>
              <StyledLink {...getLinkProps(item, () => onClick(item))}>
                {item.name}
              </StyledLink>
            </Box>
          </FlexBox>
        );
      })}
    </FlexBox>
  );
};

ListWithLink.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      path: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ListWithLink;
