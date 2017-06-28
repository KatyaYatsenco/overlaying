let blocks = document.querySelectorAll(".one");
blocks.forEach((element) => element.style.backgroundColor = getRandomColor());

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const overlayBlock = document.getElementById('overlay_block');
const overlayInfo = document.getElementById('overlay_info');


document.body.addEventListener('mouseover', (event) => {
    const targetElement = event.target;
    if (targetElement.classList.contains('one')) {
        const computedStyle = window.getComputedStyle(targetElement);
        //full widthStyle include width, border, margin;
        const targetElementFullWidthSize = targetElement.offsetWidth + parseInt(computedStyle.marginLeft) + parseInt(computedStyle.marginRight);
        //full heightStyle include height, border, margin;
        const targetElementFullHeightSize = targetElement.offsetHeight + parseInt(computedStyle.marginTop) + parseInt(computedStyle.marginBottom);

        const offsetLeft = targetElement.offsetLeft - parseInt(computedStyle.marginLeft);
        const offsetTop = targetElement.offsetTop - parseInt(computedStyle.marginTop);

        overlayBlock.classList.remove('hide');
        overlayBlock.classList.add('visible');
        overlayBlock.style.width = targetElementFullWidthSize + 'px';
        overlayBlock.style.height = targetElementFullHeightSize + 'px';
        overlayBlock.style.left = offsetLeft + 'px';
        overlayBlock.style.top = offsetTop + 'px';

        overlayInfo.classList.remove('hide');
        overlayInfo.classList.add('visible');
        overlayInfo.style.width = targetElementFullWidthSize + 'px';
        overlayInfo.style.left = offsetLeft + 'px';
        overlayInfo.style.top = offsetTop + targetElementFullHeightSize + 'px';
    }
});

document.body.addEventListener('mouseout', (event) => {
    const targetElement = event.target;
    if (!targetElement.classList.contains('one')) {
        overlayBlock.classList.remove('visible');
        overlayBlock.classList.add('hide');
        overlayInfo.classList.remove('visible');
        overlayInfo.classList.add('hide');
    }
});


function elementParameters(targetElement) {

}