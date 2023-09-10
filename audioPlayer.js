// 这是一个音频文件的数量，你可以修改它
var audioCount = 6;
// 这是一个音频文件名的数组，用一个循环来生成它们
var audioFiles = [];

for (var i = 1; i <= audioCount; i++) {
    // 把每个音频文件名添加到数组中，格式为audio<i>.flac，比如audio1.flac, audio2.flac等
    audioFiles.push("audio" + i + ".flac");
}

// 这是当前要播放的音频元素
var currentAudio = new Audio();
// 这是当前要播放的音频文件的索引
var currentIndex = 0;
// 这是一个音频元素的数组，用来存储所有的音频文件
var audio = [];
// 这是一个循环，用来预加载所有的音频文件
for (var i = 0; i < audioFiles.length; i++) {
    // 创建一个新的音频元素
    var a = new Audio();
    // 设置它的源为文件的网址
    a.src = "https://jishux2.github.io/my-audio-files/" + audioFiles[i];
    // 设置音频元素的预加载属性为auto，这意味着它会尽可能地加载音频数据
    a.preload = "auto";
    // 把它添加到数组中
    audio.push(a);
}

var preloader = new Audio();
// 设置音频元素的源为文件的网址
preloader.src = "https://jishux2.github.io/my-audio-files/双笙 (陈元汐) - 女孩你为何踮脚尖.ogg";
// 设置音频元素的预加载属性为auto，这意味着它会尽可能地加载音频数据
preloader.preload = "auto";

// 这是一个函数，用来播放下一个音频文件
function playNext() {
    // 如果还有音频不能播放，就不做任何事情，并显示一个提示信息
    if (!allCanPlay) {
        alert("请稍等一下，还有音频在加载中...");
        return;
    }
    currentAudio.pause();
    // 获取当前要播放的音频元素
    currentAudio = audio[currentIndex]
    // 播放当前的音频元素
    currentAudio.play();
    // 增加索引，或者如果到达数组的末尾就重置为零
    currentIndex = (currentIndex + 1) % audioFiles.length;
}

// 这是一个变量，用来记录是否所有音频都可以播放
var allCanPlay = false;
// 这是一个函数，用来检查是否所有音频都可以播放，并设置allCanPlay变量为真
function checkAllCanPlay() {
    // 用一个循环来遍历每个音频元素
    for (var i = 0; i < audio.length; i++) {
        // 如果有一个音频元素还不能播放，就返回，不做任何事情
        if (audio[i].readyState < 4) {
            return;
        }
    }
    // 如果所有音频元素都可以播放，就设置allCanPlay变量为真，并显示一个提示信息
    allCanPlay = true;
    alert("所有音频都可以播放了，点击任何地方来开始吧！");
}
// 给每个音频元素添加一个事件监听器，当它们可以播放时，就调用checkAllCanPlay函数
for (var i = 0; i < audio.length; i++) {
    audio[i].addEventListener("canplaythrough", checkAllCanPlay);
}

// 给文档添加一个事件监听器，当它被点击时，就调用playNext函数
document.addEventListener("click", playNext);