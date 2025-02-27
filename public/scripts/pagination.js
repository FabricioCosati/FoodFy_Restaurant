function paginate(selectedPage, totalPages){

	let pages = [],
		oldPage = 0

	for(let currentPage = 1; currentPage <= totalPages; currentPage++){
        
		const firstAndLastPage = currentPage == 1 || currentPage == 2 || currentPage == totalPages - 1 || currentPage == totalPages,
			pagesAfter = currentPage <= selectedPage + 2,
			pagesBefore = currentPage >= selectedPage - 2    

		if(firstAndLastPage || pagesAfter && pagesBefore){
			if(oldPage && currentPage - oldPage > 2){
				pages.push("...")
			} 
			else if(oldPage && currentPage - oldPage == 2){
				pages.push(oldPage + 1)
			}

			pages.push(currentPage)
			oldPage = currentPage
		}
	}
	return pages
}

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const filter = pagination.dataset.filter

const pages = paginate(page, total)
let elements = ""

for(let page of pages){
	if(String(page).includes("...")){
		elements += `<span>${page}</span>`
	}
	else{
		if(filter){
			elements += `<a href="?page=${+page}&filter=${filter}">${page}</a>`
		}
		else{
			elements += `<a href="?page=${+page}">${page}</a>`
		}
	}
}

pagination.innerHTML = elements
