'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.getElementById('section--1')

const slides = document.querySelectorAll('.slide')
const btns = document.querySelectorAll('.slider__btn')
const rightBtn = document.querySelector('.slider__btn--right')
const leftBtn = document.querySelector('.slider__btn--left')
const dotContainer = document.querySelector('.dots')



const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach( btn => btn.addEventListener("click",openModal))

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});




// Create an element
const header = document.querySelector('.header')
const message = document.createElement("div")
message.classList.add('cookie-message')
message.innerHTML = `we use cookied for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>`

header.after(message)

// Delete an element
const btnCookieClose = document.querySelector('.btn--close-cookie')
btnCookieClose.addEventListener('click',function(e){
  // message.remove()
  message.parentElement.removeChild(message)
})

// Style 
message.style = "background-color:#37383d;"

// console.log(message.style) // it show the inline styles
// console.log(getComputedStyle(message).padding)

document.documentElement.style.scrollBehavior = 'smooth'


// const h1 = document.querySelector("h1")
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)

// h1.firstElementChild.style.color = "white"
// h1.lastElementChild.style.color = "orangered"

////////////////////////////
// tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');
  if(!clicked) return;
  // active tab
  tabs.forEach( t=>t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c=>c.classList.remove('operations__content--active'))
  
  clicked.classList.add('operations__tab--active')
  // clicked.classList.add('operations__content--active')
  // active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active')
})





// menu fade animation
const nav = document.querySelector('nav')

const navBlurBackground = function(e){
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img')
    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover',navBlurBackground.bind(0.5))
nav.addEventListener('mouseout',navBlurBackground.bind(1))
     
// Sticky navigation
// const initialCoords = section1.getBoundingClientRect()
// // console.log(initialCoords.top)
// window.addEventListener('scroll',function(){
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky') 
// })

// const obsCallBack = function(entries,observer){
//   // console.log(entries)
//   // console.log(observer)
//   entries.forEach(entry => {
//     console.log(entry)
//   })
// }
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }
// const observer = new IntersectionObserver(obsCallBack,obsOptions)
// observer.observe(section1)
// console.log(observer)

const navHeight = nav.getBoundingClientRect

const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav,{ 
  root: null,
  threshold: 0,
  rootMargin: '-40px'
})

headerObserver.observe(header)



// Section Reveal
const  sections = document.querySelectorAll('.section') 
const obsFunc = function(entries,observer){
  const [ entry ] = entries
  if(!entry.isIntersecting) return ;
  entry.target.classList.remove("section--hidden")
  observer.unobserve(entry.target)
}
const sectionReveal = new IntersectionObserver(obsFunc,{
  root: null,
  threshold: 0.2
})
sections.forEach( section=>{
  // console.log(section)
  sectionReveal.observe(section)
  // section.classList.add('section--hidden')
})



// Image Reveal
const images = document.querySelectorAll('img[data-src]')
const obsImage = function(entries,observer){
  const [entry] = entries
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load",function(e){
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
  // console.log(entry.target)
}

const imageIntersection = new IntersectionObserver(obsImage,{
  root:null,
  threshold: 0.5,
  rootMargin: '-200px'
})

images.forEach( img=> imageIntersection.observe(img) )




// Slider 


const goToSlide = function(slide){
  slides.forEach( (s,i)=>{
      s.style.transform =  `translateX(${100*(i-slide)}%)`
  })
}
goToSlide(0)


const createDots = function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
  })
}

createDots()

let currentSlide = 0
const maxSlide = slides.length-1

const activateDot = function(slide){
  document.querySelectorAll('.dots__dot')
    .forEach( dot=>dot.classList.remove('dots__dot--active') );
  
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}
activateDot(0)

const nextSlide = function(){
  currentSlide === maxSlide ? currentSlide = 0:currentSlide++;
  activateDot(currentSlide)
  goToSlide(currentSlide)
}

const prevSlide = function(){
  currentSlide < 1 ? currentSlide = maxSlide:currentSlide--;
  activateDot(currentSlide)
  goToSlide(currentSlide)
}

rightBtn.addEventListener('click',nextSlide)
leftBtn.addEventListener('click',prevSlide)

document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowRight'){
    nextSlide()
  }else if(e.key === 'ArrowLeft'){
    prevSlide()
  }
})
// console.log("lsdkjflkasjdlf")
// const dot = document.createElement("input")



dotContainer.addEventListener('click',function(e){
  e.target.classList.remove('dots__dot--active')
  if(e.target.classList.contains('dots__dot')){
    const { slide } = e.target.dataset
    // e.target.classList.add('dots__dot--active')
    goToSlide(slide)
    activateDot(slide)
  }
})


window.addEventListener("beforeunload",(e)=>{
  e.preventDefault()
  console.log('do you want to unload')
  e.returnValue = ''
})