/* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../src/app.js');
// const { Videogame, conn } = require('../../src/db.js');
const request = supertest(app);
/* const videogame = {
  name: 'Super Mario Bros',
  released: 04 / 19 / 2005,
  rating: 5.0,
  img: "",
  genres: "Action",
  platforms: "PC",
  description: "descripcion de prueba"
}; */

// describe('Genres routes', () => {
/* before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
beforeEach(() => Videogame.sync({ force: true })
  .then(() => Videogame.create(videogame))); */
describe('GET /genres', () => {
  beforeEach(async () => {
    return genres = await request.get("/genres");
  })
  it('should get 200', () =>
    request.get('/genres').expect(200)
  );
  it("should return an array", () => {
    expect(Array.isArray(genres.body)).toBeTruthy();
  });
  it("should contain 'Adventure'", () => expect(genres.body).toContain("Adventure"))
  it("should contain 'Board Games'", () => expect(genres.body).toContain("Board Games"))
  it("should contain 'Puzzle'", () => expect(genres.body).toContain("Puzzle"))
});
// });
describe('GET /videogames', () => {
  it('should get 200', () =>
    request.get('/videogames').expect(200)
  );
  beforeEach(async () => {
    return videogames = await request.get("/videogames");
  })
  it("should return an array", () => {
    expect(Array.isArray(videogames.body)).toBeTruthy();
  });
  it("should return information of 100 videogames", () => {
    expect(videogames.body.length).toBe(100);
  })
  it("should have id, name, img, genres, rating in each videogame", () => {
    expect(videogames.body[0]).toHaveProperty("id");
    expect(videogames.body[0]).toHaveProperty("name");
    expect(videogames.body[0]).toHaveProperty("img");
    expect(videogames.body[0]).toHaveProperty("genres");
    expect(videogames.body[0]).toHaveProperty("rating");

    expect(videogames.body[50]).toHaveProperty("id");
    expect(videogames.body[50]).toHaveProperty("name");
    expect(videogames.body[50]).toHaveProperty("img");
    expect(videogames.body[50]).toHaveProperty("genres");
    expect(videogames.body[50]).toHaveProperty("rating");
  })
  it("should get 200 with a name passed by query", async () => {
    request.get('/videogames?name=tomb raider').expect(200)
  })
  it("should return information of 15 videogames", async () => {
    const vgquery = await request.get('/videogames?name=tomb raider')
    expect(vgquery.body.length).toBe(15);
  })
  it("should have id, name, img, genres, rating in each videogame with a name passed by query", async () => {
    const vgquery = await request.get('/videogames?name=tomb raider')
    expect(vgquery.body[0]).toHaveProperty("id");
    expect(vgquery.body[0]).toHaveProperty("name");
    expect(vgquery.body[0]).toHaveProperty("img");
    expect(vgquery.body[0]).toHaveProperty("genres");
    expect(vgquery.body[0]).toHaveProperty("rating");
  })
});
describe("POST/ videogame", () => {
  const vg = {
    name: 'Super Mario Bros',
    released: "2005-01-22",
    rating: 5.0,
    img: "",
    genres: "Action",
    platforms: "PC",
    description: "descripcion de prueba"
  }
  it("should get 200 when game is succesfully created", async () => {
    return await request.post("/videogame").send(vg).expect(201);
  })
  it("should get 400 when game can't be created", async () => {
    const postResponse = await request.post("/videogame").send({name:"Super Mario Bros"});
    expect(postResponse.status).toBe(400);
  })
})