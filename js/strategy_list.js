/**
 *Created by Lenovo-HXL on 2019/1/19.
 */
(function () {

    // 页面跳转
    window.sessionStorage.setItem('from', location.href);


    // 点击换页
    var strategy_li = document.querySelector(".strategy_li");
    var diary_li = document.querySelector(".diary_li");
    var diary = document.querySelector(".diary");
    var diary_items = document.querySelector(".diary_items");
    var strategy = document.querySelector(".strategy");
    var strategy_items = document.querySelector(".strategy_items");
    var more_strategy = document.querySelector("#more_strategy");
    var more_diary = document.querySelector("#more_diary");
    strategy_li.onclick = function () {
        strategy.style.display = "block";
        diary.style.display = "none";
        strategy_li.style.background = "#FFFFFF";
        strategy_li.style.borderBottom = "0";
        diary_li.style.borderBottom = "solid 1px #DDDDDD";
        diary_li.style.background = "#F9F9F9";
        var url = window.location.href;
        var valiable = url.split("?")[0];
        window.history.pushState({},0,valiable);
        if (strategy_items.innerHTML === "") {
            getStrategyData("http://127.0.0.1:8080/api/strategy/strategyList/", null)
        } else if (strategy_items.contains(document.getElementsByTagName("h3")[0])) {
            document.getElementsByTagName("h3")[0].style.display = "none";
            more_strategy.style.display="inline";
            getStrategyData("http://127.0.0.1:8080/api/strategy/strategyList/", null)
        }
    };
    diary_li.onclick = function () {
        diary_items.style.display = "block";
        diary.style.display = "block";
        strategy.style.display = "none";
        strategy_li.style.background = "#F9F9F9";
        diary_li.style.background = "#FFFFFF";
        diary_li.style.borderBottom = "0";
        strategy_li.style.borderBottom = "solid 1px #DDDDDD";
        var url = window.location.href;
        var valiable = url.split("?")[0];
        window.history.pushState({},0,valiable);
        if (diary_items.innerHTML === "") {
            getDiaryData("http://127.0.0.1:8080/api/diary/diaryList/", null)
        } else if (diary_items.contains(document.getElementsByTagName("h3")[0])) {
            document.getElementsByTagName("h3")[0].style.display = "none";
            more_diary.style.display="inline";
            getDiaryData("http://127.0.0.1:8080/api/diary/diaryList/", null)
        }
    };


    // 请求数据
    if (decodeURI(location.href).indexOf("search_condition=装修攻略") !== -1) {
        var myurl = location.href.split("&")[0].split("?")[1].split("=")[1];
        getStrategyData("http://127.0.0.1:8080/api/search/", {
            "search_content": decodeURI(myurl),
            "search_condition": "装修攻略"
        })
    } else if (decodeURI(location.href).indexOf("search_condition=装修日记") !== -1) {
        var myurl = location.href.split("&")[0].split("?")[1].split("=")[1];
        diary.style.display = "block";
        strategy.style.display = "none";
        strategy_li.style.background = "#F9F9F9";
        diary_li.style.borderBottom = "0";
        strategy_li.style.borderBottom = "solid 1px #DDDDDD";
        diary_li.style.background = "#FFFFFF";
        getDiaryData("http://127.0.0.1:8080/api/search/", {
            "search_content": decodeURI(myurl),
            "search_condition": "装修日记"
        });

    } else if (decodeURI(location.href).indexOf("more_diary=true") !== -1) {
        diary.style.display = "block";
        strategy.style.display = "none";
        strategy_li.style.background = "#F9F9F9";
        diary_li.style.borderBottom = "0";
        strategy_li.style.borderBottom = "solid 1px #DDDDDD";
        diary_li.style.background = "#FFFFFF";
        getDiaryData("http://127.0.0.1:8080/api/diary/diaryList/", null)
    } else {
        getStrategyData("http://127.0.0.1:8080/api/strategy/strategyList/", null)
    }

    // 动态生成攻略页面方法

    function getStrategyData(url, args) {
        getData(url, args, null, function (res) {
            if (res && res.status_code === '10009') {
                function createStrategy(i) {
                    strategy_items.innerHTML += `<div class="row strategy_main" id="${res["content"][i]["strategy_id"]}">
                <div class="col-xs-12 col-sm--12 col-md-5 strategy_img">
                    <img src="${res["content"][i]["strategy_img"]}" alt="" width="410px" height="184px">
                </div>
                <div class="col-xs-12 col-sm-12 col-md-7 strategy_text">
                    <span>${res["content"][i]["strategy_title"]}</span>
                    <p>${res["content"][i]["lead"]}</p>
                    <span class="author">作者:${res["content"][i]["author"]}</span>
                </div>
            </div>`;
                }

                var l = res["content"].length;
                if (l > 4) {
                    for (var i = 0; i < 4; i++) {
                        createStrategy(i)
                    }
                    l = l - 4;
                    more_strategy.onclick = function () {
                        if (strategy_li.style.display != "none") {
                            if (l > 4) {
                                for (var j = i; j < i + 4; j++) {
                                    createStrategy(j);
                                }
                                l = l - 4;
                            } else {
                                for (var k = i; k < i + l; k++) {
                                    createStrategy(k);
                                }
                                strategy_items.innerHTML += `<h4 style="text-align:center; padding-top: 20px;">已加载全部~~~</h4>`;
                                more_strategy.style.display = "none"
                            }
                        }
                        var strategy_text = document.querySelectorAll(".strategy_text p");
                        for (var p of strategy_text) {
                            if (p.innerText.length > 60) {
                                p.innerText = p.innerText.substring(0, 60) + "...";
                            }
                        }
                        tz();
                    };
                } else {
                    for (var i = 0; i < l; i++) {
                        createStrategy(i)
                    }
                    strategy_items.innerHTML += `<h4 style="text-align:center; padding-top: 20px;">已加载全部~~~</h4>`;
                    more_strategy.style.display = "none"
                }
                var strategy_text = document.querySelectorAll(".strategy_text p");
                for (var p of strategy_text) {
                    if (p.innerText.length > 60) {
                        p.innerText = p.innerText.substring(0, 60) + "...";
                    }
                }
            } else if (res && res["status_code"] === '10008') {
                strategy_items.innerHTML += `<img src="../image/no-strategy.png" style="width: 100%;">`;
                more_strategy.style.display = "none"
            } else {
                console.log(res.status_text);
            }

            function tz() {
                // 点击跳转到攻略详情页
                var strategy_main = document.querySelectorAll(".strategy_main");
                for (var s = 0; s < strategy_main.length; s++) {
                    strategy_main[s].onclick = function () {
                        location.href = "strategy_info.html?strategy_id=" + this.id;
                    }
                }
            }

            tz();

        });
    };

    // 动态生成日记页面方法
    function getDiaryData(url, args) {
        getData(url, args, null, function (res) {
            if (res && res["status_code"] === '10009') {
                //动态生成日记页面方法
                function createDiary(i) {
                    var s = "";
                    for (var img of res["content"][i]["diary_img"]) {
                        s += `<img src="${img}">`
                    }
                    diary_items.innerHTML += `<div class="row diary_main" id="${res["content"][i]["diary_id"]}">
                        <div class="col-xs-2 col-sm-2 col-md-2">
                            <div class="user_icon01">
                                <img src="../image/${res["content"][i]["icon"]}" alt="">
                            </div>
                            <div class="nickname">
                                <span>${res["content"][i]["nickname"]}</span>
                            </div>
                        </div>
                        <div class="col-xs-10 col-sm-10 col-md-10">
                            <div class="diary_info">
                                <div class="diary_title">
                                    <span>${res["content"][i]["diary_title"]}</span>
                                </div>
                                <div class="style">
                                    <span>${res["content"][i]["style_name"]}</span>
                                    <span>|</span>
                                    <span class="company">${res["content"][i]["company"]}</span>
                                </div>
                                <div class="diary_text">${res["content"][i]["diary_content"]}</div>
                                <div class="diary_image">${s}</div>
                                <div class="public_time">
                                    <span>${res["content"][i]["public_date"]}</span>
                                </div>
                            </div>
                        </div>
                    </div>`
                }

                var m = res["content"].length;
                if (m > 4) {
                    for (var i = 0; i < 4; i++) {
                        createDiary(i)
                    }
                    m = m - 4;
                    more_diary.onclick = function () {
                        if (diary_li.style.display != "none") {
                            if (m > 4) {
                                for (var j = i; j < i + 4; j++) {
                                    createDiary(j);
                                }
                                m = m - 4;
                            } else {
                                for (var k = i; k < i + m; k++) {
                                    createDiary(k);
                                }
                                diary_items.innerHTML += `<h4 style="display: flex;justify-content: center;padding: 20px 0;">已加载全部~~~</h4>`;
                                more_diary.style.display = "none"
                            }
                        }
                        // 限制字数
                        var diary_text = document.querySelectorAll(".diary_text p");
                        for (var p of diary_text) {
                            if (p.innerText.length > 60) {
                                p.innerText = p.innerText.substring(0, 60) + "...";
                            }
                        }
                        tzDiary();
                    };

                } else {
                    for (var i = 0; i < m; i++) {
                        createDiary(i)
                    }
                    diary_items.innerHTML += `<h4 style="display: flex;justify-content: center;padding: 20px 0;">已加载全部~~~</h4>`;
                    more_diary.style.display = "none"
                }
                var diary_text = document.querySelectorAll(".diary_text p");
                for (var p of diary_text) {
                    if (p.innerText.length > 60) {
                        p.innerText = p.innerText.substring(0, 60) + "...";
                    }
                }
            } else if (res && res["status_code"] === '10008') {
                diary_items.innerHTML += `<img src="../image/no-strategy.png" style="width: 100%;">`;
                more_diary.style.display = "none"
            } else {
                console.log(res["status_text"])
            }

            function tzDiary() {
                // 点击跳转到日记详情页
                var diary_main = document.querySelectorAll(".diary_main");
                for (var d of diary_main) {
                    d.onclick = function () {
                        location.href = "diary_info.html?diary_id=" + this.id;
                    }
                }
            }

            tzDiary();


        });
    };


    // 侧边栏攻略
    var hot_title = document.querySelectorAll(".hot_title span");
    var hot_image = document.querySelectorAll(".hot_image img");
    for (var i = 1; i < hot_image.length; i++) {
        hot_image[i].style.display = "none"
    }
    for (var hot_t of hot_title) {
        hot_t.onmouseover = function () {
            for (var i = 0; i < hot_image.length; i++) {
                hot_image[i].style.display = "none"
            }
            this.parentElement.nextElementSibling.children[0].style.display = "block"
        };
    }

    // 侧边栏日记轮播
    var oWidth = parseFloat(308);
    var oImgList = document.getElementsByClassName("img-list")[0],
        aImgLi = document.querySelectorAll(".img-list li"),
        oWrap = document.getElementsByClassName("wrap")[0],
        aTab = document.querySelectorAll(".tab-list li"),
        len = aImgLi.length,
        index = 0;

    function btnTab() {
        var t = new Date();
        for (var i = 0, tabLen = aTab.length; i < tabLen; i++) {
            (function (i) {
                aTab[i].onclick = function () {
                    if (new Date() - t >= 1000) {
                        aTab[index].className = "";
                        if ((i - index) === (tabLen - 1)) {
                            oImgList.style.transition = 0 + "s";
                            oImgList.style.left = -oWidth * (len - 1) + "px";
                            index = len - 2;
                            setTimeout(function () {
                                oImgList.style.transition = 1 + "s";
                                oImgList.style.left = -oWidth * (index) + "px";
                            }, 1000 / 60);
                        }
                        else if ((i - index) === (1 - tabLen)) {
                            oImgList.style.left = -oWidth * (len - 1) + "px";
                            index = 0;
                            setTimeout(function () {
                                oImgList.style.transition = 0 + "s";
                                oImgList.style.left = index + "px";
                            }, 1000);
                        }
                        else {
                            oImgList.style.left = -oWidth * (i) + "px";
                            oImgList.style.transition = 1 + "s";
                        }
                        index = i;
                        this.className = "on";
                        t = new Date();
                    }
                }
            })(i);
        }
    }

    function btnNext() {
        index++;
        oImgList.style.transition = 1 + "s";
        if (index === len - 1) {
            oImgList.style.left = -oWidth * index + "px";
            aTab[len - 2].className = "";
            index = 0;
            aTab[index].className = "on";
            setTimeout(function () {
                oImgList.style.transition = 0 + "s";
                oImgList.style.left = index + "px";
            }, 1000);
        }
        else {
            oImgList.style.left = -oWidth * index + "px";
            aTab[index - 1].className = "";
            aTab[index].className = "on";
        }
    }

    btnTab();
    var timer = setInterval(btnNext, 3000);
    oWrap.onmouseover = function () {
        clearInterval(timer);
    };
    oWrap.onmouseout = function () {
        timer = setInterval(btnNext, 3000);
    };


    // 返回顶部
    var to_top = document.querySelector('#go_top');
    to_top.style.display = 'none';
    to_top.onclick = function () {
        var scroll_h = document.documentElement.scrollTop || document.body.scrollTop;
        var inter = setInterval(function () {
            scroll_h -= 50;
            window.scrollTo(0, scroll_h);
            if (scroll_h <= 0) {
                clearInterval(inter);
            }
        }, 2);
        to_top.style.display = 'none';
    };
    // 目录固定
    var catalog = document.querySelector(".QR"),
        H = 0,
        Y = catalog;
    while (Y) {
        H += Y.offsetTop;
        Y = Y.offsetParent;
    }
    window.onscroll = function () {
        //    innerHeight 浏览器的可视高度，他是变化的(兼容所有浏览器)
        var w = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
//    滚动条滚动的高度
        var scroll_h = document.documentElement.scrollTop || document.body.scrollTop;
        if (scroll_h > w) {
            to_top.style.display = 'block';
        } else {
            to_top.style.display = 'none';
        }
        var s = document.body.scrollTop || document.documentElement.scrollTop;
        if (s > H) {
            catalog.style = "position:fixed;top:76px;left:71.5%;right:auto; width:23.5%;"
        } else {
            catalog.style = ""
        }
    }
})();