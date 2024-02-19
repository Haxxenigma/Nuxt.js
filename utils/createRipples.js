export function createRipples(e) {
    const ripples = document.createElement('i');

    const xPos = e.pageX - e.target.parentElement.offsetLeft;
    const yPos = e.pageY - e.target.parentElement.offsetTop;

    ripples.style.left = xPos + 'px';
    ripples.style.top = yPos + 'px';

    e.target.appendChild(ripples);
    ripples.classList.add('ripples');

    setTimeout(() => {
        ripples.remove();
    }, 350);
}