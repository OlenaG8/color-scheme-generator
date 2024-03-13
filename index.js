fetch ("https://www.thecolorapi.com")
    .then(res => res.json())
    .then(data => console.log(data))

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

renderColorSchemes()