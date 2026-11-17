import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "../Image";
import { FONT_STACK } from "../theme/fieldStyles";
import { getThemeValue, tintColor } from "../theme/util";

// Presentational image picker. It never uploads: it reports the chosen File
// through onSelectFile and the parent decides what to do with it.
const Label = styled.label`
  display: block;
  margin-bottom: ${() => getThemeValue("$theme_spacing_1x_small")};
  color: ${() => getThemeValue("$theme_neutral_color_100")};
  font-family: ${FONT_STACK};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${() => getThemeValue("$theme_spacing_base")};
`;

const PreviewFrame = styled.div`
  box-sizing: border-box;
  padding: ${() => getThemeValue("$theme_spacing_1x_small")};
  border: 1px solid ${() => getThemeValue("$theme_neutral_color_50")};
  border-radius: ${() => getThemeValue("$theme_radius_regular")};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${() => getThemeValue("$theme_spacing_small")};
`;

const ActionButton = styled.button`
  box-sizing: border-box;
  min-height: 36px;
  padding: ${() => getThemeValue("$theme_spacing_1x_small")}
    ${() => getThemeValue("$theme_spacing_base")};
  border-radius: ${() => getThemeValue("$theme_radius_regular")};
  font-family: ${FONT_STACK};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px
      ${() => tintColor(getThemeValue("$theme_secondary_color_70"), 0.35)};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

const ChooseButton = styled(ActionButton)`
  border: 1px solid ${() => getThemeValue("$theme_neutral_color_50")};
  background-color: ${() => getThemeValue("$theme_neutral_color_0")};
  color: ${() => getThemeValue("$theme_neutral_color_100")};

  &:hover:not(:disabled) {
    border-color: ${() => getThemeValue("$theme_neutral_color_70")};
  }
`;

const RemoveButton = styled(ActionButton)`
  border: 1px solid transparent;
  background-color: transparent;
  color: ${() => getThemeValue("$theme_neutral_color_100")};

  &:hover:not(:disabled) {
    background-color: ${() =>
      tintColor(getThemeValue("$theme_neutral_color_100"), 0.08)};
  }
`;

const HintText = styled.span`
  display: block;
  margin-top: ${() => getThemeValue("$theme_spacing_1x_small")};
  color: ${() => getThemeValue("$theme_neutral_color_70")};
  font-family: ${FONT_STACK};
  font-size: 12px;
  line-height: 16px;
`;

const ErrorText = styled.span`
  display: block;
  margin-top: ${() => getThemeValue("$theme_spacing_1x_small")};
  color: ${() => getThemeValue("$theme_negative_color")};
  font-family: ${FONT_STACK};
  font-size: 12px;
  line-height: 16px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImageUploadField = ({
  id,
  label,
  hint,
  previewUrl = "",
  loading = false,
  onSelectFile,
  onRemove,
  chooseLabel,
  removeLabel,
  emptyLabel,
  accept = "image/*",
  previewWidth = "160px",
  previewHeight = "80px",
  error,
}) => {
  const fileInputRef = useRef(null);
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  const openFilePicker = () => {
    if (!loading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      onSelectFile(file);
    }
    // Clear the input so choosing the same file again still fires a change.
    event.target.value = "";
  };

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Body>
        <PreviewFrame>
          <Image
            device="mobile"
            urlImage={previewUrl}
            loadingBannerImage={Boolean(loading)}
            width={previewWidth}
            height={previewHeight}
            loadingLabel={emptyLabel}
          />
        </PreviewFrame>
        <Actions>
          <ChooseButton
            type="button"
            id={id}
            disabled={loading}
            aria-describedby={describedBy}
            onClick={openFilePicker}
          >
            {chooseLabel}
          </ChooseButton>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            id={`${id}-file`}
            accept={accept}
            tabIndex={-1}
            aria-hidden="true"
            onChange={handleFileChange}
          />
          {previewUrl ? (
            <RemoveButton type="button" disabled={loading} onClick={onRemove}>
              {removeLabel}
            </RemoveButton>
          ) : null}
        </Actions>
      </Body>
      {hint ? <HintText id={hintId}>{hint}</HintText> : null}
      {error ? (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      ) : null}
    </div>
  );
};

ImageUploadField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  previewUrl: PropTypes.string,
  loading: PropTypes.bool,
  onSelectFile: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  chooseLabel: PropTypes.string.isRequired,
  removeLabel: PropTypes.string,
  emptyLabel: PropTypes.string,
  accept: PropTypes.string,
  previewWidth: PropTypes.string,
  previewHeight: PropTypes.string,
  error: PropTypes.string,
};

export default ImageUploadField;
