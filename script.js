// Initial student data
var students = [ ];
  
  const studentList = document.getElementById('student-list');
  const createForm = document.getElementById('create-form');
  const searchInput = document.getElementById('search-input');
  
  // Render student list
  function renderStudents(studentsArray = students) {
    studentList.innerHTML = '';
  
    for (const student of studentsArray) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td class="actions">
          <button class="edit-btn" data-id="${student.ID}">Edit</button>
          <button class="delete-btn" data-id="${student.ID}">Delete</button>
        </td>
      `;
  
      studentList.appendChild(row);
    }
  }
  
  // Add student
  createForm.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('cgpa').value;
    const degree = document.getElementById('degree').value;
  
    // Generate unique ID for new student
    const newID = students.length > 0 ? students[students.length - 1].ID + 1 : 1;
  
    const newStudent = {
      ID: newID,
      name,
      email,
      age,
      degree,
      grade,
    };
  
    students.push(newStudent);
    renderStudents();
    createForm.reset();
  });
  
  // Edit student
  studentList.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-btn')) {
      const studentID = parseInt(event.target.dataset.id);
  
      // Find student by ID
      const student = students.find(student => student.ID === studentID);
  
      if (student) {
        document.getElementById('name').value = student.name;
        document.getElementById('email').value = student.email;
        document.getElementById('age').value = student.age;
        document.getElementById('cgpa').value = student.grade;
        document.getElementById('degree').value = student.degree;
  
        // Change button text to "Edit Student"
        const addButton = document.getElementById('add-student-btn');
        addButton.textContent = 'Edit Student';
        addButton.dataset.editID = studentID;
      }
    }
  });
  
  // Update student
  createForm.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const grade = document.getElementById('cgpa').value;
    const age = document.getElementById('age').value;
    const degree = document.getElementById('degree').value;
    const editID = parseInt(document.getElementById('add-student-btn').dataset.editID);
  
    // Find student by ID
    const student = students.find(student => student.ID === editID);
  
    if (student) {
      student.name = name;
      student.age = age;
      student.grade = grade;
      student.degree = degree;
      student.email = email;
  
      renderStudents();
      createForm.reset();
      document.getElementById('add-student-btn').textContent = 'Add Student';
    }
  });
  
  // Delete student
  studentList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      const studentID = parseInt(event.target.dataset.id);
  
      // Find student index by ID
      const studentIndex = students.findIndex(student => student.ID === studentID);
  
      if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        renderStudents();
      }
    }
  });
  
  // Search students
  searchInput.addEventListener('input', function(event) {
    const searchText = event.target.value.toLowerCase();
  
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.degree.toLowerCase().includes(searchText)
    );
  
    renderStudents(filteredStudents);
  });
  
  // Initial rendering
  renderStudents();
  