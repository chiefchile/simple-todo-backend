import jwt from "jsonwebtoken";

describe("jwt", (): void => {
  it("should sign and verify", (): void => {
    const secret = process.env.TODO_BACKEND_SECRET || "";
    const token = jwt.sign({ foo: "bar" }, secret);
    console.log(token);
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
  });
});
