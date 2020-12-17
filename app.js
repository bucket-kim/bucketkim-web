'use strict';

// navbar color transition on the top

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar__dark');
  } else {
    navbar.classList.remove('navbar__dark');
  }
});



// handle scrolling when menu onclick happens 

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
  console.log(e.target.dataset.link);
  const target = e.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollToView(link);
});

// navbar menu toggle

const menuToggle = document.querySelector('.navbar__toggle-btn');
menuToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Handle click on Contact Me and logo to home

const homeLogoBtn = document.querySelector(".navbar__homeLogo");
homeLogoBtn.addEventListener('click', () => {
  scrollToView("#home");
});

const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click', () => {
  scrollToView('#contact');
});

// home display fade logic as we scroll down the page
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - (window.scrollY / homeHeight);
});

// Arrow Up visibility function when scrolling down
const arrow = document.querySelector('.arrow__up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrow.classList.add('visible');
  } else {
    arrow.classList.remove('visible')
  };
});

arrow.addEventListener('click', () => {
  scrollToView('#home')
});

// filter projects based on sections
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  };

  //keep selected item highlighted
  const active = document.querySelector('.category__btn.active');
  active.classList.remove('active');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('active');

  projectContainer.classList.add('animate');
  setTimeout(() => {
    projects.forEach((project) => {
      if(filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('animate');
  }, 250);
});

const scrollToView = (selector) => {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
}

// 1. 모든 섹션 요소들을 가지고 온다
// 2. intersectionobserver 사용해 섹션을 관찰한다
// 3. 섹션에 해당하는 메뉴 활성화 한다

const sectionIds = [
  '#home', 
  '#about',
  '#skills',
  '#works',
  '#contact',
];

const sections = sectionIds.map(id => 
  document.querySelector(id)
  );
const navItems = sectionIds.map(id => 
  document.querySelector(`[data-link="#${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
  selectNavItem(navItems[selectedNavIndex]);
})