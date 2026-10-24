import styled from "styled-components";
import FlexBox from "../Flex";
import { mobileOnly } from "../theme/breakpoints";

// Label + field rows: side by side on desktop, one column below the mobile
// breakpoint with full-width fields. The doubled "&&" raises the specificity
// above the classes of the children without using !important.
const FormRow = styled(FlexBox)`
  ${mobileOnly`
    && {
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      gap: 4px;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
    && * {
      max-width: 100%;
    }
    && > * {
      width: 100%;
      max-width: 100%;
      margin-left: 0;
      margin-right: 0;
      box-sizing: border-box;
    }
    && input:not([type="checkbox"]):not([type="radio"]),
    && select,
    && textarea {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }
  `}
`;

export default FormRow;
