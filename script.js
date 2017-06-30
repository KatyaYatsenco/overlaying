let overlayBlock = document.createElement('DIV');
overlayBlock.id = 'overlay_debug_block';
document.body.appendChild(overlayBlock);

let overlayInfo = document.createElement('P');
overlayInfo.id = 'overlay_debug_info';
document.body.appendChild(overlayInfo);

let dataAttribute = 'data-layout';

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
            element.classList.remove('overlay_debug_hide');
            element.classList.add('overlay_debug_visible');
            break;
        case 'hide':
            element.classList.remove('overlay_debug_visible');
            element.classList.add('overlay_debug_hide');
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


function elementsFromPoint() {
    return document.elementsFromPoint(event.clientX, event.clientY);
}

function renderOverlay(element) {
    //full widthStyle include width, border;
    const targetElementFullWidth = element.offsetWidth;

    //full heightStyle include height, border;
    const targetElementFullHeight = element.offsetHeight;

    const computedStyle = window.getComputedStyle(element);
    const offsetLeft = element.getBoundingClientRect().left;
    const offsetTop = element.getBoundingClientRect().top + window.scrollY;


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
        if (element.getAttribute(dataAttribute)) {
            return element;
        }
    }
}
