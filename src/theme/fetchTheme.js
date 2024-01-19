const fs = require("fs");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const axiosInstance = axios.create({
  baseURL: "https://laferiadelcotillon-6b0fa1b9e69e.herokuapp.com",
  timeout: 10000,
});

const AVOID_KEYS = ["_id", "__v", "createdAt", "updatedAt"];
const fetchTheme = async () => {
  try {
    const response = await axiosInstance.get("/config/theme", {
      headers: {
        "super-admin-token": process.env.SUPER_ADMIN_TOKEN,
      },
    });
    const theme = response.data[0];
    let jsVariables = "export const theme = {\n";
    Object.keys(theme).forEach((group) => {
      if (!AVOID_KEYS.includes(group)) {
        Object.keys(theme[group]).forEach((token) => {
          const jsVariableName = `$${token}`;
          jsVariables += `  ${jsVariableName}: "${theme[group][token]}",\n`;
        });
      }
    });
    jsVariables += "};\n";

    fs.writeFileSync(`${__dirname}/theme.js`, jsVariables);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching theme: ", error);
  }
};
fetchTheme();
