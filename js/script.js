// Original Author: Asiapot
// This code is licensed under the MIT license.

let serverIP = "asiapot.club";

let infoElem = document.getElementById("server__info");
let ipElem = document.getElementById("server__ip");
let motdElem = document.getElementById("server__motd");
let motdSubElem = document.getElementById("server__submotd");
let statusElem = document.getElementById("server__status");
let versionElem = document.getElementById("server__version");

ipElem.innerText = serverIP;


let updateDetails = (result) => {
    if (result.online) {
        statusElem.innerText = "Online";

        statusElem.classList.remove("off");
        statusElem.classList.add("on");

        infoElem.innerText = result.players.online + " " + (result.players.online == 1 ? "player" : "players") + " online";
        ipElem.innerText = serverIP;

        versionElem.innerText = result.version;
        motdElem.innerText = result.motd.clean[0];
        motdSubElem.innerText = result.motd.clean[1];
    }
    else {
        statusElem.innerText = "Server Offline";

        statusElem.classList.remove("on");
        statusElem.classList.add("off");

        infoElem.innerText = "Default IP:";
        ipElem.innerText = serverIP;

        versionElem.innerText = "1.21.0";
        motdElem.innerText = "Asiapot";
    }
};


ipElem.addEventListener("click", () => {
    navigator.clipboard.writeText(serverIP);

    ipElem.innerText = "\uD83D\uDCCB Copied!";
    setTimeout(() => {
        ipElem.innerText = serverIP;
    }, 1000);
});


let fetchDetails = () => {
    fetch("https://api.mcsrvstat.us/bedrock/3/" + serverIP)
        .then(response => response.json())
        .then(data => updateDetails(data));
}
fetchDetails();

window.setInterval(fetchDetails(), 30000);
