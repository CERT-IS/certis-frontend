document.addEventListener("DOMContentLoaded", function() {
  fetch('../html/navi.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('header-placeholder').innerHTML = data;
          document.getElementById("certis-button").addEventListener("click", function() {
              window.location.href = "introduce.html";
          });
      });
});
