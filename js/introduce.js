function handleScroll() {
  const header = document.querySelector('header');
  const section2 = document.querySelector('.section2');
  const section3 = document.querySelector('.section3');
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const headerHeight = header.offsetHeight;

  const triggerPoint = windowHeight - headerHeight;

  // Header sticky logic
  if (scrollY >= triggerPoint) {
    header.classList.add('sticky');
    header.style.top = '0px';
  } else {
    header.classList.remove('sticky');
    const newTop = Math.max(triggerPoint - scrollY, 0);
    header.style.top = `${newTop}px`;
    header.style.bottom = 'auto';
  }

  // Section 3 visibility logic
  const section3Top = section3.getBoundingClientRect().top;
  if (section3Top < windowHeight) {
    section3.classList.add('visible');
  } 

  // Appearanimation logic
  const appearanimations = document.querySelectorAll('.appearanimation');
  appearanimations.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight*0.75) {
      element.classList.add('visible');
    }
  });

  // Upanimation logic
  const upanimations = document.querySelectorAll('.upanimation');
 upanimations.forEach( ( element)=>{
  const elementTop = element.getBoundingClientRect().top;
  if(elementTop<windowHeight*0.75){
    element.classList.add('visible');
  }
 });
}

function handleResize() {
  handleScroll();
}

function initialScroll() {
  const header = document.querySelector('header');
  const windowHeight = window.innerHeight;
  const headerHeight = header.offsetHeight;

  const triggerPoint = windowHeight - headerHeight;

  window.scrollTo({
    top: triggerPoint,
    behavior: 'smooth'
  });

  // 이후 스크롤 이벤트 리스너로 전환
  window.removeEventListener('scroll', initialScroll);
  window.addEventListener('scroll', handleScroll);
}

// 페이지가 로드되면 초기 스크롤 설정
window.addEventListener('load', function() {
  window.addEventListener('scroll', initialScroll, { once: true });
  handleScroll(); // 초기 로드 시 스크롤 위치 설정
});

window.addEventListener('resize', handleResize);
