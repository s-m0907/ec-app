const request = require("supertest")

const app = require('../src/app.js')

describe("/api", () => {
    test("GET:200 responds with an object describing all available endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
          expect(typeof response.body).toBe("object");
          expect(response.body).toHaveProperty("endpoints");
        });
    })
})