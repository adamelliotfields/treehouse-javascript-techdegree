// hideStudents function
const studentList = document.getElementsByClassName('student-list');
function hideStudents(start, stop) {
  // hide students starting at first passed argument and stopping at second passed argument
  Array.from(studentList[0].children).splice(start, stop).forEach( (item) => {
    item.style.display = 'none';
  });
}

// showStudents function
function showStudents(start, stop) {
  // show students starting at first passed argument and stopping at second passed argument
  Array.from(studentList[0].children).splice(start, stop).forEach( (item) => {
    item.style.display = 'block';
  });
}

// Create students object containing arrays of names and emails
const students = {
  names: Array.from(studentList[0].children).map( (item) => item.children[0].children[1].innerText),
  emails: Array.from(studentList[0].children).map( (item) => item.children[0].children[2].innerText)
};

// Append pagination div to page div
const page = document.getElementsByClassName('page');
page[0].innerHTML +=
  `<div class="pagination">
    <ul>
    </ul>
  </div>`;

// Get number of page links and append to pagination div
const pagination = document.getElementsByClassName('pagination');
for (let i = 0; i < Math.ceil(students.names.length / 10); i ++) {
  pagination[0].children[0].innerHTML +=
    `<li>
      <a href="#">${i+1}</a>
    </li>`;
}

// activePage function
function activePage(page) {
  // remove active class from previously clicked page link
  Array.from(pagination[0].firstElementChild.children).forEach( (item) => {
    if (item.firstElementChild.classList[0] === 'active') {
      item.firstElementChild.classList.remove('active');
    }
  });
  // add active class to current page link
  pagination[0].firstElementChild.children[page].firstElementChild.classList.add('active');
}

// Page link click handlers
Array.from(pagination[0].firstElementChild.children).map( (item) => {
  item.addEventListener('click', () => {
    // hide all students
    hideStudents(0, students.names.length);
    // show 10 students
    showStudents((parseInt(event.currentTarget.innerText) * 10) - 10, 10);
    // add active class to clicked page
    activePage(parseInt(event.currentTarget.innerText - 1));
  });
});

// Append search form to page-header div
document.getElementsByClassName('page-header')[0].innerHTML +=
  `<form class="student-search">
    <input type="text" placeholder="Search for students...">
    <button type="submit">Submit</button>
  </form>`;  

// Search form event handler
document.getElementsByClassName('student-search')[0].addEventListener('submit', (event) => {
  // prevent default event (refresh) on form submit
  event.preventDefault();
  // get search text from input field
  const searchText = document.getElementsByTagName('input')[0].value;
  // create search object containing arrays of student names and emails that match searchText
  // returns arrays of all names and emails if searchText is empty
  const search = {
    names: students.names.filter( (item) => item.includes(`${searchText}`)),
    emails: students.emails.filter( (item) => item.includes(`${searchText}`))
  };
  // hide all students
  hideStudents(0, students.names.length);
  // show matching students or the first 10 students if search field is empty
  if (search.names.length === students.names.length || search.emails.length === students.emails.length) {
    // show the first 10 students
    showStudents(0, 10);
    // make page 1 active
    activePage(0);
  // show only students who match search.names
  } else {
    search.names.forEach( (item) => {
      studentList[0].children[students.names.indexOf(item)].style.display = 'block';
    });
    // show only students who match search.emails
    search.emails.forEach( (item) => {
      studentList[0].children[students.emails.indexOf(item)].style.display = 'block';
    });
  }
  // display a message if no results were found and no previous message has been displayed
  if (search.names.length === 0 && search.emails.length === 0 && pagination[0].previousSibling.innerHTML !== 'No Results') {
    pagination[0].insertAdjacentHTML('beforebegin', '<h3>No Results</h3>');
  // delete previous message if results were found
  } else if (search.names.length !== 0 && search.emails.length !== 0 && pagination[0].previousSibling.innerHTML === 'No Results') {
    page[0].removeChild(page[0].children[2]);
  }
});

// Invoke hideStudents and show only the first 10 students on page load
hideStudents(10, students.names.length - 10);

// Invoke activePage on page load
activePage(0);
