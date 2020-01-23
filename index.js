/*H**********************************************************************
* FILENAME :        index.js             DESIGN REF: library_project.docx
*
* DESCRIPTION :
*       Sample application that maintains a database of books. The user, 
*       through a command line interface (CLI), should be able to view,
*       add and edit book entries. In addition, a search function
*       should allow the user to find books by keyword.
*
* NOTES :
*       Take Home Test       
*       to run: 
*       node install
*       node index.js (optional)FileName 
*
* AUTHOR :    Lee Peterson    START DATE : 2020-01-22
*
* CHANGES :
*   Add a delete book option to finish off basic CRUD functionality
*
*H*/

// Used to access local file system for storage of bookItems array 
const fs = require("fs");

// Used for gathering user input from a console session
const inquirer = require("inquirer");

// Used for individual books in the library
const Library = require("./library");

// Used for individual books in the library
const BooksItem = require("./booksItem");

// Store all bookItems in an array
const booksArray = new Library;

// Default file name is books.json
let booksFileName = "books.json";

// Application Start - Read in books from File
// Basic exception handling in try...catch
const startHere = () => {
    try {

        console.log("-------------------------------\n");

        // Allow alternate file name to be specified on commandline 
        // file is used for storage of books
        if (process.argv[2] !== undefined) {
            if (process.argv[2].trim().length > 0)
                booksFileName = process.argv[2].trim();
        }

        // return the contents of booksFileName as a string in the variable "data"
        // "utf8" encodes the raw buffer data in human-readable format
        fs.readFile(booksFileName, "utf8", function (error, data) {

            if (error) {

                if (error.code !== 'ENOENT') {
                    // Exit application if error is not simple file not found
                    return console.log(error);
                }
            }

            if (data !== undefined) {
                // Read each item from file data and add to booksArray   
                JSON.parse(data).forEach(item => {

                    const newItem = new BooksItem(booksArray.length + 1, item.title, item.author, item.description);
                    booksArray.push(newItem)

                });
                if (booksArray.length > 1)
                    console.log(`Loaded ${booksArray.length} books into the library`);
                else if (booksArray.length === 1)
                    console.log(`Loaded ${booksArray.length} book into the library`);

            }
            else {
                // Show a sample book by default - first time file is accessed
                sampleBook = new BooksItem(booksArray.length + 1, "The Reality Dysfunction", "Peter F. Hamilton", "The Reality Dysfunction is a science fiction novel by British writer Peter F. Hamilton, the first book in The Night's Dawn Trilogy");
                booksArray.push(sampleBook);

                console.log("Started a new library");
            }

            // Start main application loop    
            mainMenu();

        });

    } catch (err) {
        console.log(err);
    }
}


// Main menu loop
const mainMenu = async () => {

    // Define UI Prompts
    const bookManagerSectionMenuOptions = `
==== Book Manager ====

    1) View all books
    2) Add a book
    3) Edit a book
    4) Search for a book
    5) Delete book
    6) Save and exit
`;

    const bookManagerSectionMenu = "Choose [1-6]:";

    let exitMainLoop = false;

    while (!exitMainLoop) {

        console.log(bookManagerSectionMenuOptions);

        let { itemSelection } = await inquirer.prompt({
            message: bookManagerSectionMenu,
            name: "itemSelection",
            prefix: '$'
        });

        console.log(`You selected item ${itemSelection}`);

        switch (parseInt(itemSelection)) {

            case 1: // View all books
                await viewBooks();
                break;

            case 2: // Add a book
                await addBook();
                break;

            case 3: // Edit a book
                await editBook();
                break;

            case 4: // Search for a book
                await searchBooks();
                break;

            case 5: // Full CRUD - Delete option added
                await removeBook();
                break;

            case 6: // Exit application request
                exitMainLoop = true;
                break;

            default: // Just repeat loop
                break;

        }

    }

    // Main Application loop exit -- write current array to file
    fs.writeFile(booksFileName, JSON.stringify(booksArray), function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("\nLibrary saved.\n");

    });

    return;
}


// View all books function
const viewBooks = async () => {

    // Define UI Prompts
    const viewBooksSectionMenu = "To view details enter the book ID, to return press <Enter>\n\nBook ID:";

    let exitViewBooksLoop = false;

    while (!exitViewBooksLoop) {

        // View all books
        console.log("\n==== View Books ====\n");
        booksArray.forEach(item => {
            item.listItem();
        });

        // UI Spacing
        console.log("\n");

        let { bookIdSelection } = await inquirer.prompt({
            message: viewBooksSectionMenu,
            name: "bookIdSelection",
            prefix: '$'
        });

        if (bookIdSelection.trim() === "") {
            exitViewBooksLoop = true;

        }
        else {

            // Sanity check - make sure selection exists    
            if (booksArray.length > (bookIdSelection - 1)) {

                booksArray[bookIdSelection - 1].getDetails();

            }

        }

    }

    return;
}


// Add a book function
const addBook = async () => {

    // Define UI Prompts
    const addBookSectionMenu = "\nPlease enter the following information:";

    // View all books
    console.log("\n==== Add a Book ====\n");

    const addNewBook = [{
        type: 'input',
        name: 'title',
        prefix: '$',
        default: function () {
            return 'My Title';
        }
    }, {
        type: 'input',
        name: 'author',
        prefix: '$',
        default: function () {
            return 'My Author';
        }
    },
    {
        type: 'input',
        name: 'description',
        prefix: '$',
        default: function () {
            return "My Books's Description";
        }
    }];

    console.log(addBookSectionMenu);

    const answers = await inquirer.prompt(addNewBook);

    // Make sure no issues getting input
    if (answers !== undefined) {
        const newBook = new BooksItem(booksArray.length + 1, answers.title.trim(), answers.author.trim(), answers.description.trim());
        booksArray.push(newBook);

        console.log(`Book [${booksArray.length}] Saved`);

    }

    return;

}


// Edit a book function
const editBook = async () => {

    // Define UI Prompts
    const viewBooksSectionMenu = "Enter the book ID of the book you want to edit; to return press <Enter>.\nBook ID:";

    let exitEditBookLoop = false;

    while (!exitEditBookLoop) {

        // Remove a book section
        console.log("\n==== Edit a Book ====\n");
        booksArray.forEach(item => {
            // Write to console each book
            item.listItem();
        });

        // UI Spacing
        console.log("\n");

        // Ask user which book to delete    
        let { bookIdSelection } = await inquirer.prompt({
            message: viewBooksSectionMenu,
            name: "bookIdSelection",
            prefix: '$'
        });

        // Check if exit section condition is met     
        if (bookIdSelection.trim() === "") {
            exitEditBookLoop = true;
        }
        else {

            // Sanity check - make sure selection exists    
            if (booksArray.length > (bookIdSelection - 1)) {

                // Define UI Prompts
                const editBookSectionMenu = "Input the following information. To leave a field unchanged, hit <Enter>.";

                console.log(editBookSectionMenu);

                const editBookOptions = [{
                    type: 'input',
                    name: 'Title',
                    prefix: '$',
                    default: function () {
                        return `${booksArray[bookIdSelection - 1].title}`;
                    }
                }, {
                    type: 'input',
                    name: 'Author',
                    prefix: '$',
                    default: function () {
                        return `${booksArray[bookIdSelection - 1].author}`;
                    }
                },
                {
                    type: 'input',
                    name: 'Description',
                    prefix: '$',
                    default: function () {
                        return `${booksArray[bookIdSelection - 1].description}`;
                    }
                }];

                // Get the edited book values
                const answers = await inquirer.prompt(editBookOptions);

                // Make sure no issues getting input
                if (answers !== undefined) {
                    booksArray[bookIdSelection - 1].title = answers.Title;
                    booksArray[bookIdSelection - 1].author = answers.Author;
                    booksArray[bookIdSelection - 1].description = answers.Description;

                    console.log("Book saved.")
                }

            }
            else {
                // Basic error handling
                console.log(`You selected an invalid book ID [${bookIdSelection}]`);
            }

        }

    }

    return;
}


// Search for a book function
const searchBooks = async () => {

    // Define UI Prompts
    const searchBookSectionMenu = "\nType in one or more keywords to search for\n";

    // Search all books
    console.log("\n==== Search ====\n");
    console.log(searchBookSectionMenu);

    // Ask user which book to delete    
    let { searchKeywords } = await inquirer.prompt({
        message: "Search",
        name: "searchKeywords",
        prefix: '$'
    });

    // filter array of books down to items containing search string    
    const filterBooksList = booksArray.filter(function (item) {

        // Search using RegEx - case insensitve - trim search string

        if (item.title.search(new RegExp(searchKeywords.trim(), "i")) !== -1) {
            return true;
        }

        if (item.author.search(new RegExp(searchKeywords.trim(), "i")) !== -1) {
            return true;
        }

        if (item.description.search(new RegExp(searchKeywords.trim(), "i")) !== -1) {
            return true;
        }

        return false;
    });

    // Define UI Prompts
    const viewBooksSectionMenu = "\nThe following books matched your query. Enter the book ID to see more details, or <Enter> to return.\n";

    let exitViewBooksLoop = false;

    while (!exitViewBooksLoop) {

        // View all books
        console.log(viewBooksSectionMenu);
        filterBooksList.forEach(item => {
            item.listItem();
        });

        console.log("\n");

        let { bookIdSelection } = await inquirer.prompt({
            message: "Book ID:",
            name: "bookIdSelection",
            prefix: '$'
        });

        if (bookIdSelection.trim() === "") {
            exitViewBooksLoop = true;

        }
        else {

            // Sanity check - make sure selection exists    
            if (booksArray.length > (bookIdSelection - 1)) {

                booksArray[bookIdSelection - 1].getDetails();

            }

        }
    }

    return;

}


// Remove a book function
const removeBook = async () => {

    // Define UI Prompts
    const deleteBooksSectionMenu = "To remove a book enter the book ID, to return press <Enter>:\n";

    let exitDeleteBookLoop = false;

    while (!exitDeleteBookLoop) {

        // Remove a book section
        console.log("\n==== Remove a Book ====\n");
        booksArray.forEach(item => {
            // Write to console each book
            item.listItem();
        });

        // UI Spacing
        console.log("\n");

        // Ask user which book to delete    
        let { bookIdSelection } = await inquirer.prompt({
            message: deleteBooksSectionMenu,
            name: "bookIdSelection",
            prefix: '$'
        });

        // Check if exit section condition is met     
        if (bookIdSelection.trim() === "") {
            exitDeleteBookLoop = true;
        }
        else {

            // Because it is a delete operation, give user opportunity to change their minds
            let { confirmSelection } = await inquirer.prompt({
                message: "Are you sure? type yes to confirm",
                name: "confirmSelection",
                prefix: '$',
                default: function () {
                    return 'no';
                }
            });

            // Accept 'y' or 'yes' - case insensitive
            if (confirmSelection.toLowerCase().trim() === "yes" || confirmSelection.toLowerCase().trim() === "y") {

                // Sanity check - make sure selection exists    
                if (booksArray.length > (bookIdSelection - 1)) {

                    // Delete book at bookItemId
                    // booksArray.splice((bookIdSelection - 1), 1);
                    booksArray.removeItem(bookIdSelection - 1);

                    booksArray.forEach((item, index) => {
                        // Write to console each book
                        item.listItem();
                    });

                    console.log(`\nYou deleted item ${bookIdSelection} ...\n`);
                }
            }

        }

    }

    return;
}


startHere();
