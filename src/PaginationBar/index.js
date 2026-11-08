import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { getThemeValue } from "../theme/util";
import FlexBox from "../Flex";
import Box from "../Box";
import Input from "../Input";
import Select from "../Select";

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50];

const StyledItemMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: ${getThemeValue("$theme_spacing_small")};
  padding-right: ${getThemeValue("$theme_spacing_small")};
  color: ${(props) =>
    props.$disabled
      ? getThemeValue("$theme_neutral_color_50")
      : getThemeValue("$theme_neutral_color_100")};
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  &:hover {
    text-decoration-line: ${(props) =>
      props.$disabled ? "none" : "underline"};
    color: ${(props) =>
      props.$disabled
        ? getThemeValue("$theme_neutral_color_50")
        : getThemeValue("$theme_secondary_color_100")};
  }
`;

// Controlled pagination. The current page comes from currentPage; the bar never keeps
// its own page. onChangePage(page, limit) is called for page moves, and
// onChangePage(1, newLimit) when the page size changes.
const PaginationBar = ({
  pageLength,
  currentPage = 1,
  limit,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onChangePage,
  previousCTA,
  nextCTA,
  firstCTA,
  lastCTA,
  from,
  total,
  totalText,
  pageLabel,
  pageSizeLabel,
}) => {
  const [pageInput, setPageInput] = useState(String(currentPage));

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pageLength;

  const goToPage = (page) => {
    if (page >= 1 && page <= pageLength && page !== currentPage) {
      onChangePage(page, limit);
    }
  };

  // Enter or blur confirms the typed page. Anything that is not a whole page
  // number in range is ignored, and the input goes back to the current page.
  const commitPageInput = () => {
    const page = Number(pageInput);
    if (Number.isInteger(page)) {
      goToPage(page);
    }
    setPageInput(String(currentPage));
  };

  const handlePageInputKeyDown = (event) => {
    if (event.key === "Enter") {
      commitPageInput();
    }
  };

  const handlePageSizeChange = (value) => {
    const newLimit = Number(value);
    if (newLimit !== limit) {
      onChangePage(1, newLimit);
    }
  };

  const sizeOptions = [...new Set([...pageSizeOptions, limit])].sort(
    (a, b) => a - b,
  );

  const prev = previousCTA || "<";
  const next = nextCTA || ">";
  const first = firstCTA || "«";
  const last = lastCTA || "»";
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
        justifyContent="center"
        alignItems="center"
        marginBottom="$theme_spacing_2x_big"
      >
        <StyledItemMenu
          $disabled={isFirstPage}
          aria-disabled={isFirstPage}
          onClick={() => goToPage(1)}
        >
          {first}
        </StyledItemMenu>
        <StyledItemMenu
          $disabled={isFirstPage}
          aria-disabled={isFirstPage}
          onClick={() => goToPage(currentPage - 1)}
        >
          {prev}
        </StyledItemMenu>
        <Input
          type="text"
          inputMode="numeric"
          width="auto"
          textalign="center"
          aria-label={pageLabel}
          value={pageInput}
          onChange={(event) => setPageInput(event.target.value)}
          onBlur={commitPageInput}
          onKeyDown={handlePageInputKeyDown}
        />
        <Box>{`${fromText} ${pageLength}`}</Box>
        <StyledItemMenu
          $disabled={isLastPage}
          aria-disabled={isLastPage}
          onClick={() => goToPage(currentPage + 1)}
        >
          {next}
        </StyledItemMenu>
        <StyledItemMenu
          $disabled={isLastPage}
          aria-disabled={isLastPage}
          onClick={() => goToPage(pageLength)}
        >
          {last}
        </StyledItemMenu>
      </FlexBox>
      {sizeOptions.length > 0 && pageSizeOptions.length > 0 && (
        <FlexBox
          display="flex"
          alignItems="center"
          marginBottom="$theme_spacing_2x_big"
        >
          <Select
            aria-label={pageSizeLabel}
            width="auto"
            value={String(limit)}
            onChange={handlePageSizeChange}
            options={sizeOptions.map((size) => ({
              value: String(size),
              label: String(size),
            }))}
          />
        </FlexBox>
      )}
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
  currentPage: PropTypes.number,
  limit: PropTypes.number.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  onChangePage: PropTypes.func.isRequired,
  previousCTA: PropTypes.string,
  nextCTA: PropTypes.string,
  firstCTA: PropTypes.string,
  lastCTA: PropTypes.string,
  from: PropTypes.string,
  total: PropTypes.number,
  totalText: PropTypes.string,
  pageLabel: PropTypes.string,
  pageSizeLabel: PropTypes.string,
};

export default PaginationBar;
