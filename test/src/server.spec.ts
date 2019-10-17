import { get } from "request-promise-native";
import { StatusCodeError } from "request-promise-native/errors";
import { expect } from "chai";

describe("Server", function() {
  describe("Successful request", function() {
    it("Add student", async () => {
      const response = await get("http://localhost:5000/student/add?name=Rizki&classroom=9A");
      expect(response).to.be.eq("Data successfully created");
    });
    it("Get student detail", async () => {
      const response = await get("http://localhost:5000/student?id=1");
      expect(response).to.be.exist;
    });
    it("Get student list", async () => {
      const response = await get("http://localhost:5000/student/list");
      expect(response).to.be.exist;
    });
    it("Get student list w condition", async () => {
      const response = await get("http://localhost:5000/student/list?classroom=9A&sortBy=name&limit=5");
      expect(response).to.be.exist;
    });
    it("Update student data", async () => {
      const response = await get("http://localhost:5000/student/update?id=1&name=MochamadRizki&classroom=9B");
      expect(response).to.be.eq("Data succesfully updated");
    });
    it("Delete student data", async () => {
      const response = await get("http://localhost:5000/student/delete?id=1");
      expect(response).to.be.eq("Data succesfully deleted");
    });
    it("Show log file text", async () => {
      const response = await get("http://localhost:5000/logs");
      expect(response).to.be.exist;
    });
  });

  context("Invalid URL", function() {
    it("Invalid URL endpoint", async () => {
      let error = null;
      try {
        await get("http://localhost:5000/ajduaquajfkjabfka", { json: true });
      } catch (err) {
        error = err;
      }
      expect(error).to.be.exist;
      expect(error).to.be.instanceOf(StatusCodeError);
      expect(error.statusCode).to.be.eq(404);
    });
  });
});  
