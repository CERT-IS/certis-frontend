document.addEventListener("DOMContentLoaded", function() {
  loadBoardData();
});

function loadBoardData() {
  const data = JSON.parse(localStorage.getItem('project_boardData')) || [];
  const tableBody = document.getElementById('board-body');
  tableBody.innerHTML = ''; 
  const reversedData = data.reverse();
  reversedData.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${reversedData.length - index}</td>
    <td>${item.제목}</td>
    <td>${item.글쓴이}</td>
    <td>${item.작성일}</td>`;
    row.addEventListener('click', function() {
      window.location.href = `project_data.html?index=${index}`;
    });
    tableBody.appendChild(row);
  });
}