// Used for individual books in the library
const BooksItem = require("../booksItem");

describe("Initialization", () => {
    it("should return an object containing a 'id' property when called with the 'new' keyword", () => {
      const obj = new BooksItem();

      expect("id" in obj).toEqual(true);
    });

    it("should return an object containing a 'title' property when called with the 'new' keyword", () => {
        const obj = new BooksItem();
  
        expect("title" in obj).toEqual(true);
      });

      it("should return an object containing a 'author' property when called with the 'new' keyword", () => {
        const obj = new BooksItem();
  
        expect("author" in obj).toEqual(true);
      });

      it("should return an object containing a 'description' property when called with the 'new' keyword", () => {
        const obj = new BooksItem();
  
        expect("description" in obj).toEqual(true);
      });
});