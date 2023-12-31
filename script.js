function scrollloco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
 scrollloco();

function navbarAnim(){
    gsap.to("#left svg",{
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0%",
            end: "top -22%",
            scrub: true,
        }
     })
     gsap.to("#links",{
        transform: "translateY(-100%)",
        opacity:0,
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0%",
            end: "top -22%",
            scrub: true,
        }
     })
     gsap.from("#nav",{
        y:-20,
        opacity:0,
        duration:.7,
        scrub: 2,
        ease: Expo
     })
}

navbarAnim();

function videoCon(){
    let vidCon = document.querySelector("#vid-container");
let playBtn = document.querySelector("#play");
vidCon.addEventListener("mouseenter",function(){
  gsap.to(playBtn,{
    opacity:1,
    scale:1
  })
})
vidCon.addEventListener("mouseleave",function(){
  gsap.to(playBtn,{
    opacity:0,
    scale:0
  })
})
vidCon.addEventListener("mousemove",function(dets){
    gsap.to(playBtn,{
        left: dets.x - 50,
        top: dets.y - 58
      
      })
  
})
}
videoCon();


function cursoranim(){
    document.addEventListener("mousemove",function(dets){
        gsap.to("#cursor",{
            top: dets.y,
            left: dets.x
        })
    })
    
    
    document.querySelectorAll(".child").forEach(function(elem){
        elem.addEventListener("mouseenter", function(){
            gsap.to("#cursor",{
                transform: 'translate(-50%, -50%) scale(1)'
            })
        })
        elem.addEventListener("mouseleave", function(){
            gsap.to("#cursor",{
                transform: 'translate(-50%, -50%) scale(0)'
            })
        })
    
    })
    
}
cursoranim();