
const $ = id => document.getElementById(id);

// SAUVEGARDE
let level = Number(localStorage.getItem("infini_level")) || 1;
let coins = Number(localStorage.getItem("infini_coins")) || 0;
let fails = Number(localStorage.getItem("infini_fails")) || 0;
let progress = Number(localStorage.getItem("infini_progress")) || 0;

let jumps = 0;
let jumping = false;

// MISSIONS ABSURDES
const missions = [
    "Trouve la sortie (elle a déménagé).",
    "Bats le mur. Il a un avocat.",
    "Collecte 12 chaussettes imaginaires.",
    "Convaincs le vide de te laisser passer.",
    "Trouve le bouton qui n'existe pas.",
    "Survis à une réunion avec un grille-pain.",
    "Fais un high-five à une ombre."
];

// CITATIONS
const quotes = [
    "« Si tu ne peux pas gagner, augmente la difficulté. »",
    "« Chaque pas te rapproche. Sauf les pas en arrière. »",
    "« Le succès est au bout du tunnel. Le tunnel est en travaux. »",
    "« N'abandonne jamais. Le jeu continue. »",
    "« La persévérance est une qualité. Le jeu en abuse. »"
];

const obstacles = [
    "🧱", "🦆", "🛒", "🗿", "🧀",
    "🚧", "🐸", "🪑", "📦"
];

// OBJECTIF QUI AUGMENTE SANS FIN
function targetScore() {
    return Math.floor(1000000 * Math.pow(1.7, level - 1));
}

// SAUVEGARDE
function save() {
    localStorage.setItem("infini_level", level);
    localStorage.setItem("infini_coins", coins);
    localStorage.setItem("infini_fails", fails);
    localStorage.setItem("infini_progress", progress);
}

// ACTUALISATION
function render() {

    $("level").textContent = level;
    $("levelTag").textContent = level;

    $("coins").textContent = coins;
    $("fails").textContent = fails;

    $("target").textContent =
        targetScore().toLocaleString("fr-FR");

    const shown = Math.min(99.99, progress);

    $("progressText").textContent =
        shown.toFixed(2) + "%";

    $("progressFill").style.width =
        Math.min(100, shown) + "%";

    $("mission").textContent =
        missions[(level - 1) % missions.length];

    $("quote").textContent =
        quotes[Math.floor(Math.random() * quotes.length)];

    if (progress > 95) {
        $("progressNote").textContent =
            "OH ?! TU Y ES PRESQUE… ah non, la fin vient de reculer.";
    } else {
        $("progressNote").textContent =
            "La fin est à seulement… quelque part.";
    }
}

// MESSAGE
function say(text) {
    $("message").textContent = text;
}

// SAUT
function jump() {

    if (jumping) return;

    jumping = true;
    jumps++;

    $("player").style.bottom = "112px";

    $("arenaCaption").textContent =
        "SAUT N°" + jumps + " — QUELLE PERFORMANCE.";

    const messages = [
        "Magnifique saut. Le mur est toujours là.",
        "Tu as défié la gravité. Elle s'en remettra.",
        "+0,0001% de respect de la part du mur.",
        "Le mur a esquivé. C'est personnel."
    ];

    say(messages[Math.floor(Math.random() * messages.length)]);

    setTimeout(() => {

        $("player").style.bottom = "32px";
        jumping = false;

    }, 260);

    progress += Math.random() * 0.015;

    if (progress >= 99.99) {

        progress = 0;
        level++;
        fails++;

        $("obstacle").textContent =
            obstacles[Math.floor(Math.random() * obstacles.length)];

        say(
            "NIVEAU " + level +
            " ! La ligne d'arrivée était un hologramme."
        );
    }

    save();
    render();
}

// PIÈCES
function collectCoin() {

    coins++;
    progress += 0.002;

    const messages = [
        "Une pièce ! Tu peux maintenant acheter… absolument rien.",
        "Fortune estimée : toujours pas assez pour soudoyer le jeu.",
        "La pièce est virtuelle. Comme tes chances de finir.",
        "Bravo. Le capitalisme est fier de toi."
    ];

    say(messages[Math.floor(Math.random() * messages.length)]);

    if (coins % 10 === 0) {

        fails++;

        say(
            "10 pièces ! Récompense : le jeu devient encore plus long."
        );
    }

    save();
    render();
}

// COMMANDES
$("actionButton").addEventListener("click", jump);

$("coinButton").addEventListener("click", collectCoin);

$("arena").addEventListener("click", jump);

document.addEventListener("keydown", e => {

    if (e.code === "Space" || e.code === "ArrowUp") {

        e.preventDefault();
        jump();

    }

});

// INITIALISATION
$("obstacle").textContent =
    obstacles[(level - 1) % obstacles.length];

render();
