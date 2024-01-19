jest.mock("~theme/axios", () => {
  return {
    __esModule: true,
    default: {
      create: jest.fn().mockReturnThis(),
      request: jest.fn().mockResolvedValue({}),
      get: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
      post: jest.fn().mockResolvedValue({}),
      put: jest.fn().mockResolvedValue({}),
      patch: jest.fn().mockResolvedValue({}),
      mockRejectedValue: jest.fn().mockReturnThis(),
    },

    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  };
});

export const mockAxiosError = ({
  status = 200,
  method = "get",
  url = "",
  data = {},
} = {}) => {
  const axios = require("~theme/axios");
  axios.default[method].mockImplementation((requestUrl) => {
    if (url) {
      if (requestUrl === url) {
        return Promise.reject({
          response: {
            status,
            data,
          },
        });
      }
    } else {
      return Promise.reject({
        response: {
          status,
          data,
        },
      });
    }
    return axios.default[method].mockResolvedValue({});
  });
};

export const mockAxios = ({
  status = 200,
  method = "get",
  url = "",
  data = {},
} = {}) => {
  const axios = require("~theme/axios");
  axios.default[method].mockImplementation((requestUrl) => {
    if (url) {
      if (requestUrl === url) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } else {
      return Promise.resolve({
        status,
        data,
      });
    }
    return axios.default[method].mockResolvedValue({});
  });
};
