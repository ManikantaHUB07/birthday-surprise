// ===============================
// Moonlight Birthday Surprise
// Stage 1 Script
// ===============================

// Elements
const stars = document.getElementById("stars");
const typingText = document.getElementById("typingText");
const progressBar = document.getElementById("progressBar");
const loadingPercent = document.getElementById("loadingPercent");

const loadingScreen = document.getElementById("loadingScreen");
const pinScreen = document.getElementById("pinScreen");

// -------------------------------
// Create Stars
// -------------------------------

for (let i = 0; i < 220; i++) {

    const star = document.createElement("div");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";

    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 3 + "s";

    stars.appendChild(star);

}

// -------------------------------
// Typewriter
// -------------------------------

const message = "Preparing Something Special... ❤️";

let charIndex = 0;

function typeWriter() {

    if (charIndex < message.length) {

        typingText.innerHTML += message.charAt(charIndex);

        charIndex++;

        setTimeout(typeWriter, 70);

    }

}

typeWriter();

// -------------------------------
// Loading Animation
// -------------------------------

let progress = 0;

const loader = setInterval(() => {

    progress++;

    progressBar.style.width = progress + "%";

    loadingPercent.innerHTML = progress + "%";

    if (progress >= 100) {

        clearInterval(loader);

        gsap.to("#loadingScreen", {

            opacity: 0,

            duration: 1,

            onComplete: () => {

                loadingScreen.classList.remove("active");

                pinScreen.classList.add("active");

                gsap.from("#pinScreen", {

                    opacity: 0,

                    scale: 0.9,

                    duration: 1

                });

            }

        });

    }

}, 50);
// ==========================================
// PIN SCREEN
// ==========================================

const CORRECT_PIN = "1707";

let enteredPin = "";

const dots = document.querySelectorAll(".dot");

const keys = document.querySelectorAll(".key");

const clearKey = document.getElementById("clearKey");

const okKey = document.getElementById("okKey");

const pinError = document.getElementById("pinError");

const pinCard = document.querySelector(".pinCard");

// ----------------------------

function updateDots(){

    dots.forEach((dot,index)=>{

        if(index < enteredPin.length){

            dot.classList.add("active");

        }else{

            dot.classList.remove("active");

        }

    });

}

// ----------------------------

keys.forEach(button=>{

    button.onclick=function(){

        if(enteredPin.length>=4)return;

        enteredPin += button.innerText;

        updateDots();

    }

});

// ----------------------------

clearKey.onclick=function(){

    enteredPin=enteredPin.slice(0,-1);

    updateDots();

}

// ----------------------------

okKey.onclick=function(){

    if(enteredPin===CORRECT_PIN){

        unlockAnimation();

    }

    else{

        wrongPin();

    }

}
function wrongPin(){

    pinError.innerHTML="Wrong PIN ❤️";

    gsap.fromTo(

        ".pinCard",

        {

            x:-10

        },

        {

            x:10,

            repeat:5,

            yoyo:true,

            duration:.05,

            onComplete(){

                gsap.set(".pinCard",{x:0});

            }

        }

    );

    enteredPin="";

    updateDots();

}
function unlockAnimation(){

    pinError.innerHTML="";

    gsap.to(".pinCard",{

        scale:1.08,

        duration:.3

    });

    gsap.to(".pinCard",{

        opacity:0,

        duration:.8,

        delay:.4,

        onComplete(){

            document.getElementById("pinScreen").classList.remove("active");

            document.getElementById("welcomeScreen").classList.add("active");

            gsap.to("#magicScroll",{

                scale:1,

                opacity:1,

                duration:1.4,

                ease:"back.out(1.8)"

            });

            startWelcomeTyping();

        }


    });


}

// ============================
// WELCOME SCREEN
// ============================

const welcomeMessage =
    "Today isn't just another day... 🌙\n\nIt's a celebration of your beautiful smile, your kindness, and the happiness you bring to everyone around you. ❤️\n\nI made this little surprise especially for you.\n\nI hope it makes you smile. ✨";

const welcomeText = document.getElementById("welcomeText");

let welcomeIndex = 0;

function startWelcomeTyping(){

    welcomeText.innerHTML="";

    welcomeIndex=0;

    typeWelcome();

}
function typeWelcome(){

    if(welcomeIndex < welcomeMessage.length){

        welcomeText.innerHTML += welcomeMessage.charAt(welcomeIndex);

        welcomeIndex++;

        setTimeout(typeWelcome,30);

    }

    else{

        gsap.from("#beginJourney",{

            scale:0,

            duration:.7,

            ease:"back.out(1.8)"

        });

    }

}
document.getElementById("beginJourney").onclick=function(){

    document.getElementById("welcomeScreen").classList.remove("active");

    document.getElementById("countdownScreen").classList.add("active");

    gsap.from(".countdownCard",{

        opacity:0,

        y:80,

        duration:1

    });

};
// ============================
// COUNTDOWN
// ============================

const targetDate = new Date(2026, 6, 17, 0, 0, 0);

function updateCountdown() {

    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        document.getElementById("continueGame").style.display = "inline-block";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);

// ============================
// CONTINUE BUTTON
// ============================

document.getElementById("continueGame").addEventListener("click", function () {

    document.getElementById("countdownScreen").classList.remove("active");

    document.getElementById("heartGameScreen").classList.add("active");

    startHeartGame();

});//=============================
// HEART GAME
//=============================

const heartMessages = [

    "🌸 Your smile makes every day brighter.",

    "❤️ You are truly one of a kind.",

    "✨ Every moment is filled with thoughts of you.",

    "💖 My heart quietly chooses you.",

    "🌙 I never get tired of admiring you.",

    "🌹  You stole my attention..",

    "💫 Thank you for being amazing.",

    "🥰 You make life beautiful.",

    "💕  You're one in a million.",

    "🎂 Happy Birthday, my favorite person. ❤️"

];


const heartArea = document.getElementById("heartArea");

const score = document.getElementById("scoreBoard");

const heartMessage = document.getElementById("heartMessage");


let totalHearts = 10;

let collected = 0;


// Start Game

function startHeartGame(){

    collected = 0;

    score.innerHTML = "0 / 10";

    heartMessage.innerHTML = "";

    heartArea.innerHTML = "";

    createHeart();

}



// Create Heart

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "magicHeart";


    // Last heart golden

    if(collected === 9){

        heart.innerHTML = "💛";

    }

    else{

        heart.innerHTML = "❤️";

    }


    heart.style.left = Math.random()*75 + 10 + "%";

    heart.style.top = Math.random()*60 + 20 + "%";


    heartArea.appendChild(heart);



    // Golden heart movement

    if(collected === 9){

        setInterval(()=>{

            gsap.to(heart,{

                left:Math.random()*75 + 10 + "%",

                top:Math.random()*60 + 20 + "%",

                duration:1

            });

        },1200);

    }



    heart.onclick=function(){


        // Show message

        heartMessage.innerHTML = heartMessages[collected];


        gsap.fromTo(
            "#heartMessage",
            {
                opacity:0,
                y:20
            },
            {
                opacity:1,
                y:0,
                duration:.5
            }
        );


        // Remove heart

        heart.remove();


        collected++;


        score.innerHTML = collected + " / 10";



        if(collected < totalHearts){

            setTimeout(createHeart,1000);

        }

        else{

            setTimeout(showGift,1500);

        }

    }


}



// Gift

function showGift(){

    document.getElementById("heartGameScreen").classList.remove("active");

    document.getElementById("cakeScreen").classList.add("active");

    gsap.from(".cakeContainer",{

        scale:0.5,

        opacity:0,

        duration:1

    });

}
//=============================
// GIFT + CAKE
//=============================


const giftBox=document.getElementById("giftBox");

const cakeArea=document.getElementById("cakeArea");

const giftText=document.getElementById("giftText");


giftBox.onclick=function(){


    gsap.to(giftBox,{

        scale:1.5,

        rotation:360,

        duration:1,

        onComplete(){


            giftBox.style.display="none";


            giftText.innerHTML="A special surprise for you 🎂";


            cakeArea.style.display="block";


            gsap.from("#cakeEmoji",{

                y:300,

                opacity:0,

                duration:1

            });


        }

    });


};
//=============================
// BLOW CANDLES
//=============================


const blowButton = document.getElementById("blowButton");

const candles = document.getElementById("candles");

const smoke = document.getElementById("smoke");

const birthdayWish = document.getElementById("birthdayWish");




blowButton.onclick=function(){


    // candles off

    candles.innerHTML="";


    // smoke

    smoke.style.display="block";


    // confetti

    confetti({

        particleCount:150,

        spread:120,

        origin:{
            y:0.6
        }

    });



    // hide button

    blowButton.style.display="none";



    // Birthday message

    gsap.fromTo(

        birthdayWish,

        {

            scale:0,

            opacity:0

        },

        {

            scale:1,

            opacity:1,

            duration:1,

            delay:.5

        }

    );


    birthdayWish.style.display="block";



    // show letter button

    setTimeout(()=>{

        letterButton.style.display="inline-block";


        gsap.from(letterButton,{

            scale:0,

            duration:.7

        });


    },2000);



};
//=============================
// LETTER SCREEN
//=============================


const letterButton =
    document.getElementById("letterButton");


const envelope =
    document.getElementById("envelope");


const paper =
    document.getElementById("letterPaper");


const letterText =
    document.getElementById("letterText");



letterButton.onclick=function(){


    document.getElementById("cakeScreen")
        .classList.remove("active");


    document.getElementById("letterScreen")
        .classList.add("active");



    gsap.from("#envelope",{

        scale:0,

        duration:1

    });


};



const finalMessage = `❤️ One Last Message...

Before this little journey comes to an end, there's something I've wanted to say...

You may never know how much your smile can brighten someone's day, or how your happiness can quietly become someone else's reason to smile.

This surprise wasn't made to expect anything in return. It was simply made because today is your special day, and I wanted to make it a little more memorable.

Life is full of unexpected moments, and people often come and go. But some people leave a mark on our hearts without even realizing it. You're one of those people.

I sincerely hope life blesses you with every happiness you've ever wished for, every success you've worked so hard to achieve, and countless beautiful memories that make you smile for years to come.

If, one day, you happen to remember this little surprise and smile, then every moment spent creating it will have been completely worth it.

Please keep smiling, keep believing in yourself, keep chasing your dreams, and never stop being the wonderful person you are.

No matter where life takes us, I'll always be quietly cheering for your happiness and wishing the very best for you—from the bottom of my heart.

Happy Birthday! 💞

May this new chapter of your life be filled with endless joy, laughter, good health, success, unforgettable memories, and people who truly value you.

Thank you for taking this little journey.

Take care❤️‍🩹... keep smiling... and stay happy, always. ❤️`;



envelope.onclick=function(){


    envelope.style.display="none";


    paper.style.display="block";


    gsap.from("#paper",{

        y:100,

        opacity:0,

        duration:1

    });



    let i=0;


    function typeLetter(){


        if(i<finalMessage.length){


            letterText.innerHTML += finalMessage.charAt(i);


            i++;


            setTimeout(typeLetter,40);


        }


    }


    typeLetter();


};
document.getElementById("watchAgain").onclick=function(){

    location.reload();

}
function launchFireworks() {

    const duration = 5000;

    const end = Date.now() + duration;

    (function frame() {

        confetti({
            particleCount: 6,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 6,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });

        confetti({
            particleCount: 8,
            spread: 100,
            origin: {
                x: Math.random(),
                y: Math.random() * 0.6
            }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }

    })();

    // 🎆 Final blast after the show
    setTimeout(() => {

        confetti({
            particleCount: 400,
            spread: 360,
            startVelocity: 50,
            origin: {
                x: 0.5,
                y: 0.5
            }
        });

    }, duration);

}