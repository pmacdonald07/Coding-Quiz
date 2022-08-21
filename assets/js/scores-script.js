function loadHighScores () {
    highScores = localStorage.getItem("scores");
    highScores = JSON.parse(highScores);

    for (i = 0; i < highScores.length; i++) {
        var listItemEl = document.createElement("li");
        listItemEl.className = "score-list-item";
        listItemEl.textContent = highScores[i].initials + " " + highScores[i].score;
        document.querySelector(".score-list").appendChild(listItemEl);
    }
}

function clearScores() {
    localStorage.clear();
    location.reload();
}

document.getElementById("clear-scores").addEventListener("click", clearScores);

loadHighScores();