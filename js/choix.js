const button = document.querySelector("button")
const input = document.querySelectorAll("input")
const pError = document.querySelector("p")
let inputValue = [];

button.addEventListener("click", () => {
    input.forEach((input) => {
        if (isNaN(input.value) || input.value === "") {
            pError.innerText = "L'un des champs ne contient pas un nombre ou est vide"
        } else {
            inputValue.push(parseInt(input.value, 10))
        }
    })
    if (inputValue.length === 2) {
        console.log(inputValue[0]);
        document.location = `./index.html?nombre=${inputValue[0]}&taille=${inputValue[1]}`
    } else {
        inputValue = []
    }
})