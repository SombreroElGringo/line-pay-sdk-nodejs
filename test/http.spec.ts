import { deepEqual, equal, ok } from "assert";
import { HTTPError, RequestError } from "../lib/exceptions";
import { get, post } from "../lib/http";
import { close, listen } from "./helpers/test-server";

const pkg = require("../package.json");

const TEST_PORT = parseInt(process.env.TEST_PORT);
const TEST_URL = `http://localhost:${TEST_PORT}`;
const INVALID_URL = "http://domain.invalid";

describe("http", () => {
  before(() => listen(TEST_PORT));
  after(() => close());

  describe("get", () => {
    it("• get should success", () => {
      const testHeaders = {
        "test-header-key": "Test-Header-Value",
      };

      return get(`${TEST_URL}/tests?a=123`, testHeaders).then(response => {
        equal(
          response.headers["test-header-key"],
          testHeaders["test-header-key"],
        );
        equal(response.headers["user-agent"], `${pkg.name}/${pkg.version}`);
        equal(response.method, "GET");
        equal(response.path, "/tests");
        equal(response.query.a, 123);
      });
    });

    it("• get should fail with wrong address", () => {
      const testHeaders = {
        "test-header-key": "Test-Header-Value",
      };

      return get(`${INVALID_URL}/tests`, testHeaders)
        .then(response => ok(false))
        .catch((error: RequestError) => {
          ok(error instanceof RequestError);
          equal(error.code, "ENOTFOUND");
        });
    });

    it("• get should fail with status code 404", () => {
      const testHeaders = {
        "test-header-key": "Test-Header-Value",
      };

      return get(`${TEST_URL}/errors`, testHeaders)
        .then(response => ok(false))
        .catch((error: HTTPError) => {
          ok(error instanceof HTTPError);
          equal(error.statusCode, 404);
        });
    });
  });

  describe("post", () => {
    it("• post with body should success", () => {
      const testHeaders = {
        "test-header-key": "Test-Header-Value",
      };

      const testBody = {
        id: 123,
        message: "Hello World!",
      };

      return post(`${TEST_URL}/tests?a=123`, testHeaders, testBody).then(
        response => {
          equal(
            response.headers["test-header-key"],
            testHeaders["test-header-key"],
          );
          equal(response.headers["user-agent"], `${pkg.name}/${pkg.version}`);
          equal(response.method, "POST");
          equal(response.path, "/tests");
          equal(response.query.a, 123);
          deepEqual(response.body, testBody);
        },
      );
    });

    it("• post without body should success", () => {
      const testHeaders = {
        "test-header-key": "Test-Header-Value",
      };

      const testBody = {};

      return post(`${TEST_URL}/tests?a=123`, testHeaders, testBody).then(
        response => {
          equal(
            response.headers["test-header-key"],
            testHeaders["test-header-key"],
          );
          equal(response.headers["user-agent"], `${pkg.name}/${pkg.version}`);
          equal(response.method, "POST");
          equal(response.path, "/tests");
          equal(response.query.a, 123);
          deepEqual(response.body, testBody);
        },
      );
    });

    it("• post should fail with wrong address", () => {
      const testHeaders = {
        "test-header-key": "Test-Header-Value",
      };

      const testBody = {};

      return post(`${INVALID_URL}/tests?a=123`, testHeaders, testBody)
        .then(response => ok(false))
        .catch((error: RequestError) => {
          ok(error instanceof RequestError);
          equal(error.code, "ENOTFOUND");
        });
    });

    it("• post should fail with wrong address", () => {
      const testHeaders = {
        "test-header-key": "Test-Header-Value",
      };

      const testBody = {};

      return post(`${TEST_URL}/errors`, testHeaders, testBody)
        .then(response => ok(false))
        .catch((error: HTTPError) => {
          ok(error instanceof HTTPError);
          equal(error.statusCode, 404);
        });
    });
  });
});
