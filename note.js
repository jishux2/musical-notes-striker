// 创建一个音符符号的元素
function createNote() {
    // 随机选择一个音符符号
    let symbols = ["♫", "♪", "♬", "♭", "♯"];
    let symbol = symbols[Math.floor(Math.random() * symbols.length)];
    // 创建一个span元素，设置内容和样式
    let note = document.createElement("span");
    note.textContent = symbol;
    note.style.position = "absolute";
    note.style.fontSize = "24px";
    note.style.position = "fixed";
    // 随机选择一个颜色
    let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    let color = colors[Math.floor(Math.random() * colors.length)];
    note.style.color = color;
    // 设置音符元素的初始旋转角度和速度
    note.style.transform = `rotate(${Math.random() * 360}deg)`;
    note.rotateSpeed = Math.random() * 10 - 5;
    // 返回音符元素
    return note;
}

// 让音符元素在页面上移动和消失
function moveNote(note, x, y) {
    // 把音符元素添加到页面上
    document.body.appendChild(note);
    // 设置音符元素的初始位置
    note.style.left = x + "px";
    note.style.top = y + "px";
    // 随机选择一个移动方向和速度
    let angle = Math.random() * Math.PI * 2;
    let speed = 2;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;
    // 设置音符元素的移动时间和距离
    let duration = Math.random() * 1000 + 500;
    let distance = Math.random() * 100 + 50;

    // 使用requestAnimationFrame来更新音符元素的位置和旋转角度
    function animate() {
        // 获取音符元素的当前位置和旋转角度
        let x = parseFloat(note.style.left);
        let y = parseFloat(note.style.top);
        let rotate = parseFloat(note.style.transform.replace("rotate(", "").replace("deg)", ""));
        // 计算音符元素的新位置和旋转角度
        x += vx;
        y += vy;
        rotate += note.rotateSpeed;
        // 判断音符元素是否超出页面边界或移动距离，如果是，则停止动画并删除音符元素
        if (
            x < -note.offsetWidth ||
            x > window.innerWidth ||
            y < -note.offsetHeight ||
            y > window.innerHeight ||
            Math.hypot(x - parseFloat(note.style.left), y - parseFloat(note.style.top)) >
            distance
        ) {
            cancelAnimationFrame(animate);
            document.body.removeChild(note);
        } else {
            // 否则，更新音符元素的位置和旋转角度，并继续请求下一帧动画
            note.style.left = x + "px";
            note.style.top = y + "px";
            note.style.transform = `rotate(${rotate}deg)`;
            requestAnimationFrame(animate);
        }
    }

    // 请求第一帧动画
    requestAnimationFrame(animate);

}

// 监听页面上的点击事件，每次点击时创建并移动一个音符元素
document.addEventListener("click", function (event) {
    // 获取鼠标点击的位置
    let x = event.clientX;
    let y = event.clientY;
    // 创建一个音符元素
    let note = createNote();
    // 让音符元素在页面上移动和消失
    moveNote(note, x, y);
});