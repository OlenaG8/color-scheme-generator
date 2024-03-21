// GETTING INPUTS 
const baseColorInput = document.getElementById("input-color")
const numberOfColorsInput = document.getElementById("color-count")
const colorSchemeInput = document.getElementById("color-scheme")

// INPUT VALUES
let baseColor = baseColorInput.value.replace(/^#/, '')
let numberOfColors = numberOfColorsInput.value

// BUTTON
const generateBtn = document.getElementById("generate-btn")

// RENDERING RESULTS
const colorPalette = document.getElementById("color-palette")
const colorPaletteValues = document.getElementById("color-palette-values")

let colorScheme = '' 

// Rendering color schemes options
const colorSchemesOptArr = [ 
    "Monochrome", "Monochrome-dark", "Monochrome-light", 
    "Analogic", "Complement", "Analogic-complement", 
    "Triad", "Quad"
]

function renderColorSchemes() {
    colorSchemeInput.innerHTML = ''

    colorSchemesOptArr.forEach(function(scheme) {
        const option = document.createElement('option')
        option.value = scheme
        option.textContent = scheme
        colorSchemeInput.appendChild(option)
    })
}

renderColorSchemes()

document.addEventListener("click", function(e) {
    if (e.target.dataset.color) {
        copyToClipboard(e, e.target.dataset.color)
    }
})

// Event listeners to update input values in real-time 
baseColorInput.addEventListener("change", e => baseColor = e.target.value.replace(/^#/, ''))

numberOfColorsInput.addEventListener("change", e => numberOfColors = e.target.value)

colorSchemeInput.addEventListener("change", function() {
    colorScheme = colorSchemeInput.options[colorSchemeInput.selectedIndex].textContent.toLowerCase()
})

// Getting the data from 'The colors API'
generateBtn.addEventListener("click", function() {

    if (baseColor && colorScheme && numberOfColors) {
        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${colorScheme.toLowerCase()}&count=${numberOfColors}&format=json`)
        .then(res => res.json())
        .then(data => {
            renderColorPalette(data.colors)
        })
    } else if (baseColor && colorScheme){

        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${colorScheme.toLowerCase()}&format=json`)
        .then(res => res.json())
        .then(data => {
            renderColorPalette(data.colors)
        })
    } else if (baseColor) {

        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&format=json`)
        .then(res => res.json())
        .then(data => {
            renderColorPalette(data.colors)
        })
    } else {
        alert(`Something went wrong! Please try again later`)
    }
})

function renderColorPalette(palette) {
    colorPalette.innerHTML = ''
    colorPaletteValues.innerHTML = ''

    colorPalette.style.gridTemplateColumns = `repeat(${palette.length}, 1fr)`
    colorPaletteValues.style.gridTemplateColumns = `repeat(${palette.length}, 1fr)`
    
    for (let color of palette ) {
        renderColorBox(color)
        renderColorValueButton(color)
    } 
}

function renderColorBox(color) {

    const newColor = document.createElement('div')
    newColor.style.background = color.hex.value
    newColor.classList.add('color-box')
    newColor.dataset.color = color.hex.value
    colorPalette.appendChild(newColor)
}

function renderColorValueButton(color) {

    const newColorValue = document.createElement('button')
    newColorValue.innerHTML = `${color.hex.value} ${color.name.value}`
    newColorValue.classList.add('color-value', 'neumorphism-style')
    newColorValue.dataset.color = color.hex.value
    colorPaletteValues.appendChild(newColorValue)
}

function copyToClipboard(e, color) {
    navigator.clipboard.writeText(color)

    const tooltip = createTooltip(e.clientX, e.clientY, color)
    document.body.appendChild(tooltip)

    fadeOutTooltip(tooltip)
}

function createTooltip(clientX, clientY, color) {
    
    const tooltip = document.createElement("div")
    tooltip.textContent = `Copied ${color}`
    tooltip.classList.add("tooltip")
    
    tooltip.style.left = `${clientX - 80}px`
    tooltip.style.top = `${clientY - 20}px`

    return tooltip
}

function fadeOutTooltip(tooltip) {

    const fadeOutTime = 1500
    const fadeOutInterval = 50
    let opacity = 1

    const interval = setInterval(() => {
        opacity -= 1 / (fadeOutTime / fadeOutInterval)
        tooltip.style.opacity = opacity.toString()
        if (opacity <= 0) {
            document.body.removeChild(tooltip)
            clearInterval(interval)
        }
    }, fadeOutInterval)
}