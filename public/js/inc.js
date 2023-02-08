const html = document.querySelector('html')


let container = document.querySelector('.container')
let scoreContainer = document.querySelector('#scoreContainer')
let randArray = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let box = document.querySelectorAll('.box')
boxArray = Array.from(box)
const round = Math.round, floor = Math.floor, random = Math.random
let player = {}
player.playerid = "Player-" + round(floor(random() * 100 * 100 * 100)).toString()

/*
const gameAudio = new Audio('sounds/music.mp3');
gameAudio.loop = true;
html.addEventListener('click', function (event) {

    gameAudio.play();
})
*/
async function sleepMilliSecond(milliseconds) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("...done!"), milliseconds)
    });
    console.log("go..."); // 
    let result = await promise; // wait until the promise resolves (*)
    console.log("done!"); // "done!"
}
async function sleep(milliseconds, obj) {
    await sleepMilliSecond(milliseconds);
    obj.innerHTML = ``
}




container.addEventListener('mousedown', function (event) {

    let obj = event.target
    let style = getComputedStyle(obj)
    const className = event.target.className
    let score = document.querySelector(`#${player.playerid}`)
    let scorePlaceholder = score.querySelector('.playerScore')
    score = parseInt(score.getAttribute('data-score'))

    if (className.includes('showmole')) {
        const smashAudio = new Audio('sounds/smash.mp3');
        smashAudio.play();
        console.log("smashed !")
        // update score
        let s = score + 1
        scorePlaceholder.innerHTML = s

        //emit message, doc says bad practice ot stringify,but need this if spread used used
        socket.emit('score message', JSON.stringify({ ...player, 'score': s }))

        //insert image
        obj.innerHTML = `<img src="images/mole3.png" width="100">`
        // wait 100milliseconds then remove image
        sleep(400, obj)

    } else {
        const missAudio = new Audio('sounds/miss.mp3');
        missAudio.play();
        console.log("missed !")
    }

    html.style.cursor = "url(images/iconHammer45.png) 2 2, pointer";
})

container.addEventListener('mouseup', function (event) {
    html.style.cursor = "url(images/iconHammer.png) 2 2, pointer";
})