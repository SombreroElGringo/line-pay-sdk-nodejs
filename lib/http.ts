import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTPError, ReadError, RequestError } from "./exceptions";

const pkg = require("../package.json");

function wrapError(err: AxiosError) {
  if (err.response) {
    throw new HTTPError(
      err.message,
      err.response.status,
      err.response.statusText,
      err,
    );
  } else if (err.code) {
    throw new RequestError(err.message, err.code, err);
  } else if (err.config) {
    // unknown, but from axios
    throw new ReadError(err);
  }

  // otherwise, just rethrow
  throw err;
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
