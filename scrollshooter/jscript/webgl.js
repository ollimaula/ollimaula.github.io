var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var fullscreenButton = document.querySelector("#unity-fullscreen-button");
var warningBanner = document.querySelector("#unity-warning");

function unityShowBanner(msg, type) 
{
    function updateBannerVisibility() 
    {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
    var div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type == 'error') 
        div.style = 'background: red; padding: 10px;';
    else 
    {
        if (type == 'warning') 
            div.style = 'background: yellow; padding: 10px;';
        setTimeout(function() 
        {
            warningBanner.removeChild(div);
            updateBannerVisibility();
        }, 5000);
    }
    updateBannerVisibility();
}

var buildUrl = "Build";
var loaderUrl = buildUrl + "/Build.loader.js";
var config = 
{
    dataUrl: buildUrl + "/Build.data.unityweb",
    frameworkUrl: buildUrl + "/Build.framework.js.unityweb",
    codeUrl: buildUrl + "/Build.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "OlliMaula",
    productName: "ScrollShooter",
    productVersion: "1.3.1",
    showBanner: unityShowBanner,
};

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) 
{
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
    container.className = "unity-mobile";
    canvas.className = "unity-mobile";
    unityShowBanner('WebGL builds are not supported on mobile devices.');
} 
else 
{
    canvas.style.width = "1280px";
    canvas.style.height = "720px";
}

loadingBar.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => 
{
    createUnityInstance(canvas, config, (progress) => { progressBarFull.style.width = 100 * progress + "%"; })
    .then((unityInstance) => 
    {
        loadingBar.style.display = "none";

        var mute = false;
        var volume_slider = document.getElementById("volume-slider");
        var volume_icon = document.getElementById("volume-icon");

        volume_slider.addEventListener("input", () => 
        {
            if (mute == true) 
            {
                mute = false;
                volume_icon.classList.remove("fa-volume-xmark");
            }
        
            var volume = parseFloat(volume_slider.value);
        
            if (volume == 0) 
            {
                volume_icon.classList.remove("fa-volume-low", "fa-volume-high");
                volume_icon.classList.add("fa-volume-off");
            } 
            else if (volume < 0.5) 
            {
                volume_icon.classList.remove("fa-volume-off", "fa-volume-high");
                volume_icon.classList.add("fa-volume-low");
            } 
            else 
            {
                volume_icon.classList.remove("fa-volume-off", "fa-volume-low");
                volume_icon.classList.add("fa-volume-high");
            }
        
            unityInstance.SendMessage("AudioManager", "SetVolume", volume);

            // localStorage.setItem("Volume", volume);
        });

        volume_icon.onclick = () =>
        {
            if (mute == false)
            {
                mute = true;
                volume_icon.classList.toggle("fa-volume-xmark");
                unityInstance.SendMessage("AudioManager", "SetVolume", 0);
            }
            else
            {
                mute = false;
                volume_icon.classList.toggle("fa-volume-xmark");
                var volume = parseFloat(volume_slider.value);
                unityInstance.SendMessage("AudioManager", "SetVolume", volume);
            }

            // localStorage.setItem("Volume", volume);
        };

        fullscreenButton.onclick = () => unityInstance.SetFullscreen(1);
    })
    .catch((message) => { alert(message); });
};
document.body.appendChild(script);