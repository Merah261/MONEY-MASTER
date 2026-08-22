/* =========================================
   MONEY MASTER
   Main Game Interface
========================================= */


/* =========================
   ELEMENTS
========================= */

const homeScreen =
    document.getElementById("homeScreen");

const loadingScreen =
    document.getElementById("loadingScreen");

const playButton =
    document.getElementById("playButton");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const loadingMessage =
    document.getElementById("loadingMessage");

const moneyRain =
    document.getElementById("moneyRain");


/* =========================
   MONEY RAIN
========================= */

function createMoney() {

    const money = document.createElement("div");

    money.classList.add("money");

    money.innerHTML = "$100";

    /*
        Random horizontal position
    */

    money.style.left =
        Math.random() * 100 + "vw";


    /*
        Random size
    */

    const size =
        0.65 + Math.random() * 0.6;

    money.style.transform =
        `scale(${size})`;


    /*
        Random falling speed
    */

    const duration =
        4 + Math.random() * 5;

    money.style.animationDuration =
        duration + "s";


    /*
        Random rotation
    */

    money.style.animationDelay =
        Math.random() * 1.5 + "s";


    moneyRain.appendChild(money);


    /*
        Remove after animation
    */

    setTimeout(() => {

        money.remove();

    }, (duration + 2) * 1000);
}


/*
    Create money continuously
*/

setInterval(createMoney, 450);


/*
    Initial money
*/

for (let i = 0; i < 12; i++) {

    setTimeout(
        createMoney,
        i * 250
    );
}


/* =========================
   PLAY BUTTON
========================= */

playButton.addEventListener(
    "click",
    startGame
);


/* =========================
   START GAME
========================= */

function startGame() {

    /*
        Disable button
        to prevent double clicks
    */

    playButton.disabled = true;


    /*
        Small button animation
    */

    playButton.style.transform =
        "scale(0.96)";


    /*
        Hide home screen
    */

    setTimeout(() => {

        homeScreen.classList.add("hidden");

    }, 150);


    /*
        Show loading screen
    */

    setTimeout(() => {

        loadingScreen.classList.remove("hidden");

        startLoading();

    }, 500);
}


/* =========================
   LOADING
========================= */

function startLoading() {

    let progress = 0;


    /*
        Loading messages
    */

    const messages = [

        "Préparation de votre fortune",

        "Chargement de votre empire",

        "Recherche de billets...",

        "Ouverture du coffre",

        "Presque prêt...",

        "Bienvenue, Money Master !"

    ];


    /*
        Change message
        during loading
    */

    const messageInterval =
        setInterval(() => {

            const index =
                Math.min(
                    Math.floor(progress / 20),
                    messages.length - 1
                );

            loadingMessage.textContent =
                messages[index];

        }, 500);


    /*
        Progress animation
    */

    const loadingInterval =
        setInterval(() => {

            /*
                Increase progress
            */

            progress +=
                Math.random() * 3 + 1;


            /*
                Never exceed 100
            */

            if (progress >= 100) {

                progress = 100;

            }


            /*
                Update bar
            */

            progressBar.style.width =
                progress + "%";


            /*
                Update percentage
            */

            progressText.textContent =
                Math.floor(progress) + "%";


            /*
                Finished
            */

            if (progress >= 100) {

                clearInterval(loadingInterval);

                clearInterval(messageInterval);

                loadingFinished();

            }

        }, 100);

}


/* =========================
   LOADING FINISHED
========================= */

function loadingFinished() {

    loadingMessage.textContent =
        "Votre fortune est prête !";


    progressText.textContent =
        "100%";


    /*
        Wait before entering
        the actual game.
    */

    setTimeout(() => {

        /*
            TEMPORARY:
            For now show a message.

            Later we replace this
            with the real game screen.
        */

        showGameComingSoon();

    }, 900);

}


/* =========================
   TEMPORARY GAME SCREEN
========================= */

function showGameComingSoon() {

    loadingScreen.innerHTML = `

        <div
            style="
                position:relative;
                z-index:100;
                text-align:center;
                padding:30px;
            "
        >

            <div
                style="
                    font-size:70px;
                    margin-bottom:20px;
                "
            >
                💰
            </div>

            <h1
                style="
                    font-size:38px;
                    margin-bottom:12px;
                "
            >
                MONEY MASTER
            </h1>

            <p
                style="
                    color:#bfffc9;
                    font-size:17px;
                "
            >
                Le jeu arrive bientôt...
            </p>

        </div>

    `;

}
