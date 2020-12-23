// ***---***---***//
//  Show and hide menu on Click
// function for showing menu
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('showMenu')
        })
    }
}
showMenu('nav-toggle','nav-menu')
// Hide menu when option is clicked
const navLink = document.querySelectorAll('.navLink')
function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each navLink, we remove the show-menu class
    navMenu.classList.remove('showMenu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

// ***---***---***//
// Header border while scroling down
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scrollHeader'); else nav.classList.remove('scrollHeader')
}
window.addEventListener('scroll', scrollHeader)