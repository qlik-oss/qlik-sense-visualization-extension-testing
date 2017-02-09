## Introduction

Start writing tests early to be able to structure your code in a more testable way. If you wrap your business logic in functions, they can be called from the tests and the result is easily controlled (that is asserted).

Some well known unit testing tools are bundeled inside after-work.js, and there are several articles on the Internet around unit testing JavaScript and how to use different tools.

### [after-work.js](https://github.com/qlik-oss/after-work.js/blob/master/docs/unit.md)
Wrappers to simplify your testing.

### [mocha](https://mochajs.org/)
JavaScript test framework that acts as the driver for testing (executing the test files).

### [sinon.js](http://sinonjs.org/)
Helps you to spy, stub and mock the dependencies used inside your own functions that you want to test. This makes every function testable by itself.

### [chai.js](http://chaijs.com/)
Assertion library bundled to make assertion easier. You can verify return values from your functions.

### [istanbul](https://github.com/gotwarlost/istanbul)
Instruments your code to get code coverage when running your unit tests.
