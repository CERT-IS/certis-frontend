window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const section2 = document.querySelector('.section2');
  const section3 = document.querySelector('.section3');
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const headerHeight = header.offsetHeight;
  
 
  const triggerPoint = windowHeight - headerHeight;
  if (scrollY >= triggerPoint) {
    header.classList.add('sticky');
    header.style.top = '0px';
  } else {
    header.classList.remove('sticky');
    const newTop = Math.max(triggerPoint - scrollY, 0);
    header.style.top = `${newTop}px`;
    header.style.bottom = 'auto';
  }



  const section3Top = section3.getBoundingClientRect().top;
  if (section3Top < windowHeight / 2) {
    section3.classList.add('visible');
  } else {
    section3.classList.remove('visible');
  }
});

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const windowHeight = window.innerHeight;
  const headerHeight = header.offsetHeight;
  
  const triggerPoint = windowHeight - headerHeight;
  if (window.scrollY === 1) {
    window.scrollTo({
      top: triggerPoint,
      behavior: 'smooth'
    });
  }
}, { once: true });