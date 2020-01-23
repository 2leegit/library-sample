# library-sample
## Take-home Test

## Introduction

This small project is helpful for us in evaluating your programming experience. The only requirement is development experience in a modern language such as Java, .Net, NodeJS, Python). When designing the application, be sure to practice good architecture and coding practices. Feel free to create whatever classes and data types you feel necessary to accomplish the task.

**You may use the Internet as a reference tool. The only restriction is that you must not contact any other individuals for help. This includes through instant or text messaging, e-mail, phone calls or posts to discussion forums. You may read through previous discussion forum posts, however.**

## The Project

Create an application that maintains a database of books. The user, through a command line interface (CLI), should be able to view, add and edit book entries. In addition, a search function should allow the user to find books by keyword.

### Data types

The following is the only required data type. Feel free to create any other types or classes you feel necessary.

- Book
  - id – int
  - title – String
  - author – String
  - description – String

### User functions

- View all books in the database
  - List the ID and title of each book
  - Allow the user to see details of a particular book
- Add a new book
  - Prompt the user for the book title, author and description
  - Save their changes to the database
- Edit an existing book
  - Display a list of available books
  - Allow the user to select a book to edit
  - Display each field, one at a time, and allow them to change the value of the field. The user should be able to leave the value unchanged.
- Search for books using keywords
  - The search function is up to you to define. Keep the scope small enough that you can accomplish it within the time frame. If you have extra time, you can spend it adding additional features to the search.

### System functions

- Write the database of books to disk, upon exiting the application
- Load the database of books from disk, at application start time

The format of the disk file can be any of your choosing.

## Sample Session

The following is a sample of what a session of the application may look like. Note that this is _not_ the first time the application is run, as indicated by the number of books already in the library.

Loaded 5 books into the library

==== Book Manager ====

        1) View all books
        2) Add a book
        3) Edit a book
        4) Search for a book
        5) Save and exit

Choose [1-5]: **4**

==== Search ====

Type in one or more keywords to search for

        Search: **moby**

The following books matched your query. Enter the book ID to see more details, or \&lt;Enter\&gt; to return.

        [4] Moby Dick

Book ID: **4**

        ID: 4
        Title: Moby Dick
        Author: Herman Melville
        Description: About a big whale

Book ID: _\&lt;Enter\&gt;_

==== Book Manager ====

        1) View all books
        2) Add a book
        3) Edit a book
        4) Search for a book
        5) Save and exit

Choose [1-5]: **3**

==== Edit a Book ====

        [1] The Hobbit
        [2] Lord of the Rings
        [3] Snow White and the Seven Dwarfs
        [4] Moby Dick
        [5] Snow Crash

Enter the book ID of the book you want to edit; to return press \&lt;Enter\&gt;.

Book ID: **4**

Input the following information. To leave a field unchanged, hit \&lt;Enter\&gt;

        Title [Moby Dick]: _\&lt;Enter\&gt;_
        Author: [Herman Melville]: _\&lt;Enter\&gt;_
        Description: [About a big whale]: **About a really big whale that**

Book saved.

Enter the book ID of the book you want to edit; to return press \&lt;Enter\&gt;.

Book ID: _\&lt;Enter\&gt;_

==== Book Manager ====

        1) View all books
        2) Add a book
        3) Edit a book
        4) Search for a book
        5) Save and exit

Choose [1-5]: 2

==== Add a Book ====

Please enter the following information:

        Title: **Kite Runner**
        Author: **Khaled Hosseini**
        Description: **Story of Amir, a young boy from Kabul.**

Book [6] Saved

==== Book Manager ====

        1) View all books
        2) Add a book
        3) Edit a book
        4) Search for a book
        5) Save and exit

Choose [1-5]: 1

==== View Books ====

        [1] The Hobbit
        [2] Lord of the Rings
        [3] Snow White and the Seven Dwarfs
        [4] Moby Dick
        [5] Snow Crash
        [6] Kite Runner

To view details enter the book ID, to return press \&lt;Enter\&gt;.

Book ID: **6**

        ID: 6
        Title: Kite Runner
        Author: Khaled Hosseini
        Description: Story of Amir, a young boy from Kabul.

To view details enter the book ID, to return press \&lt;Enter\&gt;.

Book ID: **4**

        ID: 4
        Title: Moby Dick
        Author: Herman Melville
        Description: About a really big whale that

To view details enter the book ID, to return press \&lt;Enter\&gt;.

Book ID: _\&lt;Enter\&gt;_

==== Book Manager ====

        1) View all books
        2) Add a book
        3) Edit a book
        4) Search for a book
        5) Save and exit

Choose [1-5]: 5

Library saved.