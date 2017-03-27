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
  // show students starting at passed argument and stopping at passed argument
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

// append pagination div to page div
const page = document.getElementsByClassName('page');
page[0].innerHTML += `
  <div class="pagination">
    <ul>
    </ul>
  </div>
`;

// get number of page links and append to pagination div
const pageNumber = Math.ceil(studentList[0].children.length / 10);
const pagination = document.getElementsByClassName('pagination');
for (let i = 0; i < pageNumber; i ++) {
  pagination[0].children[0].innerHTML += `
    <li>
      <a href="#">${i+1}</a>
    </li>
  `;
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
document.getElementsByClassName('page-header')[0].innerHTML += `
  <form class="student-search">
    <input type="text" placeholder="Search for students...">
    <button type="submit">Submit</button>
  </form>
`;  

// search form event handler
document.getElementsByTagName('form')[0].addEventListener('submit', (event) => {
  event.preventDefault();
  // get search text from input field
  const searchText = document.getElementsByTagName('input')[0].value;
  // create an array of student names
  const studentNames = Array.from(studentList[0].children).map( (item) => item.children[0].children[1].innerText);
  // search studentNames array for matches or return an array of all names if search is empty
  const searchResults = studentNames.filter( (item) => item.includes(`${searchText}`));
  // hide all students
  hideStudents(0, studentNames.length);
  // show matching students or the first 10 students if search field is empty
  if (searchResults.length === studentNames.length) {
    // show the first 10 students and make page 1 active
    showStudents(0, 10);
    activePage(0);
    // hide students 11 through end of list
    hideStudents(10, studentNames.length);
  } else {
    // show only students who match searchResults
    searchResults.forEach( (item) => {
      studentList[0].children[studentNames.indexOf(item.toString())].style.display = 'block';
    });
  }
  // display a message if no results were found
  if (searchResults.length === 0) {
    pagination[0].insertAdjacentHTML('beforebegin', '<h3>No Results</h3>');
  }
  // delete "No Results" message if results were found
  if (searchResults.length !== 0 && pagination[0].previousSibling.innerHTML === 'No Results') {
    page[0].removeChild(page[0].children[2]);
  }
});

// invoke hideStudents and show only the first 10 students on page load
hideStudents(10, studentList[0].children.length - 10);
// invoke activePage on page load
activePage(0);
