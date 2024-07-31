
document.addEventListener('DOMContentLoaded', function() {
  let internalEvents = JSON.parse(localStorage.getItem('internalEvents')) || [];
  let externalEvents = JSON.parse(localStorage.getItem('externalEvents')) || [];
  let currentDate1 = new Date();
  let currentDate2 = new Date();

  function createCalendar(calendarId, year, month, events) {
    const calendar = document.getElementById(calendarId);
    calendar.innerHTML = '';

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < startDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.classList.add('day');
      calendar.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('div');
      cell.classList.add('day');

      const header = document.createElement('div');
      header.classList.add('day-header');
      header.textContent = day;
      cell.appendChild(header);

      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === dateStr);

      dayEvents.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.textContent = event.title;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.onclick = function() {
          deleteEvent(calendarId, dateStr, index);
        };

        eventDiv.appendChild(deleteBtn);
        cell.appendChild(eventDiv);
      });

      calendar.appendChild(cell);
    }
  }

  function updateCalendarHeaders() {
    const options = { year: 'numeric', month: 'long' };
    document.getElementById('currentMonth1').textContent = currentDate1.toLocaleDateString('ko-KR', options);
    document.getElementById('currentMonth2').textContent = currentDate2.toLocaleDateString('ko-KR', options);
  }

  function addEvent() {
    const date = document.getElementById('eventDate').value;
    const title = document.getElementById('eventTitle').value;
    const type = document.getElementById('eventType').value;

    if (date && title) {
      const event = { date, title };
      if (type === 'internal') {
        internalEvents.push(event);
        localStorage.setItem('internalEvents', JSON.stringify(internalEvents));
        createCalendar('calendar1', currentDate1.getFullYear(), currentDate1.getMonth(), internalEvents);
      } else if (type === 'external') {
        externalEvents.push(event);
        localStorage.setItem('externalEvents', JSON.stringify(externalEvents));
        createCalendar('calendar2', currentDate2.getFullYear(), currentDate2.getMonth(), externalEvents);
      }
    } else {
      alert('날짜와 제목을 입력하세요.');
    }
  }

  function deleteEvent(calendarId, dateStr, index) {
    if (calendarId === 'calendar1') {
      internalEvents = internalEvents.filter((event, i) => !(event.date === dateStr && i === index));
      localStorage.setItem('internalEvents', JSON.stringify(internalEvents));
      createCalendar('calendar1', currentDate1.getFullYear(), currentDate1.getMonth(), internalEvents);
    } else if (calendarId === 'calendar2') {
      externalEvents = externalEvents.filter((event, i) => !(event.date === dateStr && i === index));
      localStorage.setItem('externalEvents', JSON.stringify(externalEvents));
      createCalendar('calendar2', currentDate2.getFullYear(), currentDate2.getMonth(), externalEvents);
    }
  }

  document.getElementById('prevMonth1').addEventListener('click', function() {
    currentDate1.setMonth(currentDate1.getMonth() - 1);
    createCalendar('calendar1', currentDate1.getFullYear(), currentDate1.getMonth(), internalEvents);
    updateCalendarHeaders();
  });

  document.getElementById('nextMonth1').addEventListener('click', function() {
    currentDate1.setMonth(currentDate1.getMonth() + 1);
    createCalendar('calendar1', currentDate1.getFullYear(), currentDate1.getMonth(), internalEvents);
    updateCalendarHeaders();
  });

  document.getElementById('prevMonth2').addEventListener('click', function() {
    currentDate2.setMonth(currentDate2.getMonth() - 1);
    createCalendar('calendar2', currentDate2.getFullYear(), currentDate2.getMonth(), externalEvents);
    updateCalendarHeaders();
  });

  document.getElementById('nextMonth2').addEventListener('click', function() {
    currentDate2.setMonth(currentDate2.getMonth() + 1);
    createCalendar('calendar2', currentDate2.getFullYear(), currentDate2.getMonth(), externalEvents);
    updateCalendarHeaders();
  });

  createCalendar('calendar1', currentDate1.getFullYear(), currentDate1.getMonth(), internalEvents);
  createCalendar('calendar2', currentDate2.getFullYear(), currentDate2.getMonth(), externalEvents);
  updateCalendarHeaders();
  window.addEvent = addEvent;
});