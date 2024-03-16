const baseColorInput = document.getElementById("input-color")
let baseColor = baseColorInput.value.replace(/^#/, '')

const numberOfColorsInput = document.getElementById("color-count")
let numberOfColors = numberOfColorsInput.value

const colorSchemeInput = document.getElementById("color-scheme")
let colorScheme = '' 

const generateBtn = document.getElementById("generate-btn")

const colorPalette = document.getElementById("color-palette")
const colorPaletteValues = document.getElementById("color-palette-values")

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

    if (colorSchemesOptArr.length > 0) {
        colorSchemeInput.options[0].setAttribute('selected', 'selected')
        colorScheme = colorSchemeInput.options[0].textContent
    }
}

renderColorSchemes()

baseColorInput.addEventListener("change", e => baseColor = e.target.value.replace(/^#/, ''))
numberOfColorsInput.addEventListener("change", e => numberOfColors = e.target.value)
colorSchemeInput.addEventListener("change", function() {
    colorScheme = colorSchemeInput.options[colorSchemeInput.selectedIndex].textContent.toLowerCase()
})

generateBtn.addEventListener("click", function() {
    console.log(baseColor)
    console.log(numberOfColors)
    console.log(colorScheme)

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
    
    for (let color of palette ) {

        console.log(color)
        const newColor = document.createElement('div')
        newColor.style.background = color.hex.value
        newColor.classList.add("color-box")

        colorPalette.style.gridTemplateColumns = `repeat(${palette.length}, 1fr)`
        colorPalette.appendChild(newColor)

        const newColorValue = document.createElement('button')
        newColorValue.innerHTML = color.hex.value + " " + color.name.value
        newColorValue.classList.add("color-value")
        newColorValue.classList.add("neumorphism-style")

        colorPaletteValues.style.gridTemplateColumns = `repeat(${palette.length}, 1fr)`
        colorPaletteValues.appendChild(newColorValue)
    }
    
}