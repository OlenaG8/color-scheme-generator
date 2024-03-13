const baseColorInput = document.getElementById("input-color")
let baseColor = baseColorInput.value

const generateBtn = document.getElementById("generate-btn")

const colorSchemesOptArr = [ 
    "Monochrome", "Monochrome-dark", "Monochrome-light", 
    "Analogic", "Complement", "Analogic-complement", 
    "Triad", "Quad"
]

function renderColorSchemes() {

    colorSchemesOptArr.map(
        function(color){
        document.getElementById("color-scheme").innerHTML += `
        <option class="scheme-opt" value="${color}">${color}</option>`
    }).join('')

}

baseColorInput.addEventListener("change", e => baseColor = e.target.value)

generateBtn.addEventListener("click", function(){
    console.log(baseColor)
    const colorScheme = document.getElementById("color-scheme").value 

    // Hex value is supossed to be put in the url without # - to fix
    
    if (baseColor && colorScheme) {
        fetch(`https://www.thecolorapi.com//scheme?hex=${baseColor}&mode=triad&count=6`)
            .then(res => res.json())
            .then(data => {
                console.log(data.colors)
            })
    } else if (baseColor) {
        fetch(`https://www.thecolorapi.com/?hex=${baseColor}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.colors)
            })
    } else { alert("Nope") }
})

renderColorSchemes()