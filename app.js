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
  scrollToView(link);
})

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
  console.log(1 - (window.scrollY / homeHeight));
  home.style.opacity = 1 - (window.scrollY / homeHeight);
})

const scrollToView = (selector) => {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: 'smooth'});
}