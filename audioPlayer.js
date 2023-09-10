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
// 这是一个音频元素，用来播放音频文件
var audio = new Audio();
// 这是一个函数，用来播放下一个音频文件
function playNext() {
    // 从数组中获取下一个音频文件名
    var nextFile = audioFiles[currentIndex];
    // 设置音频元素的源为文件的网址
    audio.src = "https://jishux2.github.io/my-audio-files/" + nextFile;
    // 播放音频元素
    audio.play();
    // 增加索引，或者如果到达数组的末尾就重置为零
    currentIndex = (currentIndex + 1) % audioFiles.length;
}
// 给文档添加一个事件监听器，当它被点击时，就调用playNext函数
document.addEventListener("click", playNext);