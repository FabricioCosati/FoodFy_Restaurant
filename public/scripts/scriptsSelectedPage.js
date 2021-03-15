const currentPage = window.location.pathname
const pages = document.querySelectorAll(".nav-text-container li.nav-list > a")

for(let page of pages){
	if(page.href.includes("/profile") && currentPage.includes("/user")){
		page.style.color = "white"
	}
    
	if(currentPage.includes(page.getAttribute("href"))){
		page.style.color = "white"
	}
}