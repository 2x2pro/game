 <html>
      #fullscreenButton {
    z-index: 20; /* Iframe के ऊपर बनाए रखने के लिए */
    position: absolute;
    top: 16px;
    right: 16px;
    background-color: #4a5568;
    padding: 10px;
    border-radius: 8px;
    color: white;
    cursor: pointer;
}

#fullscreenButton:hover {
    background-color: #2d3748;
}

#gameIframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1; /* Iframe को Fullscreen के नीचे रखने के लिए */
}

 </html>

<script>
document.getElementById("playButton").addEventListener("click", function () {
const gameIframe = document.getElementById("gameIframe");
gameIframe.classList.remove("hidden"); // Iframe को दिखाना
});

document.getElementById("fullscreenButton").addEventListener("click", function () {
let gameContainer = document.getElementById("gameContainer");

if (!document.fullscreenElement) {
gameContainer.requestFullscreen().then(() => {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(err => console.log(err));
    }
}).catch(err => console.log(`Error attempting to enable full-screen mode: ${err.message}`));
} else {
document.exitFullscreen();
}
});
</script>