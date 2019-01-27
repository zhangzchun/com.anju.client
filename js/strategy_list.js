/**
 *Created by Lenovo-HXL on 2019/1/19.
 */
(function () {

//下拉按钮
    var dropdownMenu1=document.querySelector("#dropdownMenu1");
    var strategy_ul=document.querySelector(".strategy_ul");
    strategy_ul.style.display="none";
    dropdownMenu1.onclick=function () {
        if (strategy_ul.style.display === "none") {
            strategy_ul.style.display = "block";
        } else {
            strategy_ul.style.display="none";
        }
    };


    // 点击换页
    var strategy_btn = document.querySelector("#strategy_btn");
    var strategy = document.querySelector(".strategy");
    var diary_btn = document.querySelector("#diary_btn");
    var diary=document.querySelector(".diary");
    var more=document.querySelector("#more");
    var strategy_button=document.querySelector(".strategy_button");

    strategy_btn.onclick=function () {
        strategy.style.display="block";
        diary.style.display="none";
        dropdownMenu1.innerHTML=strategy_btn.children[0].innerText + '<span class="caret"></span>';
    };
    diary_btn.onclick=function () {
        diary.style.display="block";
        strategy.style.display="none";
        dropdownMenu1.innerHTML=diary_btn.children[0].innerText + '<span class="caret"></span>';
        if (diary.innerHTML===""){
            getData("http://127.0.0.1:8080/api/strategy/diarylist/",null,null,function (res) {
                if (res) {

                    //动态生成日记页面方法
                    function createDiary() {
                        var s="";
                        for(var img of res["diary_img"]){
                            s += `<img src="../image/${img}">`
                        }
                        diary.innerHTML += `<div class="row diary_main">
                        <div class="col-xs-2 col-sm-2 col-md-2">
                            <div class="user_icon01">
                                <img src="../image/${res["user_icon"]}" alt="">
                            </div>
                            <div class="nickname">
                                <span>${res["nickname"]}</span>
                            </div>
                        </div>
                        <div class="col-xs-10 col-sm-10 col-md-10">
                            <div class="diary_info">
                                <div class="diary_title">
                                    <span>${res["diary_title"]}</span>
                                </div>
                                <div class="style">
                                    <span>${res["style"]}</span>
                                    <span>|</span>
                                    <span class="company">${res["company_name"]}</span>
                                </div>
                                <div class="diary_text">${res["diary_text"]}</div>
                                <div class="diary_image">${s}</div>
                                <div class="public_time">
                                    <span>${res["public_time"]}</span>
                                </div>
                            </div>
                        </div>
                    </div>`
                    }
                    for (var i=0;i<5;i++){
                        createDiary()
                    }

                    // 更多
                    more.onclick=function () {
                        if(strategy_button.childNodes[0].nodeValue === "装修日记"){
                            for (var i=0;i<5;i++){
                                createDiary();
                            }
                        }
                    };

                    // 字数限制
                    var diary_text=document.querySelectorAll(".diary_text");
                    var txt=[];
                    for (var d of diary_text){
                        txt.push(d.innerText)
                    }

                    if (document.body.clientWidth<768) {
                        for (var d of diary_text){
                            if (d.innerText.length>40){
                                d.innerText = d.innerText.substring(0, 40) + "...";

                            }
                        }
                    }
                    window.onresize=function () {
                        if (document.body.clientWidth<768) {
                            for (var d of diary_text){
                                if (d.innerText.length>40){
                                    d.innerText = d.innerText.substring(0, 40) + "...";
                                }
                            }
                        }else {
                            for (var i=0;i<diary_text.length;i++){
                                diary_text[i].innerText=txt[i];
                            }
                        }
                    }
                }
            });
        }
    };

    // 动态生成攻略页面方法
    getData("http://127.0.0.1:8080/api/strategy/strategylist/",null,null,function (res) {
        if (res) {
            function createStrategy() {
                strategy.innerHTML += `<div class="row strategy_main">
                <div class="col-xs-12 col-sm--12 col-md-5 strategy_img">
                    <img src="../image/${res["strategy_img"]}" alt="">
                </div>
                <div class="col-xs-12 col-sm-12 col-md-7 strategy_text">
                    <span>${res["strategy_title"]}</span>
                    <p>${res["strategy_content"]}</p>
                    <span class="author">作者:${res["autho"]}</span>
                </div>
            </div>`;
            }
            for (var i=0;i<5;i++){
                createStrategy()
            }
            var strategy_text = document.querySelectorAll(".strategy_text p");
            for (var p of strategy_text) {
                if (p.innerText.length > 60) {
                    p.innerText = p.innerText.substring(0, 60) + "...";
                }
            }

            more.onclick=function () {
                if (strategy_button.childNodes[0].nodeValue === "装修攻略"){
                    for (var i=0;i<5;i++){
                        createStrategy();
                    }
                }
            };

        }
    });








    more.onclick=function () {
        if (strategy_button.childNodes[0].nodeValue === "装修攻略"){
            for (var i=0;i<5;i++){
                createStrategy();
            }
        }else if(strategy_button.childNodes[0].nodeValue === "装修日记"){
            for (var i=0;i<5;i++){
                createDiary();
            }
        }
    };



//字数限制




})();