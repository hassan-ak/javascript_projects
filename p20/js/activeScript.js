// Active Header links
const sections = document.querySelectorAll('section[id]')
function scrollActive(){
    const scrollY = window.pageYOffset
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop-150;
        sectionId = current.getAttribute('id')
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.navMenu a[href*=' + sectionId + ']').classList.add('activeLink')
        }else{
            document.querySelector('.navMenu a[href*=' + sectionId + ']').classList.remove('activeLink')
        }
    })
}
window.addEventListener('scroll', scrollActive)