import { numberWithCommas, timeSincePost, formatSearchPhrase } from "./utilities";


it("Adds a comma to numbers", () => {
    test.each([
      [100, '100'],
      [1000, '1,000'],
      [1000000, '1,000,000']  
    ]), ('given %p, returns %p', (input, expected) => {
        expect(numberWithCommas(input)).toBe(expected);
    });
});

//Converts JavaScript milliseconds to seconds used in Unix 
describe("timeSincePost", () => {
  test.each([
    [Math.floor(Date.now() / 1000) - 60, "Posted 1 minute ago"], // 1 minute ago
    [Math.floor(Date.now() / 1000) - 300, "Posted 5 minutes ago"], // 5 minutes ago
    [Math.floor(Date.now() / 1000) - 3600, "Posted 1 hour ago"], // 1 hour ago
    [Math.floor(Date.now() / 1000) - 7200, "Posted 2 hours ago"], // 2 hours ago
    [Math.floor(Date.now() / 1000) - 86400, "Posted 1 day ago"], // 1 day ago
    [Math.floor(Date.now() / 1000) - 172800, "Posted 2 days ago"], // 2 days ago
    [Math.floor(Date.now() / 1000) - 31536000, "Posted 1 year ago"], // 1 year ago
    [Math.floor(Date.now() / 1000) - 63072000, "Posted 2 years ago"], // 2 years ago
  ])("given %p, returns %p", (input, expected) => {
    expect(timeSincePost(input)).toBe(expected);
  });
});


describe("Converts search terms into required API format", () => {
    test.each([
        ['car', 'car'],
        ['car bike', 'car%20bike'],
        ['car bike motorcycle', 'car%20bike%20motorcycle'],
        ['CAR bIKE moTorCycle', 'car%20bike%20motorcycle'],
    ])("given %p, return %p", (input, expected) => {
        expect(formatSearchPhrase(input)).toBe(expected);
    })
});

