import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getThemeValue } from "../theme/util";
import { mobileOnly } from "../theme/breakpoints";

const FONT_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

const token = (name) => () => getThemeValue(name);

// Light slate row/hover tints that work with any palette.
const HEADER_BG = "#F6F7F9";
const HOVER_BG = "rgba(17, 24, 39, 0.03)";

const Scroll = styled.div`
  width: 100%;
  min-width: 0;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${FONT_STACK};
  font-size: 14px;
  line-height: 20px;
  color: ${token("$theme_neutral_color_100")};
`;

const Th = styled.th`
  padding: 12px;
  text-align: ${({ $align }) => $align || "left"};
  width: ${({ $width }) => $width || "auto"};
  vertical-align: bottom;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${token("$theme_neutral_color_70")};
  background: ${HEADER_BG};
  border-bottom: 1px solid ${token("$theme_neutral_color_50")};
`;

const Td = styled.td`
  padding: 12px;
  text-align: ${({ $align }) => $align || "left"};
  vertical-align: middle;
  border-bottom: 1px solid ${token("$theme_neutral_color_50")};
`;

const Tr = styled.tr`
  &:hover td {
    background: ${HOVER_BG};
  }
  &:last-child td {
    border-bottom: none;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 0;
  font-family: ${FONT_STACK};
  font-size: 14px;
  line-height: 20px;
  color: ${token("$theme_neutral_color_100")};
`;

const RowCard = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  padding: 12px;
  background: ${token("$theme_neutral_color_0")};
  border: 1px solid ${token("$theme_neutral_color_50")};
  border-radius: ${token("$theme_radius_regular")};
`;

const CardField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;
  min-width: 0;
  border-bottom: 1px solid ${token("$theme_neutral_color_50")};
  &:last-child {
    border-bottom: none;
  }
`;

const CardLabel = styled.span`
  flex: 0 0 auto;
  max-width: 40%;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${token("$theme_neutral_color_70")};
`;

const CardValue = styled.div`
  min-width: 0;
  text-align: right;
  overflow-wrap: anywhere;
`;

// Actions get their own full-width block; their buttons stack full-width.
const CardActions = styled.div`
  padding-top: 12px;
  & > div {
    flex-direction: column;
    align-items: stretch;
  }
  & button {
    width: 100%;
    min-height: 40px;
  }
`;

const ACTIONS_KEY = "actions";

const DataCards = ({ columns, rows }) => (
  <CardList role="list">
    {rows.map(({ key, cells }) => (
      <RowCard key={key} role="listitem" data-testid="data-card">
        {columns
          .filter(({ key: columnKey }) => columnKey !== ACTIONS_KEY)
          .map(({ key: columnKey, header }) => (
            <CardField key={columnKey}>
              <CardLabel>{header}</CardLabel>
              <CardValue>{cells[columnKey]}</CardValue>
            </CardField>
          ))}
        {columns.some(({ key: columnKey }) => columnKey === ACTIONS_KEY) && (
          <CardActions>{cells[ACTIONS_KEY]}</CardActions>
        )}
      </RowCard>
    ))}
  </CardList>
);

const columnsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.string.isRequired,
    header: PropTypes.node,
    align: PropTypes.oneOf(["left", "center", "right"]),
    width: PropTypes.string,
  }),
);
const rowsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    cells: PropTypes.object.isRequired,
  }),
);

DataCards.propTypes = {
  columns: columnsPropType.isRequired,
  rows: rowsPropType.isRequired,
};

// Table from the mobile breakpoint up; below it every row becomes a card with
// one label/value line per column (the column header is the label) and the
// "actions" column as a full-width block. The consumer tells which one to use.
const DataTable = ({ columns, rows, isMobile = false }) => {
  if (isMobile) return <DataCards columns={columns} rows={rows} />;
  return (
    <Scroll>
      <Table>
        <thead>
          <tr>
            {columns.map(({ key, header, align, width }) => (
              <Th key={key} $align={align} $width={width} scope="col">
                {header}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ key, cells }) => (
            <Tr key={key}>
              {columns.map(({ key: columnKey, align }) => (
                <Td key={columnKey} $align={align}>
                  {cells[columnKey]}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </Table>
    </Scroll>
  );
};

DataTable.propTypes = {
  isMobile: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.node,
      align: PropTypes.oneOf(["left", "center", "right"]),
      width: PropTypes.string,
    }),
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      cells: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

export const RowActions = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;
  justify-content: ${({ $align }) => $align || "flex-start"};
  & button {
    min-height: 32px;
    padding: 4px 12px;
    white-space: nowrap;
  }
  ${mobileOnly`
    flex-wrap: wrap;
  `}
`;

// Simple vertical list of bordered rows (replaces plain <ul> lists).
export const ItemList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  font-family: ${FONT_STACK};
  font-size: 14px;
  line-height: 20px;
  color: ${token("$theme_neutral_color_100")};
`;

const Row = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  margin-bottom: 8px;
  background: ${token("$theme_neutral_color_0")};
  border: 1px solid ${token("$theme_neutral_color_50")};
  border-radius: ${token("$theme_radius_regular")};
  transition: background-color 0.15s ease;
  &:hover {
    background: ${HEADER_BG};
  }
  ${mobileOnly`
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  `}
`;

export const ItemRow = ({ children, actions }) => (
  <Row>
    <div style={{ minWidth: 0, flex: "1 1 auto" }}>{children}</div>
    {actions && <RowActions>{actions}</RowActions>}
  </Row>
);
ItemRow.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.node,
};

export const GroupTitle = styled.h2`
  margin: 16px 0 8px;
  font-family: ${FONT_STACK};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${token("$theme_neutral_color_70")};
  &:first-child {
    margin-top: 0;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  font-family: ${FONT_STACK};
  font-size: 14px;
`;

export default DataTable;
