function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".forloco"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".forloco" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".forloco", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".forloco").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotive()

function cursor(){
    let loco = document.querySelector(".forloco")
let crsr = document.querySelector(".cursor")

loco.addEventListener('mousemove',function(dets){
    gsap.to(crsr,{
        x:dets.x - loco.getBoundingClientRect().x ,
        y:dets.y - loco.getBoundingClientRect().y 
    })
    
})

}
cursor()

function slideMenu(){
    var menu = document.querySelector(".nav i")
var close = document.querySelector(".full i")

var tl = gsap.timeline()
tl.to(".full",{
    right:0,
    duration:0.5
})

tl.from(".full h4",{
    y:250,
    duration:0.5,
    opacity:0,
    stagger:0.2   
})

tl.from(".full i",{
    opacity:0
})
tl.pause()

menu.addEventListener("click",function(){
    tl.play()
})

close.addEventListener("click",function(){
    tl.reverse()

})
}
slideMenu()

function homeAnimation(){
    var tl = gsap.timeline()

tl.from(".main .home .h-bot h2",{
    y:-100,
    opacity:0,
    // stagger:0.2,
    duration:.6,
    // delay:1

})
tl.from(".main .home .h-top",{
    x:-60,
    opacity:0,
    duration:.7
})
}
homeAnimation()


function textSplitting(){
    var allH1 = document.querySelectorAll(".page2 h3")
allH1.forEach(function(elem){
    var clutter = ""
    var h3Text = elem.textContent
    var splittedText = h3Text.split("")
    splittedText.forEach(function(e){
        clutter += `<span>${e}</span>`
    })
    elem.innerHTML = clutter
})
}
textSplitting()
// var h3Text = document.querySelector(".firsth3").textContent
// var splitedText = h3Text.split("")
// var clutter = ""
// splitedText.forEach(function(elem){
//     clutter += `<span>${elem}</span>`
// })
// document.querySelector(".firsth3").innerHTML = clutter



function gsapAnimation(){
    gsap.to(".page2 h3 span",{
        color:"#ffffff",
        stagger:1.5,
        scrollTrigger:{
            trigger:".page2 h3",
            scroller:".forloco",
            markers:false,
            start:"top 60%",
            end:"top -8%",
            scrub:2.5
        }
    })
}
gsapAnimation()

function svgString(){
    var path = "M 60 100 Q 500 100 1380 100"
var finalPath = "M 60 100 Q 500 100 1380 100"

var string = document.querySelector(".string")

string.addEventListener("mousemove",function(dets){
    path = `M 60 100 Q ${dets.x} ${dets.y} 1380 100`

    gsap.to("svg path",{
        attr:{d: path},
        duration:0.3,
        ease:"power1.out"
    })
})

string.addEventListener("mouseleave",function(){
    gsap.to("svg path",{
        attr:{d:finalPath},
        duration:1.5,
        ease:"elastic.out(1,0.2)"
    })
})
}
svgString()

function motionText(){
    window.addEventListener("wheel",function(dets){
        if(dets.deltaY>0){
            // console.log("seedha")
            gsap.to(".marque",{
                transform:"translateX(-200%)",
                duration:3,
                repeat:-1,
                ease:"none"
            })
            gsap.to(".marque img",{
                rotate:0
            })
        }else{
            gsap.to(".marque",{
                transform:"translateX(0%)",
                duration:3,
                repeat:-1,
                ease:"none"
            })
            gsap.to(".marque img",{
                rotate:90
            })
        }
    })
}
motionText()

function divXScroll(){
    gsap.to(".page4 .multi-div",{
        transform:"translateX(-65%)",
        scrollTrigger:{
            trigger:".multi-div",
            scroller:".forloco",
            markers:false,
            start:"top 15%",
            end:"top -110%",
            scrub:.5,
            pin:true
        }
    })
}
divXScroll()

function varDivSize(){
    gsap.to(".page5 .section",{
        // transform:"translateY(-65%)",
        // width:"70%",
        opacity:".8",
        margin:"10vw",
        scrollTrigger:{
            trigger:".section",
            scroller:".forloco",
            markers:false,
            start:"top 55%",
            end:"top 12%",
            scrub:2,
            // pin:true
        }
    })
    gsap.to(".page5 .section h1",{
        fontSize: "4.5vw",
        scrollTrigger:{
            trigger:".section",
            scroller:".forloco",
            markers:false,
            start:"top 55%",
            end:"top 12%",
            scrub:2,
        }
    })
}
varDivSize()