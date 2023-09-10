// 这是一个音频文件的数量，你可以修改它
var audioCount = 6;
// 这是一个音频文件名的数组，用一个循环来生成它们
var audioFiles = [];
for (var i = 1; i <= audioCount; i++) {
    // 把每个音频文件名添加到数组中，格式为audio<i>.flac，比如audio1.flac, audio2.flac等
    audioFiles.push("audio" + i + ".flac");
}
// 这是当前要播放的音频文件的索引
var currentIndex = 0;
// 这是一个音频元素的数组，用来存储预加载的音频文件
var audios = [];
// 这是一个标志，用来表示是否所有音频都已经加载完毕
var isLoaded = false;

// 这是一个函数，用来检查是否所有音频都已经加载完毕
function loaded() {
    // 如果所有音频都已经加载完毕，就跳过该函数，避免多次提示
    if (isLoaded = true) {
        return;
    }
    // 用一个变量来计数已经加载完毕的音频数量
    var count = 0;
    // 用一个循环来遍历所有音频元素
    for (var i = 0; i < audios.length; i++) {
        // 如果当前音频元素已经加载完毕，就增加计数
        if (audios[i].readyState == 4) {
            count++;
        }
    }
    // 如果计数等于音频元素的数量，就表示所有音频都已经加载完毕
    if (count == audios.length) {
        // 设置标志为真
        isLoaded = true;
        // 显示一个提示信息，告诉用户可以点击网页了
        document.body.innerHTML += "<p>所有音频都已经加载完毕，你可以点击网页来播放一个音频文件了。</p>";
    }
}

// 这是一个函数，用来预加载所有音频文件
function preload() {
    // 用一个循环来遍历所有音频文件名
    for (var i = 0; i < audioFiles.length; i++) {
        // 创建一个新的音频元素
        var audio = new Audio();
        // 设置它的源为文件的网址
        audio.src = "https://jishux2.github.io/my-audio-files/" + audioFiles[i];
        // 添加一个事件监听器，当它加载完毕时，就调用loaded函数
        audio.load();
        audio.addEventListener("canplaythrough", loaded);
        // 把它添加到数组中
        audios.push(audio);
    }
}

// 这是一个函数，用来播放下一个音频文件
function playNext() {
    // 获取上一个要播放的音频元素的索引
    var previousIndex = (currentIndex - 1 + audioFiles.length) % audioFiles.length;
    // 获取上一个要播放的音频元素
    var previousAudio = audios[previousIndex];
    // 暂停上一个要播放的音频元素
    previousAudio.pause();
    // 获取当前要播放的音频元素
    var currentAudio = audios[currentIndex];
    // 播放当前要播放的音频元素
    currentAudio.play();
    // 增加索引，或者如果到达数组的末尾就重置为零
    currentIndex = (currentIndex + 1) % audioFiles.length;
}

// 给文档添加一个事件监听器，当它被点击时，就检查是否所有音频都已经加载完毕，如果是就调用playNext函数，如果不是就显示一个提示信息
document.addEventListener("click", function () {
    if (isLoaded) {
        playNext();
    } else {
        alert("请等待所有音频都加载完毕再点击网页。");
    }
});

// 调用preload函数，开始预加载所有音频文件
preload();