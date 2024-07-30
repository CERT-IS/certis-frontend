let imagesindex = 0;
const images = document.querySelectorAll('.banner img');
const imagescount = images.length;
setInterval(() => {
  images[imagesindex].classList.remove('active');
  imagesindex = (imagesindex+1) % imagescount;
  images[imagesindex].classList.add('active');
},3000);

loadNotices();

function loadNotices() { 
  const notices = JSON.parse(localStorage.getItem('notice_boardData')) || [];
  const noticeList = document.getElementById('notice-list');
  const recentNotices = notices.reverse();

  recentNotices.forEach((notice, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${notice.제목}</td>
          <td>${notice.글쓴이}</td>
          <td>${notice.작성일}</td>
      `;
      row.addEventListener('click', () => {
          window.location.href = `detail.html?index=${notices.length - index - 1}`;
      });
      noticeList.appendChild(row);
  });
}

let currentInternalDate = new Date();
        let currentExternalDate = new Date();
        const internalEvents = JSON.parse(localStorage.getItem('internalEvents')) || [];
        const externalEvents = JSON.parse(localStorage.getItem('externalEvents')) || [];

        function updateEventList(eventType) {
            const eventList = document.getElementById(`${eventType}Events`);
            const dateDisplay = document.getElementById(`${eventType}Date`);
            const currentDate = eventType === 'internal' ? currentInternalDate : currentExternalDate;
            eventList.innerHTML = '';
            const dateStr = currentDate.toISOString().split('T')[0];

            dateDisplay.textContent = currentDate.toLocaleDateString('ko-KR');

            const events = eventType === 'internal' ? internalEvents : externalEvents;
            const dayEvents = events.filter(event => event.date === dateStr);

            if (dayEvents.length === 0) {
                eventList.innerHTML = '<p>오늘 일정이 없습니다.</p>';
            } else {
                dayEvents.forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event');
                    eventDiv.textContent = event.title;
                    eventList.appendChild(eventDiv);
                });
            }
        }

        document.getElementById('prevDayInternal').addEventListener('click', function() {
            currentInternalDate.setDate(currentInternalDate.getDate() - 1);
            updateEventList('internal');
        });

        document.getElementById('nextDayInternal').addEventListener('click', function() {
            currentInternalDate.setDate(currentInternalDate.getDate() + 1);
            updateEventList('internal');
        });

        document.getElementById('prevDayExternal').addEventListener('click', function() {
            currentExternalDate.setDate(currentExternalDate.getDate() - 1);
            updateEventList('external');
        });

        document.getElementById('nextDayExternal').addEventListener('click', function() {
            currentExternalDate.setDate(currentExternalDate.getDate() + 1);
            updateEventList('external');
        });

        updateEventList('internal');
        updateEventList('external');