var UploadImages = {
	uploadLimit: 5,
	imageGalleryPreview: document.querySelector(".image-gallery"),
	files: [],
	input: "",
    
	addImages(event){
		let {files: fileList} = event.target
		const {imageGalleryPreview, files} = UploadImages
		UploadImages.input = event.target
		
		if(UploadImages.hasLimit(event)) return
		
		Array.from(fileList).forEach(file => {
			
			files.push(file)

			const fileReader = new FileReader()

			fileReader.onload = () => {

				const image = new Image()

				image.src = String(fileReader.result)

				const div = UploadImages.photoDivConstructor(image)

				imageGalleryPreview.appendChild(div)

			}

			fileReader.readAsDataURL(file)
		})

		UploadImages.input.files = UploadImages.getAllFiles()
	},

	hasLimit(event){
		const {uploadLimit, imageGalleryPreview} = UploadImages
		const {files: fileList} = event.target

		if(fileList.length > uploadLimit){
			alert(`Adicione no máximo ${uploadLimit} fotos`)
			event.preventDefault()
			return true
		}

		const photosArray = []
		imageGalleryPreview.childNodes.forEach(photo => {
			if(photo.classList && photo.classList.contains("photo")){
				photosArray.push(photo)
			}
		})

		const totalPhotos = photosArray.length + fileList.length
        
		if(totalPhotos > uploadLimit){
			alert(`Adicione no máximo ${uploadLimit} fotos`)
			event.preventDefault()
			return true
		}

		return false
	},

	photoDivConstructor(image){

		const div = document.createElement("div")

		div.classList.add("photo")

		div.addEventListener("click", (e) => {
			UploadImages.removePhoto(e)
			UploadImages.removeOldPhoto(e)
		})

		const removeButton = UploadImages.getRemoveButton()

		div.appendChild(image)
		div.appendChild(removeButton)

		return div
	},

	getRemoveButton(){

		const removeButton = document.createElement("i")
		removeButton.classList.add("material-icons")
		removeButton.innerHTML = "delete"

		return removeButton
	},

	removePhoto(event){

		const {target} = event

		const photoDiv = target.parentNode

		const photosArray = Array.from(UploadImages.imageGalleryPreview.children)
		const index = photosArray.indexOf(photoDiv)

		UploadImages.files.splice(index, 1)
		UploadImages.input.files = UploadImages.getAllFiles()
        
		photoDiv.remove(index)
	},

	getAllFiles(){

		const{files} = UploadImages
		
		const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()
		
		files.forEach(file => {
			dataTransfer.items.add(file)
		})
		
		return dataTransfer.files

	},

	removeOldPhoto(event){

		const photoDiv = event.target.parentNode
        
		if(photoDiv.id){
			const inputHidden = document.querySelector("input[name=\"imageIndex\"]")
			inputHidden.value += `${photoDiv.id},`
		}

		photoDiv.remove()
	}
}

var ImageHighlight = {
	mainImage: document.querySelector("#imageHighlight"),
	allImages: document.querySelectorAll(".image-gallery img"),

	setImage(event){
		ImageHighlight.mainImage.src = event.target.src
		Lightbox.LightboxImage.src = event.target.src
        
		ImageHighlight.allImages.forEach(image => {
            
			if(image.classList.contains("active")){
				image.classList.remove("active")
			}
		})

		event.target.classList.add("active")
	}
}

var Lightbox = {
	lightboxContainer: document.querySelector(".lightbox-container"),
	LightboxImage: document.querySelector(".lightbox-container img"),

	open(){
        
		Lightbox.lightboxContainer.classList.add("active")
	},

	close(){
        
		Lightbox.lightboxContainer.classList.remove("active")
	}
}

var UploadChefImage = {
	uploadLimit: 1,
	imageGalleryPreview: document.querySelector(".image-gallery"),
	files: [],
	input: "",

	addImage(event){

		const {files: fileList} = event.target
		UploadChefImage.input = event.target

		if(UploadChefImage.hasLimit(event)){
			return
		}

		Array.from(fileList).forEach(file => {

			UploadChefImage.files.push(file)

			const reader = new FileReader()

			reader.onload = () => {

				const image = new Image()

				image.src = String(reader.result)

				const div = UploadChefImage.createDivPhoto(image)

				div.addEventListener("click", (e) => {
					UploadChefImage.deleteDivPhoto(e)
				})

				UploadChefImage.imageGalleryPreview.appendChild(div)

			}

			reader.readAsDataURL(file)
		})

		UploadChefImage.input.files = UploadChefImage.getFile()
	},

	createDivPhoto(image){
		const div = document.createElement("div")
		div.classList.add("chef-photo")

		const deleteButton = UploadChefImage.createRemoveButton()

		div.appendChild(image)
		div.appendChild(deleteButton)

		return div
	},

	hasLimit(event){

		const {files: fileList} = event.target
		const {uploadLimit} = UploadChefImage

		if(fileList.length > uploadLimit){
			alert(`Selecione no máximo ${UploadChefImage.uploadLimit} foto`)
			event.preventDefault()
			return true
		}

		const photosArray = []
		UploadChefImage.imageGalleryPreview.childNodes.forEach(photo => {
			if(photo.classList && photo.classList.contains("chef-photo")){
				photosArray.push(photo)
			}
		})
        
		const totalFiles = photosArray.length + fileList.length

		if(totalFiles > uploadLimit){
			alert(`Selecione no máximo ${UploadChefImage.uploadLimit} foto`)
			event.preventDefault()
			return true
		}

		return false
	},

	createRemoveButton(){

		const deleteButton = document.createElement("i")
		deleteButton.classList.add("material-icons")
		deleteButton.innerHTML = "delete"

		return deleteButton
	},

	deleteDivPhoto(event){
        
		const photoDiv = event.target.parentNode

		UploadChefImage.files.splice(0, 1)
		UploadChefImage.input.files = UploadChefImage.getFile()

		photoDiv.remove(0)
        
	},

	getFile(){

		const {files} = UploadChefImage

		const dataTransfer = new DataTransfer() || new ClipboardEvent("").clipboardData

		files.forEach(file => {
			dataTransfer.items.add(file)
		})

		return dataTransfer.files

	},

	removeOldPhoto(event){
        
		const photoDiv = event.target.parentNode
        
		if(photoDiv.id){
			const inputHidden = document.querySelector("input[name=removed_files]")

			inputHidden.value += `${photoDiv.id}`
		}

		photoDiv.remove()
        
	}

}