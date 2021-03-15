var ShowMessage = {
	messageError: document.querySelector(".messages"),

	animation(){
        
		ShowMessage.showMessage()

		setTimeout(() => {
			ShowMessage.hiddeMessage()
		}, 5000)

	},

	showMessage(){

		const {messageError} = ShowMessage

		if(messageError){
			messageError.style.top = "-100px"
			messageError.style.opacity = "0"
			messageError.style.animation = "showMessage .4s ease-in forwards"
		}

	},

	hiddeMessage(){

		const {messageError} = ShowMessage

		if(messageError){
			messageError.style.top = ".8rem"
			messageError.style.opacity = "1"
			messageError.style.animation = ""
		}
	}
}

ShowMessage.animation()