const multer = require("multer")

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/images")
	},
	filename: (req, file, cb) => {
		const name = `${String(Date.now())}-${file.originalname}`
		cb(null, name)
	}
})

const fileFilter = (req, file, cb) => {
	const acceptImages = ["image/png", "image/jpeg", "image/jpg"]

	if(acceptImages.find(image => image == file.mimetype)){
		return cb(null, true)
	}
	else{
		return cb(null, false)
	}
}

module.exports = multer({
	storage,
	fileFilter
})