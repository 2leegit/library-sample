// Constructor function for Library Object
// const Library = [];

class Library extends Array {
    log() {
        console.log(this)
    }
}

// Method to remove item from the Library
// Display Id is converted to 1 based - make sure to remove 1 from target id later
Library.prototype.removeItem = function (position) {

    this.splice(position, 1)

    // Rewrite book ids to match new array    
    this.forEach((item, index) => {
        item.id = index + 1;

    });

}


module.exports = Library;