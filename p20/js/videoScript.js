// play vedio when clicked on window
function playVideo() {
    const video = document.getElementById("video");
    video.play();
}
window.addEventListener('click',playVideo)