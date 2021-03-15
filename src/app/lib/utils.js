const {format} = require("date-fns")

module.exports = {
	iso(timestamp){
		return format(timestamp, "yyyy-MM-dd")
	},

	date(timestamp){

		const date = new Date(timestamp)

		const day = `0${date.getDate()}`.slice(-2)
		const month = `0${date.getMonth() + 1}`.slice(-2)
		const hour = `${date.getHours()}`
		const minute = `0${date.getMinutes()}`.slice(-2)

		return {
			day,
			month,
			hour,
			minute,
		}
	}
}