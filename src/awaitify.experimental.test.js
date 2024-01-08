const { asyncify } = require('./awaitify.js');

test(`Promise.all([fetch('https://google.com')])`, () => {
  const inputCode = `
const urls = Promise.all([fetch('https://google.com')]);
  `;

  const expectedOutputCode = `???`;

  const modifiedCode = asyncify(inputCode);

  expect(modifiedCode).toBe(expectedOutputCode);
});
