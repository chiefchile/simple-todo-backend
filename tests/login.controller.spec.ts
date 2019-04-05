import { assert } from "chai";
import { handleLogin } from "../src/routes/login.controller";

describe("LoginController", (): void => {
  describe("handleLogin()", (): void => {
    it("should return 0 if there is no err", (): void => {
      const userFromDb = { username: "user", password: "pass" };
      let saveResult = handleLogin(null, userFromDb, "user", "pass");
      assert(saveResult.code === 0);
    });
    it("should return -10 if there is an err", (): void => {
      let saveResult = handleLogin(new Error(), null, "", "");
      assert(saveResult.code === -10);
    });
    it("should return -11 if user is not found", (): void => {
      let saveResult = handleLogin(null, null, "", "");
      assert(saveResult.code === -11);
    });
    it("should return -12 if password is invalid", (): void => {
      const userFromDb = { username: "user", password: "pass" };
      let saveResult = handleLogin(null, userFromDb, "user", "11111");
      assert(saveResult.code === -12);
    });
  });
});
