const modal = document.querySelector('.modal')
const cards = document.querySelectorAll('.card')

for(let card of cards){
    card.addEventListener("click", function(){
        modal.classList.add('active')
        
        card_img = card.getElementsByTagName('img')[0].getAttribute('id')
        card_h4 = card.getElementsByTagName('h4')[0].textContent
        card_p = card.getElementsByTagName('p')[0].textContent

        console.log(card_img)
        modal.getElementsByTagName('img')[0].src = `assets/${card_img}.png`
        modal.getElementsByTagName('h4')[0].innerHTML = card_h4
        modal.getElementsByTagName('p')[0].innerHTML = card_p
    })

}

document.querySelector('.close-modal').addEventListener("click", function(){
    modal.classList.remove('active')
})



