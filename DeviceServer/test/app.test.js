const request = require('supertest');
describe('loading express',  () => {
  let server;
  beforeEach(()=> server = require('../loaders/io').server);
  afterEach(() =>server.close());
  it('should respond correctly root path', (done) =>  {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('should return 404 for everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
})