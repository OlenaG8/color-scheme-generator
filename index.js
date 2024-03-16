const baseColorInput = document.getElementById("input-color")
let baseColor = baseColorInput.value.replace(/^#/, '')

const numberOfColorsInput = document.getElementById("color-count")
let numberOfColors = numberOfColorsInput.value

const colorSchemeInput = document.getElementById("color-scheme")
let colorScheme = '' 

const generateBtn = document.getElementById("generate-btn")

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

baseColorInput.addEventListener("change", e => baseColor = e.target.value)
numberOfColorsInput.addEventListener("change", e => numberOfColors = e.target.value)
colorSchemeInput.addEventListener("change", function() {
    colorScheme = colorSchemeInput.options[colorSchemeInput.selectedIndex].textContent.toLowerCase()
})

generateBtn.addEventListener("click", function() {
    console.log(baseColor)
    console.log(numberOfColors)
    console.log(colorScheme)

    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${colorScheme.toLocaleLowerCase()}&count=${numberOfColors}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
})
