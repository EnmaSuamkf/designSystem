/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, createContext, useContext, useState } from "react";
import { StyleSheetManager } from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
const axios = require("axios");

// Design props such as borderRadius or cover stay in the styles and never reach the DOM.
// Components rendered as React components still receive every prop.
const shouldForwardProp = (prop, elementToBeCreated) =>
  typeof elementToBeCreated === "string" ? isPropValid(prop) : true;

const AVOID_KEYS = ["_id", "__v", "createdAt", "updatedAt"];

const DesignSytemContext = createContext({});

export const useDesignSystem = () => useContext(DesignSytemContext);

export const DesignSystemProvider = ({ children, url, headers, theme }) => {
  const [refresh, setRefresh] = useState(false);
  const handlerUpdateTheme = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get(`${url}`, {
          headers,
        });
        const themeData = response.data[0];
        let themeObject = {};
        Object.keys(themeData).forEach((group) => {
          if (!AVOID_KEYS.includes(group)) {
            Object.keys(themeData[group]).forEach((token) => {
              const jsVariableName = `$${token}`;
              themeObject[jsVariableName] = themeData[group][token];
            });
          }
        });

        localStorage.setItem("theme", JSON.stringify(themeObject));
      } catch (error) {
        console.error("Error fetching theme: ", error);
      }
    };

    if (url) fetchTheme();
    if (theme) {
      localStorage.setItem("theme", JSON.stringify(theme));
    }
  }, [refresh]);

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <DesignSytemContext.Provider value={handlerUpdateTheme}>
        {children}
      </DesignSytemContext.Provider>
    </StyleSheetManager>
  );
};
