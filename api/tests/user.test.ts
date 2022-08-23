import  UserController  from "../server/auth/auth.controller";
jest.mock("../src/class_b");
it("should mock class B", () => {
  const functionNameMock = jest.fn();
  UserController.mockImplementation(() => {
    return {
      functionName: functionNameMock
    };
  });
});