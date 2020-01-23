// Used for individual books in the library
const Library = require("../library");

describe("Initialization", () => {
    it("should return an array when called with the 'new' keyword", () => {
      const obj = new Library();

      expect(Array.isArray(obj)).toEqual(true);
    });

});

describe("removeItem", () => {
    it("should remove item from the array", () => {
      
      // Arrange
      const obj = new Library();

      // Act  
      obj.push({"id":1,"title":"The Reality Dysfunction","author":"Peter F. Hamilton","description":"The Reality Dysfunction is a science fiction novel by British writer Peter F. Hamilton, the first book in The Night's Dawn Trilogy"});
      obj.push({"id":2,"title":"The Reality Dysfunction","author":"Peter F. Hamilton","description":"The Reality Dysfunction is a science fiction novel by British writer Peter F. Hamilton, the first book in The Night's Dawn Trilogy"});

      // Assert  
      expect(obj.length).toEqual(2);

      // Act again
      obj.removeItem(0);

       // Assert again
      expect(obj.length).toEqual(1);
      expect(obj[0].id).toEqual(1);
    });

});