var Validate = {

	apply(input, func){

		Validate.cleanError(input)

		const validate = Validate[func](input)
		
		if(validate.error){
			Validate.createError(input, validate.error)
		}
	},

	isEmail(input){

		const email = input.value
		let error = ""

		const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

		if(!email.match(emailValidation)){
			error =  "Não é um endereço de email válido."
		}

		return {
			email,
			error
		}
	},

	createError(input, error){
        
		const parentDiv = input.parentNode

		const div = document.createElement("div")
		div.classList.add("error")
		div.innerHTML = error

		
		parentDiv.appendChild(div)
		input.focus()
		
		input.style.border = "1px solid #DC4747"
	},

	cleanError(input){

		const errorDiv = input.parentNode.querySelector(".error")

		
		if(errorDiv){
			errorDiv.remove()
		}
		
		input.style.border = "1px solid #DDDDDD"
	}
}