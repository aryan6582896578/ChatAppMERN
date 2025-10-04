// =====================================================
// Token Colors Test Snippet
// =====================================================

/**
 * Multi-line comment:
 * Testing comment tokens like italic styling.
 */

// Single-line comment: testing the "Comment" token

// ----------------- Variables and Constants -----------------
const myVar = "Test variable";            // Variable: string constant placeholder
let anotherVar = 42;                       // Number token and variable

// Simulate a color constant (for "Colors" scope)
const primaryColor = "#ff00f2";            // Should appear in the specified color

// ----------------- Invalid Token Example -----------------
// The following line is purposely malformed to test "Invalid" token highlighting.
// const invalidToken = "This string is not closed; // invalid token exampled

// ----------------- Keywords, Storage, and Operators -----------------
function exampleFunction(param1, param2) { // function keyword, parameters are function arguments
    let result = param1 + param2;          // operator (+) and storage tokens
    return result;
}

// ----------------- Block Level Variables -----------------
{
    let blockVar = "Inside block";         // Block-scoped variable
    console.log(blockVar);
}

// ----------------- Regular Expressions & Escape Characters -----------------
const regex = /[A-Z]+\d*/;                 // Testing "Regular Expressions"
const message = `Hello, ${myVar}! Use \n for new lines. 
Visit https://example.com for info.`;     // Template literal with placeholder, escape char, and URL (underlined)

// ----------------- Class Definitions and Methods -----------------
class MyClass {                           // "Class, Support" token test
    constructor(name) {
        this.name = name;
    }
    greet() {                             // "Function, Special Method" and "meta.method.js" tokens
        console.log(`Hello, ${this.name}`);
    }
}

// ----------------- JSON Object with Nested Keys -----------------
const data = {
    "level0": {                          // JSON Key - Level 0
        "level1": {                      // JSON Key - Level 1
            "level2": {                  // JSON Key - Level 2
                "level3": {              // JSON Key - Level 3
                    "level4": {          // JSON Key - Level 4
                        "level5": {      // JSON Key - Level 5
                            "level6": {  // JSON Key - Level 6
                                "level7": {  // JSON Key - Level 7
                                    "level8": "Deep Value" // JSON Key - Level 8
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

// ----------------- Decorators and ES7 Bind Operator -----------------
// Decorator: (Experimental syntax, may require a transpiler like Babel)
function myDecorator(target) {
    target.decorated = true;
}
@myDecorator
class DecoratedClass {
    method() {
        return "Decorated!";
    }
}

// ES7 Bind Operator example (proposal syntax; uncomment if your environment supports it)
// const boundFunc = ::exampleFunction;

// ----------------- Chained Methods (Sub-methods) -----------------
const numbers = [1, 2, 3, 4];
const doubled = numbers
    .map(num => num * 2)
    .filter(num => num > 4);
console.log(doubled );

// ----------------- HTML Markup in Template Literal -----------------
// Simulating HTML tokens for tag, attributes, CSS classes and IDs.
const htmlSnippet = `
<div class="container" id="main">
    <h1>Title</h1>
    <p>Paragraph with <a href="https://example.com">link</a>.</p>
</div>
`;
console.log(htmlSnippet);

// ----------------- Simulated Change Markers -----------------
// The following lines simulate "Inserted", "Deleted", and "Changed" tokens.
console.log("Inserted text");           // Inserted token simulation
// Deleted text example (simulate deletion)
// console.error("Deleted text");
console.warn("Changed text");            // Changed token simulation
