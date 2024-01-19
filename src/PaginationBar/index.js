import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { getThemeValue } from "../theme/util";
import FlexBox from "../Flex";
import Box from "../Box";
const pageRef = {
  current: 1,
};
const StyledItemMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: ${getThemeValue("$theme_spacing_small")};
  padding-right: ${getThemeValue("$theme_spacing_small")};
  color: ${getThemeValue("$theme_neutral_color_100")};
  cursor: pointer;
  &:hover {
    text-decoration-line: underline;
    color: ${getThemeValue("$theme_secondary_color_100")};
  }
`;
const PaginationBar = ({
  pageLength,
  limit,
  onChangePage,
  previousCTA,
  nextCTA,
  from,
  total,
  totalText,
}) => {
  const handlePageChange = (page) => {
    pageRef.current = page;
    onChangePage(page, limit);
  };
  const handleNextPage = useCallback(
    (currentPage) => {
      const page = currentPage + 1;
      if (page <= pageLength) {
        handlePageChange(page);
      }
    },
    [pageRef, pageLength],
  );
  const handlePrevPage = useCallback(
    (currentPage) => {
      const page = currentPage - 1;
      if (page > 0) {
        handlePageChange(page);
      }
    },
    [pageRef, pageLength],
  );
  const prev = previousCTA || "<";
  const next = nextCTA || ">";
  const fromText = from || " - ";
  return (
    <FlexBox
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop="$theme_spacing_2x_big"
    >
      <FlexBox
        display="flex"
        justifyVontent="center"
        alignUtems="center"
        marginBottom="$theme_spacing_2x_big"
      >
        <StyledItemMenu onClick={() => handlePrevPage(pageRef.current)}>
          {prev}
        </StyledItemMenu>
        <Box>{`${pageRef.current} ${fromText} ${pageLength}`}</Box>
        <StyledItemMenu onClick={() => handleNextPage(pageRef.current)}>
          {next}
        </StyledItemMenu>
      </FlexBox>
      {total && totalText && (
        <Box>
          {totalText} {total}
        </Box>
      )}
    </FlexBox>
  );
};

PaginationBar.propTypes = {
  pageLength: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  previousCTA: PropTypes.string,
  nextCTA: PropTypes.string,
  from: PropTypes.string,
  total: PropTypes.number,
  totalText: PropTypes.string,
};

export default PaginationBar;
