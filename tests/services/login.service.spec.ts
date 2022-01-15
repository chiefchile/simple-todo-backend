import { describe, it } from "mocha";
import { login } from "../../src/services/login.service";
import { assert } from "chai";
import { User } from "../../src/models/user";
import * as sinon from "sinon";
import Error from "../../src/interfaces/error";
import Token from "../../src/interfaces/token";

let stub: any = null;

describe("login.service", () => {
  describe("login", () => {
    afterEach(function () {
      stub.restore();
    });

    it("should return 400 when user is not on db", async () => {
      stub = sinon.stub(User, "findOne").returns({
        exec: sinon.stub().returns(null),
      } as any);
      const result = (await login("", "")) as Error;
      assert.equal(result.code, 400);
    });

    it("should return 400 when password is wrong", async () => {
      stub = sinon.stub(User, "findOne").returns({
        exec: () => {
          return {
            username: "user",
            password:
              "$2b$10$pKNIxNKx0gR/h3zsRL0yLO2ao4suSFO/C8/zNYw.DM0YSVapgsH8G",
          };
        },
      } as any);

      const result = (await login("user", "wrongpassword")) as Error;
      assert.equal(result.code, 400);
    });

    it("should return token if successful", async () => {
      stub = sinon.stub(User, "findOne").returns({
        exec: () => {
          return {
            username: "testuser",
            password:
              "$2b$10$9OC1rnbU5Akbd6/.aMFPj.7uQblB52ELTSLMIuCX0CPY7QY750DDy",
          };
        },
      } as any);

      const token = (await login("testuser", "testuser")) as Token;
      assert.isOk(token.token);
    });
  });
});
