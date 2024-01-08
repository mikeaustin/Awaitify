const { asyncify } = require('./awaitify.js');

test(`const [a, b] = await Promise.all([fetch('https://google.com')])`, () => {
  const inputCode = `
const [a, b] = await Promise.all([fetch('https://google.com'), fetch('https://apple.com')]);
  `;

  const expectedOutputCode = `???`;

  const modifiedCode = asyncify(inputCode);

  expect(modifiedCode).toBe(expectedOutputCode);
});

test(`add(2, 3)`, () => {
  const inputCode = `
function add(a, b) {
  return a + b;
}

function random() {
  return Math.random();
}

add(random(), random());
  `;

  const expectedOutputCode = `async function add(a, b) {
    return await a + await b;
  }  
  async function random() {
    return Math.random();
  }
  await add(random(), random());`;

  const modifiedCode = asyncify(inputCode);

  expect(modifiedCode).toBe(expectedOutputCode);
});
