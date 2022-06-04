//基于设计图的rem布局
function remSize() {
    //获取设备宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth
    if (deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320
    }
    //750px下 1rem=100px,375px下 1rem=50px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
    //设置字体大小
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize()
//当窗口发生变化时调用
window.onresize = function () {
    remSize();
}