// This file is here to test that Jest has been correctly configured to refer
// to setupTests.ts (TypeScript) rather than setupTests.js (Javascript).

// Setting a value on the global document object so we can test that this script
// was executed.

// In your own project you will either not include this file (if not needed) or
// you would apply any needed test configurations here per the normal
// Create React App instructions.

document.setupTestsTest = "test";

export {};

declare global {
  interface Document {
    setupTestsTest: string;
  }
}
