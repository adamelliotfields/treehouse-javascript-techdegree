# Library Manager

### Requirements

#### Models
:white_check_mark: Project includes the following Sequelize models: books, patrons, loans.  

#### Navigation
:white_check_mark: Includes a main navigation menu that appears on every page.  
:white_check_mark: Main navigation contains working links to: Books, Patrons, Loans.  

#### Home Page
:white_check_mark: **Books:** New Book, List All, List Overdue, List Checked Out.  
:white_check_mark: **Patrons:** New Patron, List All.  
:white_check_mark: **Loans:** New Loan, List All, Overdue, List Checked Out.  

#### Books Listing Page
:white_check_mark: Displays a table of books.  
:white_check_mark: Table has the following columns: Book Title, Author, Genre, Year Released.  
:white_check_mark: Each book title links to the book's detail page.  
:white_check_mark: Includes option to filter books by "All", "Overdue", and "Checked Out".  
:white_check_mark: Includes a button to create a new book.  

#### New Book Page
:white_check_mark: Includes a form to add a new book.  
:white_check_mark: Form contains the following fields: Title, Author, Genre, First Published.  
:white_check_mark: An error is displayed if the form is submitted with blank or invalid data.  
:white_check_mark: When the form is submitted successfully, the user is redirected to the Books page.  

#### Book Detail Page
:white_check_mark: Contains a Loan History table with the following columns: book name, patron, loaned on, return by, returned on and action.  
:white_check_mark: If the book is checked out, the “Action” column contains a link to return the book.  
:white_check_mark: Includes a form allowing the user to update the book.  
:white_check_mark: Form has the following input fields: Title, Author, Genre, First Published.  

#### Loans Listing Page
:white_check_mark: Contains option to filter books by “All”, “Overdue”, and “Checked Out”.  
:white_check_mark: Includes a button that links to the New Loan Page.  
:white_check_mark: Contains a table of loans with the following columns: Book Title, Patron, Loaned On, Return By, Returned On, Action.  
:white_check_mark: The “patron” field links to the patron who checked out the book.  
:white_check_mark: If the book is checked out, the “Action” column contains a link to return the book.  

#### New Loan Page
:white_check_mark: Includes the following form fields: Book, Patron, Loaned On, Return By.  
:white_check_mark: Patron and Book are select dropdown menus with the complete list of patrons and books.  
:white_check_mark: “Loaned on” is pre-populated with today’s date, in YYYY-MM-DD format.  
:white_check_mark: “Return by” is 7 days in the future.  
:white_check_mark: An error is displayed if the form is submitted with blank or invalid data in required fields.  
:white_check_mark: When the form is submitted successfully, a loan is created in a the database.  

#### Return Book Page
:white_check_mark: Displays book title, the patron who borrowed the book, the loaned on and return by dates.  
:white_check_mark: Has the “Returned on” field pre-populated with today’s date.  
:white_check_mark: Includes a button to return the book.  
:white_check_mark: An error is displayed if the form is submitted with blank or invalid data in required fields.  
:white_check_mark: When the form is submitted successfully, the loan should be updated in the database and the page should redirect to the loans listing page.  

#### Patrons Listing Page
:white_check_mark: Displays a table listing patron’s information: Name, Address, Email, Library ID, Zip.  
:white_check_mark: Each patron’s name links to the corresponding patron detail page.  

#### Patron Detail Page
:white_check_mark: Contains a form with the following fields: First Name, Last Name, Address, Email, Library ID, Zip.  
:white_check_mark: An error is displayed if the form is submitted with blank or invalid data in required fields.  
:white_check_mark: When the form is submitted successfully, the patron should be updated in the database and the page should redirect to the patron page.  
:white_check_mark: Shows a loan history table.  
:white_check_mark: Each entry in the table should have links to books, patrons, and a link to return the book (if checked out).  

#### New Patron Page
:white_check_mark: Has labels that correctly select form inputs.  
:white_check_mark: All fields should be required and include: First Name, Last Name, Address, Email, Library ID, Zip.  
:white_check_mark: An error is displayed if the form is submitted with blank or invalid data in required fields.  
:white_check_mark: When the form is submitted successfully, a patron should be created in the database and the page should redirect to the patrons listing page.  

### Instructions
1. Clone the repo or download the [zip]().
2. Run `npm install` or `yarn install`.
3. Run `npm run start` or `yarn start`.
4. Go to [http://localhost:8080](http://localhost:8080) in your browser.

### Notes
This project uses [co](https://github.com/tj/co) and [bluebird](https://github.com/petkaantonov/bluebird) (dependency of Sequelize) to handle Promises.  

The `start` script has a `--use_strict` flag to enable compatability with older versions of Node.  

**Node v8.0.0:** Working.  
**Node v6.10.3:** Working.  
**Node v4.8.3:** Requires `--use_strict` flag.  
