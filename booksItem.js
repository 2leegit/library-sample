// Constructor function for BooksItem Object
function BooksItem(id, title, author, description) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
}

// Method to display partial properties of item for menu
// Display Id is converted to 1 based - make sure to remove 1 from target id later
BooksItem.prototype.listItem = function () { console.log(`      [${this.id}] ${this.title}`); }

// Method to display full book details
BooksItem.prototype.getDetails = function () {
    console.log(`\n      ID: ${this.id}`);
    console.log(`      Title: ${this.title}`);
    console.log(`      Author: ${this.author}`);
    console.log(`      Description: ${this.description}`);
};

module.exports = BooksItem;