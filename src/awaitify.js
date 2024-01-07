const acorn = require('acorn');
const escodegen = require('escodegen');

function asyncify(inputCode) {
  const ast = acorn.parse(inputCode, { ecmaVersion: 'latest' });

  function transformNode(node) {
    console.log('Processing node:', node.type);

    if (node.type === 'CallExpression') {
      const callee = node.callee;
      console.log(' - CallExpression with callee:', callee.type);

      const argumentsTransformed = node.arguments.map((arg) => transformNode(arg));

      if (callee.type === 'MemberExpression' && callee.property.type === 'Identifier') {
        const transformedCallee = {
          type: 'MemberExpression',
          object: callee.object.type === 'CallExpression' ? transformNode(callee.object) : callee.object,
          property: callee.property,
        };

        return {
          type: 'AwaitExpression',
          argument: {
            type: 'CallExpression',
            callee: transformedCallee,
            arguments: argumentsTransformed,
          },
        };
      } else if (callee.type === 'Identifier') {
        return {
          type: 'AwaitExpression',
          argument: {
            type: 'CallExpression',
            callee,
            arguments: argumentsTransformed,
          },
        };
      }
    } else if (node.type === 'MethodDefinition') {
      const transformedMethod = { ...node };

      if (transformedMethod.value) {
        transformedMethod.value = {
          ...transformedMethod.value,
          async: true, // Add the 'async' keyword to the method definition
          body: transformNode(transformedMethod.value.body),
        };
      }

      return transformedMethod;
    } else if (node.type === 'FunctionDeclaration') {
      return {
        ...node,
        async: true, // Add the 'async' keyword to function declarations
        body: transformNode(node.body),
      };
    } else if (node.type === 'ArrowFunctionExpression') {
      // Handle ArrowFunctionExpression (anonymous functions)
      return {
        ...node,
        async: true, // Add the 'async' keyword to arrow functions
        body: transformNode(node.body),
      };
    } else if (node.type === 'AwaitExpression') {
      console.log(' - AwaitExpression');
      return {
        type: 'AwaitExpression',
        argument: transformNode(node.argument),
      };
    }

    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        node[key] = transformNode(node[key]);
      }
    }

    return node;
  }

  const modifiedAst = transformNode(ast);

  const modifiedCode = escodegen.generate(modifiedAst, { format: { quotes: 'double' } });

  return modifiedCode;
}

// The rest of your code remains the same




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

if (modifiedCode !== expectedOutputCode) {
  console.log("ERROR: [" + modifiedCode + "]");
}

window.asyncify = asyncify;
