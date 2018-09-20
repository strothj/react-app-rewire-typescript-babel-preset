// This file is here to test that Jest has been correctly configured to refer
// to setupTests.ts (TypeScript) rather than setupTests.js (Javascript).
// You do not need to include this in your own projects.

test("rewire uses TypeScript extension for setupTests Jest file", () => {
  expect(document.setupTestsTest).toBe("test");
});

export {};

declare global {
  interface Document {
    setupTestsTest: string;
  }
}
