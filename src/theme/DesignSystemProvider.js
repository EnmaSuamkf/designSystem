/* eslint-disable no-console */
import React, { useEffect, createContext, useContext, useState } from "react";
import axiosInstance from "~theme/axios";

const AVOID_KEYS = ["_id", "__v", "createdAt", "updatedAt"];

const DesignSytemContext = createContext({});

export const useDesignSystem = () => useContext(DesignSytemContext);

// eslint-disable-next-line react/prop-types
export const DesignSystemProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const handlerUpdateTheme = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axiosInstance.get("/config/theme", {
          headers: {
            "super-admin-token": process.env.REACT_APP_SUPER_ADMIN_TOKEN,
          },
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

        console.log("themeObject: ", themeObject);
        localStorage.setItem("theme", JSON.stringify(themeObject));
      } catch (error) {
        console.error("Error fetching theme: ", error);
      }
    };

    fetchTheme();
  }, [refresh]);

  return (
    <DesignSytemContext.Provider value={handlerUpdateTheme}>
      {children}
    </DesignSytemContext.Provider>
  );
};
