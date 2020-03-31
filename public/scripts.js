function onOFF() {
document
    .querySelector("#modal")
    .classList
    .toggle("hide")

document
    .querySelector("body")
    .classList
    .toggle("hideScroll")

document 
    .querySelector("#modal")
    .classList
    .toggle("addScroll")
}   

// validação 
function checkFields(event) {
    
    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]
  
    const isEmpty = valuesToCheck.find(function(value){
        // typeof verifica se a variavel é exatamente === string
        const checkifIsString =  typeof event.target[value].value === "string"
        // trim é para ver se existe spaçamentos
        const checkifIsEmpty = !event.target[value].value.trim()

        if(checkifIsString && checkifIsEmpty ) {
          return true
        }
    })

    // se estiver algum campo vazio pausa o evento do submit event.preventDefault() 
   if(isEmpty){
        event.preventDefault()
        alert("Por favor preencha todos os campos")
   }

}