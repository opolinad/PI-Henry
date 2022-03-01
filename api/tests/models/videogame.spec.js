const { Videogame, conn } = require('../../src/db.js');
// const { expect } = require('chai');

/* describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    })); */
describe('Validators', () => {
  beforeEach(() => Videogame.sync({ force: true }));
  describe('Videogame creation', () => {
    it('should throw an error if no information is provided or any information is missing', async () => {
      await expect(Videogame.create({})).rejects.toThrow();
      await expect(Videogame.create({name:"Super Mario Bros", img:"", released:"2022-03-02", rating: 5.0, platforms:"PC"})).rejects.toThrow();
    });
    it('should create a game when all the necessary information is provided', async() => {
      await expect(Videogame.create({name:"Super Mario Bros", img:"", released:"2022-03-02", rating: 5.0, platforms:"PC", description:"test"}));
    });
  });
});
// });
