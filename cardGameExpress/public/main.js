const cards = document.querySelectorAll('.card')
cards.forEach(card => card.addEventListener('click', flipCard))
document.querySelector('#reset').addEventListener('click', resetGame)
let firstCardElement = null
var flipSound = document.getElementById("flip");
flipSound.loop = false
var winSound = document.getElementById("win");
winSound.loop = false

function flipCard(event) {
    flipSound.play()

    if (event.target.classList.contains('matched') || event.target.classList.contains('flipped')) {
        return //don't do anything -- it also means exit the function
    }
    if (firstCardElement == null) {
        firstCardElement = event.target.closest('.card')
        firstCardElement.classList.add('flipped')
    }
    else {

        event.target.closest('.card').classList.add('flipped')
        setTimeout(checkMatch, 700)
        firstCardElement = null
    }
}

function checkMatch() {
    let image1 = document.querySelectorAll('.flipped > img:not(.backCard)')[0]
    let image2 = document.querySelectorAll('.flipped > img:not(.backCard)')[1]
    let card1 = image1.parentNode
    let card2 = image2.parentNode
    card1.classList.remove('flipped')
    card2.classList.remove('flipped')
    if (image1.src === image2.src) {
        card1.classList.add('matched')
        card2.classList.add('matched')
        checkWin()
    }
}

function checkWin() {
    //5 matches equals one game win
    if (document.querySelectorAll('.matched').length === document.querySelectorAll('.card').length) {
        winSound.play()
        confirm('oh no! game over')
        resetGame()
    }
}

function resetGame() {
    winSound.play()

    let picArray = [
        "pic1.jpg",
        "pic2.jpg",
        "pic3.jpg",
        "pic4.jpg",
        "pic5.jpg",
        "pic1.jpg",
        "pic2.jpg",
        "pic3.jpg",
        "pic4.jpg",
        "pic5.jpg",
    ]

    Array.from(document.querySelectorAll('.card img:not(.backCard)')).forEach(img => img.src = "")
    for (let i = 0; i < 10; i++) {
        let emptyCards = document.querySelectorAll('img[src=""]')
        let randomCard = Math.floor(Math.random() * emptyCards.length)
        emptyCards[randomCard].parentNode.classList.remove('flipped', 'matched')
        emptyCards[randomCard].src = picArray[i]
    }
}

resetGame()