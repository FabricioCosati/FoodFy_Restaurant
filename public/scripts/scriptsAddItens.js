
function addIngredient(){

    const ingredients = document.getElementById('ingredients')
    const fieldContainer = document.querySelectorAll('.ingredient')

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
    
    if(newField.children[0].value == ""){
        return false
    }
    
    newField.children[0].value = ""

    ingredients.appendChild(newField)
}

document.querySelector('.add-ingredients').addEventListener("click", addIngredient)

function removeIngredient(e){

    const fieldContainer = document.querySelectorAll('.ingredient')

    const element = e.target.parentElement
    const parentElement = e.target.parentElement.parentElement

    if(fieldContainer.length > 1){
        parentElement.removeChild(element)
    }
    else{
        return false
    }
}

function addPreparation(){

    const preparations = document.getElementById('preparations')
    const fieldContainer = document.querySelectorAll('.preparation')

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)
    
    if(newField.children[0].value == ""){
        return false
    }
    
    newField.children[0].value = ""

    preparations.appendChild(newField)
}

document.querySelector('.add-preparation').addEventListener("click", addPreparation)

function removePreparation(e){

    const fieldContainer = document.querySelectorAll('.preparation')

    const element = e.target.parentElement
    const parentElement = e.target.parentElement.parentElement

    if(fieldContainer.length > 1){
        parentElement.removeChild(element)
    }
    else{
        return false
    }
}

