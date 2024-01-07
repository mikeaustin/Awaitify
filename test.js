async function foo() {
  return new MyClass().bar();
}
class MyClass {
  async bar() {
      return this.baz();
  }
  async baz() {
      return 20;
  }
}
(await foo)();
