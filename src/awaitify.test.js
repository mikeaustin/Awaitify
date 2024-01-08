const { asyncify } = require('./awaitify.js');

test('adds 1 + 2 to equal 3', () => {
  const inputCode = `const anonFunc = () => {
  foo();
};

function foo() {
  return new MyClass().bar();
}
  
class MyClass {
  async bar() {
    return this.baz();
  }
  
  baz() {
    return 20;
  }

  init() {
    this.test(this.foo());
  }
}

foo();`;

  const expectedOutputCode = `const anonFunc = async () => {
    await foo();
};
async function foo() {
    return await new MyClass().bar();
}
class MyClass {
    async bar() {
        return await this.baz();
    }
    async baz() {
        return 20;
    }
    async init() {
        await this.test(await this.foo());
    }
}
await foo();`;

  const modifiedCode = asyncify(inputCode);

  expect(modifiedCode).toBe(expectedOutputCode);
});
