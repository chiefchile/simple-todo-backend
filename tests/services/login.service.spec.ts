import { describe, it } from "mocha";
import { login } from "../../src/services/login.service";
import { assert } from "chai";
import { User } from "../../src/models/user";
import * as sinon from "sinon";

let stub: any = null;

describe("login.service", () => {
  describe("login", () => {
    afterEach(function () {
      stub.restore();
    });

    it("should return -11 when user is not on db", async () => {
      stub = sinon.stub(User, "findOne").returns({
        exec: sinon.stub().returns(null),
      } as any);
      const result = await login("", "");
      assert.equal(result.code, -11);
    });

    it("should return -12 when password is wrong", async () => {
      stub = sinon.stub(User, "findOne").returns({
        exec: () => {
          return {
            username: "user",
            password:
              "$2b$10$pKNIxNKx0gR/h3zsRL0yLO2ao4suSFO/C8/zNYw.DM0YSVapgsH8G",
          };
        },
      } as any);

      const result = await login("user", "wrongpassword");
      assert.equal(result.code, -12);
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

      const result = await login("testuser", "testuser");
      assert.equal(result.code, 0);
      assert.isOk(result.token);
    });
  });
});
