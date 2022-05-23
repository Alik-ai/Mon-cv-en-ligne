
                //On creer un effet d'affichage au scroll

const ratio = .1

const options = {
    root: null, //l'element racine pour detecter si l'element est visible a l'ecran
    rootMargin: '0px', // c'est pour dire pour la marge depasse cette large pour etre visible
    threshold: ratio // indique a partir de quelle momentr l esysteme de detection affiche 
  }
  
const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
        if(entry.intersectionRatio > ratio){
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target) // je veux que tu arrete d'observer notre cible entry 
        }
    })
}

const observer = new IntersectionObserver(handleIntersect, options);
document.querySelectorAll('[class*="reveal-"]').forEach(function (r){
    observer.observe(r)
})

// Fin 



