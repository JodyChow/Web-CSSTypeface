let letter = $('.letter')
let letterA = $('.letter-a')
let letterADiv = $('.letter-a > div')

//
function makeBorderRed(e) {
    let target = e.currentTarget
    let children = target.children


    let r = Math.round(Math.random() * 255)
    let g = Math.round(Math.random() * 255)
    let b = Math.round(Math.random() * 255)

    let colour = 'rgb(' + r + ',' + g + ',' + b + ')'

    for (let i = 0; i < children.length; i++) {
        let div = $(children[i])
        let backgroundColor = div.css('background-color')

        if (backgroundColor !== 'rgb(255, 255, 255)') {
            div.css('background', colour)
        }
    }
}

//
$(".letter").draggable()

letter.mouseover(makeBorderRed)
letter.mouseout(makeBorderRed)

//
let activeStamp

function sample(event, letter) {
    if (activeStamp !== undefined) activeStamp.remove()

    let clonedLetter = letter.cloneNode(true)
    $('body').append(clonedLetter)
    attachStampToCursor(event, clonedLetter)
    activeStamp = clonedLetter
}

function stamp() {
    if (activeStamp !== undefined) {
        let letter = activeStamp.cloneNode(true)
        $('body').append(letter)
    }
}

function attachStampToCursor(event, letter) {
    const clientX = event.clientX
    const clientY = event.clientY

    $(letter).removeClass('letter')
    $(letter).addClass('letter-clone')

    let letterSize = getLetterSize(letter)
    let width = letterSize.width
    let height = letterSize.height

    let centerX = clientX - (width / 2)
    let centerY = clientY - (height / 2)

    $(letter).css('left', centerX + 'px')
    $(letter).css('top', centerY + 'px')
}

function getLetterSize(letter) {
    let letterParts = letter.children
    let leftMost, rightMost, topMost, bottomMost

    for (let i = 0; i < letterParts.length; i++) {
        let letterPart = letterParts[i]
        let edges = letterPart.getBoundingClientRect()

        let left = edges.left
        let right = edges.right
        let top = edges.top
        let bottom = edges.bottom

        if (leftMost == undefined || left < leftMost) leftMost = left
        if (rightMost == undefined || right > rightMost) rightMost = right
        if (topMost == undefined || top < topMost) topMost = top
        if (bottomMost == undefined || bottom > bottomMost) bottomMost = bottom
    }

    let width = rightMost - leftMost
    let height = bottomMost - topMost

    return { width, height }
}

document.addEventListener('click', function (event) {

    let listOfElementsWeClickedOn = event.composedPath()

    let originalLetter
    for (let i = 0; i < listOfElementsWeClickedOn.length; i++) {
        let element = listOfElementsWeClickedOn[i]
        if ($(element).hasClass('letter') && !$(element).hasClass('letter-clone')) {
            originalLetter = element
        }
    }

    if (originalLetter !== undefined) sample(event, originalLetter)
    else stamp(event)
})

document.addEventListener('mousemove', function (event) {
    if (activeStamp !== undefined) {
        attachStampToCursor(event, activeStamp)
    }
})