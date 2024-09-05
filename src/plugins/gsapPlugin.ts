import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { App } from 'vue'

gsap.registerPlugin(ScrollTrigger)

export default {
  install(app: App) {
    app.directive('animate', {
      mounted(el) {
        gsap.from(el, {
          y: 100,
          opacity: 0,
          duration: 1.5,
          stagger: 0.3,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none none'
          }
        })
      }
    })
  }
}
