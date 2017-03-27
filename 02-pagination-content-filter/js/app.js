// hide students function
const studentList = document.getElementsByClassName('student-list');
function hideStudents(start, stop) {
  // hide students starting at first passed argument and stopping at second passed argument
  Array.from(studentList[0].children).splice(start, stop).forEach( (item) => {
    item.style.display = 'none';
  });
}

// show students function
function showStudents(start, stop) {
  // show students starting at first passed argument and stopping at second passed argument
  Array.from(studentList[0].children).splice(start, stop).forEach( (item) => {
    item.style.display = 'block';
  });
}

// active page function
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

// create students object containing arrays of names and emails
const students = {
  names: Array.from(studentList[0].children).map( (item) => item.children[0].children[1].innerText),
  emails: Array.from(studentList[0].children).map( (item) => item.children[0].children[2].innerText)
};

// append pagination div to page div
const page = document.getElementsByClassName('page');
page[0].innerHTML +=
  `<div class="pagination">
    <ul>
    </ul>
  </div>`;

// get number of page links and append to pagination div
const pageNumber = Math.ceil(studentList[0].children.length / 10);
const pagination = document.getElementsByClassName('pagination');
for (let i = 0; i < pageNumber; i ++) {
  pagination[0].children[0].innerHTML +=
    `<li>
      <a href="#">${i+1}</a>
    </li>`;
}

// add click handlers to page links
Array.from(pagination[0].firstElementChild.children).map( (item) => {
  item.addEventListener('click', () => {
    // hide all students
    hideStudents(0, studentList[0].children.length);
    // show 10 students
    showStudents((parseInt(event.currentTarget.innerText) * 10) - 10, 10);
    // add active class to clicked page
    activePage(parseInt(event.currentTarget.innerText - 1));
  });
});

// append search form to page-header div
document.getElementsByClassName('page-header')[0].innerHTML +=
  `<form class="student-search">
    <input type="text" placeholder="Search for students...">
    <button type="submit">Submit</button>
  </form>`;  

// search form event handler
document.getElementsByClassName('student-search')[0].addEventListener('submit', (event) => {
  // prevent default event (refresh) on form submit
  event.preventDefault();
  // get search text from input field
  const searchText = document.getElementsByTagName('input')[0].value;
  // search students.names array for matches or return an array of all names if search is empty
  const nameResults = students.names.filter( (item) => item.includes(`${searchText}`));
  // search students.emails array for matches or return an array of all emails if search is empty
  const emailResults = students.emails.filter( (item) => item.includes(`${searchText}`));
  // hide all students
  hideStudents(0, students.names.length);
  // show matching students or the first 10 students if search field is empty
  if (nameResults.length === students.names.length || emailResults.length === students.names.length) {
    // show the first 10 students
    showStudents(0, 10);
    // make page 1 active
    activePage(0);
  // show only students who match nameResults
  } else {
    nameResults.forEach( (item) => {
      studentList[0].children[students.names.indexOf(item)].style.display = 'block';
    });
    // show only students who match emailResults
    emailResults.forEach( (item) => {
      studentList[0].children[students.emails.indexOf(item)].style.display = 'block';
    });
  }
  // display a message if no results were found and no previous message has been displayed
  if (nameResults.length === 0 && emailResults.length === 0 && pagination[0].previousSibling.innerHTML !== 'No Results') {
    pagination[0].insertAdjacentHTML('beforebegin', '<h3>No Results</h3>');
  // delete previous message if results were found
  } else if (nameResults.length !== 0 && emailResults.length !== 0 && pagination[0].previousSibling.innerHTML === 'No Results') {
    page[0].removeChild(page[0].children[2]);
  }
});

// invoke hideStudents and show only the first 10 students on page load
hideStudents(10, students.names.length - 10);
// invoke activePage on page load
activePage(0);
