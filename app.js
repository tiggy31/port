let controller;
let slideScene
let pageScene



function animateScene() {
    controller = new ScrollMagic.Controller()
    const sliders = document.querySelectorAll('.slide')
    const nav = document.querySelector(".nav-header")
  

      sliders.forEach((slide,index,slides)=> {
          const revealImg = slide.querySelector(".reveal-img")
          const img = slide.querySelector("img")
          const revealText = slide.querySelector(".reveal-text")
          const slideT1 = gsap.timeline({
              defaults: {duration: 1, ease: "power2.inOut"
              }
          })
         
          slideT1.fromTo(revealImg,{y: "50%"}, {y:"100%"} )
          slideT1.fromTo(img,{scale:2}, {scale:1},"-=1")
          slideT1.fromTo(revealText,{x:"0%"}, {x:"100%"},'-=0.7')
          slideT1.fromTo(nav,{y:"50%"}, {y:"0%"},'-=0.5')
     

         //creatingScene
       slideScene = new ScrollMagic.Scene({
           triggerElement: slide,
           triggerHook: 0.1,
           reverse: false

       }) 
         .setTween(slideT1)
         .addIndicators({
               colorStart:'black', 
               colorTrigger: "black",
               name: "slide"})
          .addTo(controller)

          //newanimation
          const pageT1 = gsap.timeline()
                let nextSlide = slide.length-1 ===index ? 'end' : slides[index +1]
                pageT1.fromTo(nextSlide, {y: "0%"}, {y: "50%"})
                pageT1.fromTo(slide, {opacity:1, scale: 0.5, rotate: "-80%",
            }, {opacity:1.5, scale:0.8,rotate: "0", skewY:'-10'},{opacity:0}) 
                pageT1.fromTo(nextSlide, {y: "50%"}, {y: "0%"}, '-=0.5')
               
         //create new scene
          pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: '100%',
            triggerHook:0,
           
          })
          .addIndicators({colorStart: "blue",
                          colorTrigger: "blue", 
                          name:"page",
                          indent:200})
          .setPin(slide)               
          .setTween(pageT1)
          .addTo(controller)

      })
}

const mouse = document.querySelector('.cursor')
const mouseTxt = mouse.querySelector('span')
const burger = document.querySelector(".burger")
const about = document.querySelector(".broad")

function myinfo(e){
    e.preventDefault()
    const item = e.target
    if(!e.target.classList.contains('active')) {
        e.target.classList.add('active')
        gsap.to(".overall-nav", 0.5, {clipPath: 'circle(2500px at 100% -30%)'})
        item.innerText="Go Back"
        document.body.classList.add("hide")
     } else {

        e.target.classList.remove('active')
        item.innerText="About Me"
        gsap.to(".overall-nav", 1, {clipPath: 'circle(50px at 100% -10%)'})
        document.body.classList.remove("hide")

     }
        

}
function cursor(e){
       mouse.style.top = e.pageY + 'px'
       mouse.style.left = e.pageX + 'px'
}

function activeCursor(e){
    const item = e.target
    if(item.id ==='logo' || item.classList.contains('burger')){
       mouse.classList.add('nav-active')
    } else {
        mouse.classList.remove('nav-active')
    }

    if(item.classList.contains('explore')){
        mouse.classList.add('explore-active')
        gsap.to(".title-swipe",1,{y: "0%"})
        mouseTxt.innerText="👽"
    } else {
        mouse.classList.remove('explore-active')
        mouseTxt.innerText=""
        gsap.to(".title-swipe",1,{y: "100%"})
    }
}



function navToggle(e){
    if(!e.target.classList.contains('active')) {
        e.target.classList.add('active')
        gsap.to(".line1", 0.5, {rotate: "45", y:5,background: "black"})
        gsap.to(".line2", 0.5, {rotate: "-45", y:-5,background: "black"})
        gsap.to(".nav-bar", 1, {clipPath: 'circle(1000px at 80% 10%)'})
        gsap.to("#logo",1, {color: "black", y:2})
        document.body.classList.add("hide")
     } else {

        e.target.classList.remove('active')
        gsap.to(".line1", 0.5, {rotate: "0", y:0,background: "white"})
        gsap.to(".line2", 0.5, {rotate: "0", y:0,background: "white"})
        gsap.to(".nav-bar", 1, {clipPath: 'circle(50px at 100% -10%)'})
        gsap.to("#logo",1, {color: "blue"})
        document.body.classList.remove("hide")

     }

    }
      
    
  
      
burger.addEventListener('click', navToggle)
window.addEventListener('mousemove', cursor)
window.addEventListener('mouseover', activeCursor)
about.addEventListener("click", myinfo)
animateScene()
