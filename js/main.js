gsap.registerPlugin(ScrollTrigger);



function updateOpacity(){

  const targets = document.querySelectorAll(".agency");

  targets.forEach(target => {
    const tl = gsap.timeline({
      defaults: {duration: 1},
      scrollTrigger: {
        trigger: target,
        scrub: true,
        start: "top 80%",
        end: "bottom 20%",

      }
    })
      .fromTo(target, {y: 50}, {y: -50})
      .from(target, {opacity: 0, duration: 1}, 0)
      .to(target, {opacity: 0, duration: 1}, 0.8)
  });
}


function initBackground() {

  const getVh = () => {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    return vh;
  }

  const updateBodyColor= (color) => {
    gsap.to('.fill-background', {backgroundColor: color, ease: 'none'})
  }

  gsap.utils.toArray('.agency').forEach((stage, index) => {


    ScrollTrigger.create({
      trigger: stage,
      start: 'top center',
      end: () => `+=${stage.clientHeight+getVh()/10}`,
      onEnter: () => updateBodyColor(stage.dataset.color),
      onEnterBack: () => updateBodyColor(stage.dataset.color),
    });

  });

}


function initPageTransitions() {
  // do something before the transition starts
  barba.hooks.before(() => {
    select('html').classList.add('is-transitioning');
  });
  // do something after the transition finishes
  barba.hooks.after(() => {
    select('html').classList.remove('is-transitioning');
  });

  // scroll to the top of the page
  barba.hooks.enter(() => {
    window.scrollTo(0, 0);
  });

  barba.init({
    transitions: [{
      once() {
        // do something once on the initial page load
        initLoader();
      },
      async leave({current}) {
        // animate loading screen in
        await pageTransitionIn(current);
      },
      enter({next}) {
        // animate loading screen away
        pageTransitionOut(next);
      }
    }]
  });

  barba.hooks.before(({ next }) => {
    const items = next.container.querySelectorAll('whatever you want')
  })


}


function horizontalScroll(){

    const sections = gsap.utils.toArray(".panel");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        // base vertical scrolling on how wide the container is so it feels more natural.
        end: function end() {
          return "+=" + document.querySelector(".horizontal").offsetWidth;
        }
      }
    });
  }

function init(){

  //updateOpacity()
  horizontalScroll();
  // initBackground();
  // initSmoothScrollBar();
  //initPageTransitions();

}

window.addEventListener('load', function(){
  init();
});
