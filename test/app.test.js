const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET /apps', () => {
  it('should return an array of apps', () => {
    return request(app)
      .get('/apps?genre=Action')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf.at.least(1);
          const app = res.body[0];
          expect(app).to.include.all.keys('Category', 'Rating', 'Reviews', 
          'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres')
      });
  })

});