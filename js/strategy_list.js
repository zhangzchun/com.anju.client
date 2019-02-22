/**
 *Created by Lenovo-HXL on 2019/1/19.
 */
(function () {

    // 页面跳转
    window.sessionStorage.setItem('from', location.href);

    //下拉按钮
    var dropdownMenu1 = document.querySelector("#dropdownMenu1");
    var strategy_ul = document.querySelector(".strategy_ul");
    strategy_ul.style.display = "none";
    dropdownMenu1.onclick = function () {
        if (strategy_ul.style.display === "none") {
            strategy_ul.style.display = "block";
        } else {
            strategy_ul.style.display = "none";
        }
    };

    // 点击换页
    var strategy_btn = document.querySelector("#strategy_btn");
    var diary_btn = document.querySelector("#diary_btn");
    var diary=document.querySelector(".diary");
    var strategy = document.querySelector(".strategy");
    var more=document.querySelector("#more");
    var strategy_button=document.querySelector(".strategy_button");

    strategy_btn.onclick=function () {
        strategy.style.display="block";
        diary.style.display="none";
        dropdownMenu1.innerHTML=strategy_btn.children[0].innerText + '<span class="caret"></span>';
    };
    diary_btn.onclick=function () {
        diary.style.display = "block";
        strategy.style.display = "none";
        dropdownMenu1.innerHTML = diary_btn.children[0].innerText + '<span class="caret"></span>';
        if (diary.innerHTML === "") {
            getDiaryData("http://127.0.0.1:8080/api/diary/diaryList/",null)
        }
    };


    // 请求数据
    if (decodeURI(location.href).indexOf("search_condition=装修攻略") !== -1) {
        var myurl = location.href.split("&")[0].split("?")[1].split("=")[1];
        getStrategyData("http://127.0.0.1:8080/api/search/", {"search_content": decodeURI(myurl), "search_condition": "装修攻略"})
    } else if (decodeURI(location.href).indexOf("search_condition=装修日记") !== -1){
        var myurl = location.href.split("&")[0].split("?")[1].split("=")[1];
        diary.style.display = "block";
        strategy.style.display = "none";
        dropdownMenu1.innerHTML = diary_btn.children[0].innerText + '<span class="caret"></span>';
        getDiaryData("http://127.0.0.1:8080/api/search/", {"search_content": decodeURI(myurl), "search_condition": "装修日记"});

    } else if(decodeURI(location.href).indexOf("more_diary=true") !== -1) {
        diary.style.display = "block";
        strategy.style.display = "none";
        dropdownMenu1.innerHTML = diary_btn.children[0].innerText + '<span class="caret"></span>';
        getDiaryData("http://127.0.0.1:8080/api/diary/diaryList/",null)
    }else{
        getStrategyData("http://127.0.0.1:8080/api/strategy/strategyList/",null)
    }

    // 动态生成攻略页面方法

    function getStrategyData(url,args){
        getData(url,args,null,function (res) {
            if(res && res.status_code==='10009'){
                function createStrategy(i) {
                    strategy.innerHTML += `<div class="row strategy_main" id="${res["content"][i]["strategy_id"]}">
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

                var l=res["content"].length;
                if (l>4) {
                    for (var i=0;i<4;i++){
                        createStrategy(i)
                    }
                    l=l-4;
                    more.onclick=function () {
                        if (strategy_button.childNodes[0].nodeValue === "装修攻略"){
                            if (l>4){
                                for (var j=i;j<i+4;j++){
                                    createStrategy(j);
                                }
                                l=l-4;
                            }else{
                                for (var k=i;k<i+l;k++){
                                    createStrategy(k);
                                }
                                strategy.innerHTML+=`<h4 style="display: flex;justify-content: center;padding: 20px 0;">没有更多了~~~</h4>`;
                                more.style.display="none"
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
                }else{
                    for (var i=0;i<l;i++){
                        createStrategy(i)
                    }
                    strategy.innerHTML+=`<h4 style="display: flex;justify-content: center;padding: 20px 0;">没有更多了~~~</h4>`;
                    more.style.display="none"
                }
                var strategy_text = document.querySelectorAll(".strategy_text p");
                for (var p of strategy_text) {
                    if (p.innerText.length > 60) {
                        p.innerText = p.innerText.substring(0, 60) + "...";
                    }
                }
            }else {
                alert(res.status_text);
            }
            function tz() {
                // 点击跳转到攻略详情页
                var strategy_main=document.querySelectorAll(".strategy_main");
                for (var s=0;s<strategy_main.length;s++){
                    strategy_main[s].onclick=function () {
                        location.href="strategy_info.html?strategy_id="+this.id;
                    }
                }
            }

            tz();

        });
    };

    // 动态生成日记页面方法
    function getDiaryData(url,args) {
        getData(url,args, null, function (res) {
            if (res && res["status_code"] === '10009') {

                //动态生成日记页面方法
                function createDiary(i) {
                    var s = "";
                    for (var img of res["content"][i]["diary_img"]) {
                        s += `<img src="${img}">`
                    }
                    diary.innerHTML += `<div class="row diary_main" id="${res["content"][i]["diary_id"]}">
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
                    more.onclick = function () {
                            if (strategy_button.childNodes[0].nodeValue === "装修日记") {
                                if (m > 4) {
                                    for (var j = i; j < i + 4; j++) {
                                        createDiary(j);
                                    }
                                    m = m - 4;
                                } else {
                                    for (var k = i; k < i + m; k++) {
                                        createDiary(k);
                                    }
                                    diary.innerHTML += `<h4 style="display: flex;justify-content: center;padding: 20px 0;">没有更多了~~~</h4>`;
                                    more.style.display = "none"
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
                    diary.innerHTML += `<h4 style="display: flex;justify-content: center;padding: 20px 0;">没有更多了~~~</h4>`;
                    more.style.display = "none"
                }
                var diary_text = document.querySelectorAll(".diary_text p");
                for (var p of diary_text) {
                    if (p.innerText.length > 60) {
                        p.innerText = p.innerText.substring(0, 60) + "...";
                    }
                }
            } else {
                alert(res["status_text"])
            }

            function tzDiary() {
                // 点击跳转到日记详情页
                var diary_main=document.querySelectorAll(".diary_main");
                for (var d of diary_main){
                    d.onclick=function () {
                        location.href="diary_info.html?diary_id="+this.id;
                    }
                }
            }
            tzDiary();


        });
    };


})();