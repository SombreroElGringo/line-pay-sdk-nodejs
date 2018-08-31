import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTPError, ReadError, RequestError } from "./exceptions";

const pkg = require("../package.json");

function wrapError(error: AxiosError) {
  if (error.response) {
    throw new HTTPError(
      error.message,
      error.response.status,
      error.response.statusText,
      error,
    );
  } else if (error.code) {
    throw new RequestError(error.message, error.code, error);
  } else if (error.config) {
    throw new ReadError(error);
  }
  throw error;
}

const userAgent = `${pkg.name}/${pkg.version}`;

export function get(url: string, headers: any): Promise<any> {
  headers["User-Agent"] = userAgent;

  return axios
    .get(url, { headers })
    .then((res: AxiosResponse) => res.data)
    .catch(wrapError);
}

export function post(url: string, headers: any, data?: any): Promise<any> {
  headers["Content-Type"] = "application/json";
  headers["User-Agent"] = userAgent;
  return axios
    .post(url, data, { headers })
    .then((res: AxiosResponse) => res.data)
    .catch(wrapError);
}
