let letter = $('.letter')
let letterA = $('.letter-a')
let letterADiv = $('.letter-a > div')

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

$(".letter").draggable()

letter.mouseover(makeBorderRed)
letter.mouseout(makeBorderRed)
