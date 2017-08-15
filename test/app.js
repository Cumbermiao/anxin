const context = require.context('.', true, /\.spec$/);
context.keys().forEach(context);
// console.log(context);
// describe('A suite', () => {
//   it("A spec", () => {
//     expect('hello').toBe('hello');
//   })
// })