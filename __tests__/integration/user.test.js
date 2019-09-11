const request = require("supertest");
const app = require("./../../src/app");
const truncate = require("./../utils/truncate");
const factory = require("./../factories");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should allow to create a new user", async () => {
    const user = {
      name: "Júlio César",
      email: "julio@mail.com",
      password: "qwer1234",
      password_confirmed: "qwer1234"
    };

    const response = await request(app)
      .post("/register")
      .send(user);

    const { name, email } = response.body;

    expect(name).toBe(user.name);
    expect(email).toBe(user.email);
  });

  it('should deny creating user when exists already user', async () => {
    const user = await factory.create('User', {
      email: 'julio@mail.com'
    });

    const user2 = {
      name: "César",
      email: "julio@mail.com",
      password: "qwer1234",
      password_confirmed: "qwer1234"
    }

    const response = await request(app)
      .post("/register")
      .send(user2);

    expect(response.body).toEqual({ message: "User already exists!" });
  });

  it('should deny if password and password confirmed arent equals', async () => {
    const user = {
      name: "Júlio César",
      email: "julio@mail.com",
      password: "qwer1234",
      password_confirmed: "qwer12341"
    };

    const response = await request(app)
      .post("/register")
      .send(user);

    expect(response.body).toEqual({ message: "Password and Password Confirmed not matched!" });
  });
});
