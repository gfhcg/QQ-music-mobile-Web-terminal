window.addEventListener('load', function () {
    //导航栏点击切换
    var header = this.document.querySelector('.header1');
    var lis = header.querySelectorAll('li');
    var libottom = header.querySelectorAll('div');
    var box = this.document.querySelector('.box');
    var ranklist = this.document.querySelector('.rank');
    for (let i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[0].style.color = '#22d59c';
        libottom[0].style.display = 'block';
        lis[i].onclick = function () {

            for (let i = 0; i < lis.length; i++) {
                lis[i].style.color = '#b1b1b1';
                libottom[i].style.display = 'none';
            }
            let index = this.getAttribute('index');
            this.style.color = '#22d59c';
            libottom[i].style.display = 'block';
            if (index == 0) {
                box.style.display = 'block'
                ranklist.style.display = 'none'
                scontent.style.display = 'none'
                result.style.display = 'none'
            }
            if (index == 1) {
                box.style.display = 'none'
                ranklist.style.display = 'block'
                scontent.style.display = 'none'
                result.style.display = 'none'
            }
        }
    }

    //搜索
    var scontent = this.document.querySelector('.scontent');
    var inp = this.document.querySelector('.inp');
    var hot = this.document.querySelector('.hot');
    var hlis = hot.querySelectorAll('li');
    var history = this.document.querySelector('.history');
    var result = this.document.querySelector('.result');
    var conlis = result.querySelectorAll('li');
    inp.addEventListener('focus', function () {
        box.style.display = 'none'
        ranklist.style.display = 'none'
        scontent.style.display = 'block'
        result.style.display = 'none'
        showLog()
        inp.style.backgroundPosition = 5 + "px " + 5 + "px"
        inp.setAttribute("placeholder", "搜索");
        inp.setAttribute('class', 'inp change');
        var xhr0 = new XMLHttpRequest();
        xhr0.responseType = 'json';
        xhr0.open('GET', 'http://124.221.249.219:8000/api/hot');
        xhr0.send();
        xhr0.onreadystatechange = function () {
            if (xhr0.readyState === 4 && xhr0.status >= 200 && xhr0.status < 300) {
                for (let i = 0; i <= 9; i++) {
                    hlis[i].innerHTML = xhr0.response[i];
                    hlis[i].addEventListener('click', function () {
                        inp.value = hlis[i].innerHTML;
                    })
                }

                document.onkeydown = function (event) {
                    var e = event || window.event || arguments.callee.caller.arguments[0];
                    var xhrcon = new XMLHttpRequest();
                    xhrcon.responseType = 'json';
                    xhrcon.open('GET', 'http://124.221.249.219:8000/api/search?keyword=' + inp.value.substring(0));
                    xhrcon.send();
                    xhrcon.onreadystatechange = function () {
                        if (xhrcon.readyState === 4 && xhrcon.status >= 200 && xhrcon.status < 300) {
                            if (e && e.keyCode == 13) {



                                // 获取搜索栏的值
                                let userVal = search.value
                                let arr = []

                                // 获取本地存储的内容
                                let localCon = localStorage.getItem('searches')
                                arr = localStorage.getItem('searches') ? arr = JSON.parse(localStorage.getItem('searches')) : []
                                if (userVal) {
                                    arr.unshift(userVal)
                                }
                                // 将数组转化成字符串对象,放到本地存储中
                                localStorage.setItem('searches', JSON.stringify(arr))
                                // 渲染数据到网页中
                                showLog()



                                // 事件委派

                                searchList.addEventListener('click', function (e) {
                                    // console.log(e.target.index);
                                    if (e.target.nodeName == 'LI') {
                                        let datas = JSON.parse(localStorage.getItem('searches'))
                                        console.log(e.target.dataset['index']);
                                        datas.splice(e.target.dataset['index'], 1)
                                        localStorage.setItem('searches', JSON.stringify(datas))
                                        showLog()
                                    }

                                })




                                history.style.display = 'block';

                                for (var i = 0; i <= 9; i++) {
                                    conlis[i].innerHTML = '<div>' + xhrcon.response[i].title + '</div>'
                                    conlis[i].innerHTML += xhrcon.response[i].artist[0]

                                }
                                scontent.style.display = 'none';
                                result.style.display = 'block';


                            }
                            if (e && e.keyCode == 27) {
                                inp.value = ''
                            }



                        }

                    }
                }

            }
        }

    })
    // 清空
    clear.addEventListener('click', function () {
        localStorage.removeItem('searches')
        // localStorage.clear()
        showLog()
        history.style.display = 'none'
        // searchList.innerHTML = ''
    })


    // 页面加载的时候将本地存储的内容显示到页面
    function showLog() {
        let locals = JSON.parse(localStorage.getItem('searches')) || []
        let htmllis = ''
        for (let i = 0; i < locals.length; i++) {
            htmllis += `<li data-index=${i}>${locals[i]}</li>`
        }
        searchList.innerHTML = htmllis
    }

    //推荐
    //osongsheet官方歌单
    var osongsheet = this.document.querySelector('.osongsheet');
    var p = osongsheet.querySelectorAll('p');
    var img = this.document.querySelectorAll('#gedan');
    var playcount = this.document.querySelectorAll('.playcount');
    var xhr1 = new XMLHttpRequest();
    xhr1.responseType = 'json';
    xhr1.open('GET', 'http://124.221.249.219:8000/api/recommendations');
    xhr1.send();
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4 && xhr1.status >= 200 && xhr1.status < 300) {
            for (var i = 0; i <= 5; i++) {
                img[i].src = xhr1.response.offical[i].cover;
                p[i].innerHTML = xhr1.response.offical[i].title;
                playcount[i].innerHTML = xhr1.response.offical[i].views;
            }

        }
    }
    //ssongsheet达人歌单
    var ssongsheet = this.document.querySelector('.ssongsheet');
    var p2 = ssongsheet.querySelectorAll('p');
    var img2 = this.document.querySelectorAll('#gedan2');
    var playcount2 = ssongsheet.querySelectorAll('.playcount2');
    var xhr2 = new XMLHttpRequest();
    xhr2.responseType = 'json';
    xhr2.open('GET', 'http://124.221.249.219:8000/api/recommendations');
    xhr2.send();
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4 && xhr2.status >= 200 && xhr2.status < 300) {
            for (var i = 0; i <= 5; i++) {
                img2[i].src = xhr2.response.tatsujin[i].cover;
                p2[i].innerHTML = xhr2.response.tatsujin[i].title;
                playcount2[i].innerHTML = xhr2.response.tatsujin[i].views;
            }

        }
    }
    //专区
    var area = this.document.querySelector('.area');
    var biaoti = area.querySelectorAll('.biaoti');
    var describ = area.querySelectorAll('.describ');
    var img3 = this.document.querySelectorAll('#zhuanqv');
    var icon = this.document.querySelectorAll('#icon');
    var xhr3 = new XMLHttpRequest();
    xhr3.responseType = 'json';
    xhr3.open('GET', 'http://124.221.249.219:8000/api/recommendations');
    xhr3.send();
    xhr3.onreadystatechange = function () {
        if (xhr3.readyState === 4 && xhr3.status >= 200 && xhr3.status < 300) {
            for (var i = 0; i <= 8; i++) {
                img3[i].src = xhr3.response.column[i].background;
                biaoti[i].innerHTML = xhr3.response.column[i].title;
                describ[i].innerHTML = xhr3.response.column[i].description;
                icon[i].src = xhr3.response.column[i].icon;
            }

        }
    }

    //排行
    //ranklist排行榜
    var ranlis = ranklist.querySelectorAll('li');
    var img4 = this.document.querySelectorAll('#facepage');
    var rtitle = ranklist.querySelectorAll('.rtitle');
    var top3 = this.document.querySelectorAll('.top3');
    var playcount3 = this.document.querySelectorAll('.playcount3');
    var update = this.document.querySelectorAll('.update');
    var xhr4 = new XMLHttpRequest();
    xhr4.responseType = 'json';
    xhr4.open('GET', 'http://124.221.249.219:8000/api/ranking');
    xhr4.send();
    xhr4.onreadystatechange = function () {
        if (xhr4.readyState === 4 && xhr4.status >= 200 && xhr4.status < 300) {
            for (var i = 0; i <= 9; i++) {
                img4[i].src = xhr4.response[i].cover;
                rtitle[i].innerHTML = xhr4.response[i].title;
                playcount3[i].innerHTML = xhr4.response[i].views;
                update[i].innerHTML = '每' + xhr4.response[i].update_frequence + '更新';
                let toplis = top3[i].querySelectorAll('li');
                for (var j = 1; j <= 3; j++) {
                    toplis[j - 1].innerHTML = '<span style="font-weight: 800;font-size: 0.3rem;color: #000;">' + j + '</span>' + '、' + xhr4.response[i].top3[j - 1].title + ' ' + '<span style="font-weight: 300;font-size: 0.03rem;color: #aaabaa;">' + xhr4.response[i].top3[j - 1].artist + '</span>';

                }

            }

        }
    }

})