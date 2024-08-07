setInterval(() => {
    fetch("http://46.98.9.75/data").then((r) => {r.text().then((d) => {document.getElementById("onlineText").innerHTML = "Игроков: " + d;});});
    fetch("http://46.98.9.75/prettyPlayers").then((r) => {r.text().then((d) => {document.getElementById("prettyPlayers").innerHTML = d;});});
    fetch("http://46.98.9.75/map").then((r) => {r.text().then((d) => {document.getElementById("serverMap").innerHTML = d;});});
}, 1000);