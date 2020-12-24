// Show Scroller
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    console.log(this.scrollY)
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollTop.classList.add('showScroll'); else scrollTop.classList.remove('showScroll')
}
window.addEventListener('scroll', scrollTop)