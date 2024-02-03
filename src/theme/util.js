export const getThemeValue = (token) => {
  const savedTheme = localStorage.getItem("theme") || "{}";
  let theme = null;

  if (savedTheme) {
    theme = JSON.parse(savedTheme);
  }

  const themeValues = theme[token];

  if (!themeValues) {
    return token;
  }
  return themeValues;
};

const camelToKebab = (str) => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

export const getProccecedProps = (props) => {
  const data = Object.keys(props).reduce((acc, key) => {
    const value = props[key];
    const valuesArray = value && typeof value === "string" && value?.split(" ");
    const kebabKey = camelToKebab(key);
    let themeValue;
    if (valuesArray && valuesArray.length > 1) {
      themeValue = valuesArray.reduce((acc, _value) => {
        const currentThemeValue = getThemeValue(_value);
        return currentThemeValue ? `${acc} ${currentThemeValue}` : `${acc}`;
      }, "");
    } else {
      themeValue = getThemeValue(value);
    }
    return themeValue ? `${acc} ${kebabKey}: ${themeValue};` : `${acc}`;
  }, "");
  return data;
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const colorWithOpacity = (hex, opacity) => {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};
