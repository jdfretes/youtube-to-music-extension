chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active && tab.url.includes('https://www.youtube.com/watch?v=')) {
        console.log("url: ", tab.url)
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: functionToAddButton
        });
    }
});

function functionToAddButton() {
    let btn = document.createElement('button');

    btn.style.borderRadius = "16px";
    btn.style.backgroundColor = "red";
    btn.style.color = "white";
    btn.style.border = "none";

    btn.innerText = 'Open in YouTube Music';
    btn.setAttribute('id', 'jda-music-button')
    btn.addEventListener('click', function () {
        window.open(window.location.href.replace('https://www.youtube.com/watch?v=', 'https://music.youtube.com/watch?v='), "_blank");
    });

    var element = document.getElementById("jda-music-button");
    // Eliminar el elemento
    if (element) {
        element.remove();
    }


    var searchbox = document.querySelector('ytd-searchbox')
    console.log(searchbox)
    if (searchbox) {
        searchbox.appendChild(btn);
    }
}
