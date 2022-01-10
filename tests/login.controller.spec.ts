import { assert } from "chai";
import { User } from "../src/models/user";
import { handleLogin } from "../src/routes/login.controller";

describe("LoginController", (): void => {
  describe("handleLogin()", (): void => {
    it("should return 0 if there is no err", async (): Promise<void> => {
      const userFromDb = new User({
        username: "testuser",
        password:
          "$2b$10$9OC1rnbU5Akbd6/.aMFPj.7uQblB52ELTSLMIuCX0CPY7QY750DDy",
      });
      let saveResult = await handleLogin(userFromDb, "testuser", "testuser");
      assert(saveResult.code === 0);
    });

    it("should return -11 if user is not found", async (): Promise<void> => {
      let saveResult = await handleLogin(null, "", "");
      assert(saveResult.code === -11);
    });

    it("should return -12 if password is invalid", async (): Promise<void> => {
      const userFromDb = new User({ username: "user", password: "pass" });
      let saveResult = await handleLogin(userFromDb, "user", "11111");
      assert(saveResult.code === -12);
    });
  });
});
