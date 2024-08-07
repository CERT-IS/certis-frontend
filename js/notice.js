document.addEventListener("DOMContentLoaded", function() {
  loadBoardData();
});

function loadBoardData() {
  const data = JSON.parse(localStorage.getItem('notice_boardData')) || [];
  const tableBody = document.getElementById('board-body');
  tableBody.innerHTML = ''; // 초기화
  const reversedData = data.reverse();
  reversedData.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td >
        <span style="font-weight:bold;font-size:1.5em;">${item.제목}</span><br>
        <span style="color:gray; margin-top:3px;">${item.작성일}</span>
    </td>
    `;
    row.addEventListener('click', function() {
      window.location.href = `notice_data.html?index=${index}`;
    });
    tableBody.appendChild(row);
  });
}