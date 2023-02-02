AOS.init();
document.querySelector('video').playbackRate=0.7;

function scrollToDiv(id) {
    var element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}