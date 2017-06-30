let overlayBlock = document.getElementById('overlay_block');
let overlayInfo = document.getElementById('overlay_info');

let lastTarget;

document.body.addEventListener('mousemove', function (event) {
    let elements = elementsFromPoint();

    let currentTarget;
    currentTarget = findRequiredItem(elements);

    if (lastTarget === currentTarget) {
        return;
    }

    lastTarget = currentTarget;
    if (currentTarget) {
        renderOverlay(currentTarget);
    }
    else {
        visibility('hide', overlayBlock);
        visibility('hide', overlayInfo);
    }

});


function visibility(parameter, element) {
    switch (parameter) {
        case 'visible':
            element.classList.remove('hide');
            element.classList.add('visible');
            break;
        case 'hide':
            element.classList.remove('visible');
            element.classList.add('hide');
    }
}

function setSize(element, width, height) {
    element.style.width = width + 'px';
    if (height !== null) element.style.height = height + 'px';
}

function setPosition(element, left, top) {
    element.style.left = left + 'px';
    element.style.top = top + 'px';
}

function getFullWidth(element) {
    const computedStyle = window.getComputedStyle(element);
    return element.offsetWidth;
}

function getFullHeight(element) {
    const computedStyle = window.getComputedStyle(element);
    return element.offsetHeight;
}

function elementsFromPoint() {
    return document.elementsFromPoint(event.clientX, event.clientY);
}

function renderOverlay(element) {
    //full widthStyle include width, border, margin;
    const targetElementFullWidth = getFullWidth(element);

    //full heightStyle include height, border, margin;
    const targetElementFullHeight = getFullHeight(element);

    const computedStyle = window.getComputedStyle(element);
    const offsetLeft = element.getBoundingClientRect().left;
    const offsetTop = element.getBoundingClientRect().top;


    visibility('visible', overlayBlock);
    setSize(overlayBlock, targetElementFullWidth, targetElementFullHeight);
    setPosition(overlayBlock, offsetLeft, offsetTop);

    visibility('visible', overlayInfo);
    setSize(overlayInfo, targetElementFullWidth);
    setPosition(overlayInfo, offsetLeft, offsetTop + targetElementFullHeight);
}

function findRequiredItem(elements) {

    for (let i = 0; i < elements.length; i++) {

        const element = elements[i];
        if (element.getAttribute('data-layout')) {
            return element;
        }
    }
}
