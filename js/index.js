/**
 *Created by Lenovo-HXL on 2019/1/17.
 */
// 导航
(function () {




    // 页面跳转
    window.sessionStorage.setItem('from', location.href);

    var token=window.localStorage && window.localStorage.getItem('token');
    var user_id=window.localStorage && window.localStorage.getItem('user_id');


    var nav_btn=document.querySelector("#nav_btn");
    var bs=document.querySelector("#bs-example-navbar-collapse-1");
    var ss=document.querySelectorAll(".ss");
    bs.style.display="none";
    nav_btn.onclick=function () {
        if (bs.style.display==="none"){
            bs.style.display="block";
        }else {
            bs.style.display="none";
        }
        for (var s of ss){
            s.style.display="none";
        }
    };
    
    // 登录注册
    var login=document.querySelector(".login");
    var register=document.querySelector(".register");
    var s1 =document.querySelector(".s1");
    var nick_name=document.querySelector(".nick_name");
    nick_name.style.display="none";

    var nickname=window.localStorage && window.localStorage.getItem('nickname');

    if (token) {
        getData("http://127.0.0.1:8080/api/user/checkToken/", null,{"token": token}, function (res) {
            if (res && res["status_code"] === "10003") {
                login.style.display="none";
                register.style.display="none";
                s1.style.display="none";
                nick_name.style.display="block";
                nick_name.innerText=nickname;
                nick_name.onclick=function () {
                    token=window.localStorage && window.localStorage.getItem('token');
                    if(token){
                        getData("http://127.0.0.1:8080/api/user/checkToken/", null,{"token": token}, function (res) {
                            if (res && res["status_code"] === "10003") {
                                location.href = "./pages/personal_center.html?user_id=" + user_id
                            }else{
                                location.href="./pages/login.html"
                            }
                        })
                    }else{
                        location.href="./pages/login.html"
                    }
                }
            }else{
                login.style.display="block";
                register.style.display="block";
                s1.style.display="block";
                nick_name.style.display="none";
            }
        });
    }

    var oWidth = parseFloat(document.body.clientWidth);
    window.onresize = ()=>{
        oWidth = parseFloat(document.body.clientWidth);
        if (document.body.clientWidth>=768){
            for (var s of ss){
                s.style.display="block";
            }
        }
    };

    // 轮播
    var oImgList = document.getElementsByClassName("img-list")[0],
        aButton = document.getElementsByClassName("btn"),
        aImgLi = document.querySelectorAll(".img-list li"),
        oWrap = document.getElementsByClassName("wrap")[0],
        aTab = document.querySelectorAll(".tab-list li"),
        len = aImgLi.length,
        index = 0;
    function throttle(fn,time){
        var startTime = new Date();
        return function(){
            var time_ = (new Date() - startTime) >= time;
            if(time_){
                fn.apply(this);
                startTime = new Date();
            }
        }
    }
    function btnTab(){
        var t = new Date();
        for(var i = 0,tabLen = aTab.length;i < tabLen;i++){
            (function(i){
                aTab[i].onclick = function(){
                    if(new Date() - t >= 1000){
                        aTab[index].className = "";
                        if((i - index) === (tabLen - 1)){
                            oImgList.style.transition = 0 + "s";
                            oImgList.style.left = -oWidth*(len-1) + "px";
                            index = len - 2;
                            setTimeout(function(){
                                oImgList.style.transition = 1 + "s";
                                oImgList.style.left = -oWidth*(index) + "px";
                            },1000/60);
                        }
                        else if((i - index) === (1 - tabLen)){
                            oImgList.style.left = -oWidth*(len - 1) + "px";
                            index = 0;
                            setTimeout(function(){
                                oImgList.style.transition = 0 + "s";
                                oImgList.style.left = index + "px";
                            },1000);
                        }
                        else{
                            oImgList.style.left = -oWidth*(i) + "px";
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
    function btnPre(){
        index--;
        if(index < 0){
            oImgList.style.transition = 0 + "s";
            oImgList.style.left = -oWidth*(len-1) + "px";
            aTab[0].className = "";
            index = len - 2;
            aTab[index].className = "on";
            setTimeout(function(){
                oImgList.style.transition = 1 + "s";
                oImgList.style.left = -oWidth*(index) + "px";
            },1000/60);
        }
        else{
            oImgList.style.transition = 1 + "s";
            oImgList.style.left = -oWidth*(index) + "px";
            aTab[index + 1].className = "";
            aTab[index].className = "on";
        }
    }
    function btnNext(){
        index++;
        oImgList.style.transition = 1 + "s";
        if(index === len-1){
            oImgList.style.left = -oWidth*index + "px";
            aTab[len - 2].className = "";
            index = 0;
            aTab[index].className = "on";
            setTimeout(function(){
                oImgList.style.transition = 0 + "s";
                oImgList.style.left = index + "px";
            },1000);
        }
        else{
            oImgList.style.left = -oWidth*index + "px";
            aTab[index - 1].className = "";
            aTab[index].className = "on";
        }
    }
    aButton[0].onclick = throttle(btnPre,1000);
    aButton[1].onclick = throttle(btnNext,1000);
    btnTab();
    var timer = setInterval(btnNext,4000);
    oWrap.onmouseover = function(){
        clearInterval(timer);
    };
    oWrap.onmouseout = function(){
        timer = setInterval(btnNext,4000);
    };



    //搜索
    var li_company=document.querySelector(".li_company");
    var li_strategy=document.querySelector(".li_strategy");
    var li_diary=document.querySelector(".li_diary");
    var dropdownMenu1=document.querySelector("#dropdownMenu1");
    var search_ul=document.querySelector(".search_ul");

    search_ul.style.display="none";
    dropdownMenu1.onclick=function () {
        if (search_ul.style.display==="none"){
            search_ul.style.display="block";
        }else {
            search_ul.style.display="none"
        }
    };
    li_company.onclick=function () {
        dropdownMenu1.innerHTML=li_company.innerText + '<span class="caret"></span>';
    };
    li_strategy.onclick=function () {
        dropdownMenu1.innerHTML=li_strategy.innerText + '<span class="caret"></span>';
    };
    li_diary.onclick=function () {
        dropdownMenu1.innerHTML=li_diary.innerText + '<span class="caret"></span>';
    };


    var search_btn=document.querySelector(".search_btn");
    var search=document.querySelector("#search");
    search_btn.onclick=function () {
        var search_condition=dropdownMenu1.innerText;
        var search_content=search.value;
        if (search_content){
            if (search_condition==="装修公司") {
                location.href="pages/company_list.html?search_content="+search_content
            }else if (search_condition==="装修攻略" || search_condition==="装修日记"){
                location.href="pages/strategy_list.html?search_content="+search_content+"&search_condition="+search_condition
            }
        } else{
            alert("搜索内容不能为空")
        }
    };

    search.onkeyup=function (event) {
        if (event.keyCode=="13"){
            var search_condition=dropdownMenu1.innerText;
            var search_content=search.value;
            if (search_content){
                if (search_condition==="装修公司") {
                    location.href="pages/company_list.html?search_content="+search_content
                }else if (search_condition==="装修攻略" || search_condition==="装修日记"){
                    location.href="pages/strategy_list.html?search_content="+search_content+"&search_condition="+search_condition
                }
            } else{
                alert("搜索内容不能为空")
            }
        }
    };



    // 公司
    var company_main=document.querySelector(".company_main");
    getData('http://127.0.0.1:8080/api/company/indexCompanyList/',null,null,function (res) {
        if(res && res['status_code']==='10009'){
            for(let r of res['content']){
                company_main.innerHTML+=`<div class="col-xs-12 col-sm-6 col-md-3 my_company" id="${r["id"]}">
                    <div class="content">
                        <div class="company_image">
                            <img src="${r["c_img"]}" alt="">
                        </div>
                        <div class="company_logo">
                            <img src="${r["company_icon"]}" alt="">
                        </div>
                        <div class="company_name">
                            <span>${r["name"]}</span>
                        </div>
                    </div>
                </div>`
            }

            var my_companys=document.querySelectorAll(".my_company")
            for (var my_company of my_companys) {
                my_company.onclick=function () {
                    location.href="./pages/companyDetail.html?company_id="+this.id;
                }
            }
        }else if(res['status_code']==='10008') {
            company_main.innerHTML+=""
        }

    });



    // 日记
    var user_icon02=document.querySelector(".user_icon02");
    getData('http://127.0.0.1:8080/api/diary/diaryUserIcon/',null,null,function (res){
        if(res && res['status_code']==='10009'){
            for(let r of res['content']){
                user_icon02.innerHTML+=`<div class="col-xs-12 user_item" id="${r["id"]}">
                            <img src="${r["icon"]}" alt="">
                        </div>`
            }


            var user_items=document.querySelectorAll(".user_item");
            var first_diary_id=user_items[0].id;
            function getDiaryData(args) {
                getData("http://127.0.0.1:8080/api/diary/diaryItem/",{"diary_id":args},null,function (res) {
                    if (res && res['status_code']==='10009') {
                        var diary_text = document.querySelector(".diary_text");
                        var diary_title = document.querySelector(".diary_title span");
                        document.querySelector(".user_icon01 img").src=res["content"]["icon"];
                        diary_title.innerText=res["content"]["diary_title"];
                        document.querySelector(".style").innerText=res["content"]["style_name"];
                        document.querySelector(".diary_company_name").innerText=res["content"]["company"];
                        diary_text.innerText=res["content"]["diary_content"];
                        var imgs="";
                        for (var img of res["content"]["diary_img"]){
                            imgs +=`<img src="${img}">`
                        }
                        document.querySelector(".diary_image").innerHTML = imgs;

                        // 字数限制
                        if (diary_text.innerText.length > 60) {
                            diary_text.innerText = diary_text.innerText.substring(0, 60) + "..."
                        }
                        if (diary_title.innerText.length > 15) {
                            diary_title.innerText = diary_title.innerText.substring(0, 15) + "..."
                        }
                    }else {
                        alert(res["status_text"])
                    }

                })
            }
            getDiaryData(first_diary_id);
            for (var user_item of user_items){
                user_item.onclick=function () {
                    var diary_id=this.id;
                    getDiaryData(diary_id)
                }
            }
        }else if(res['status_code']==='10008') {
            alert(res["status_text"])
        }
    });

    var more_diary=document.querySelector(".more_diary a");
    more_diary.onclick=function () {
        location.href="./pages/strategy_list.html?more_diary=true"
    };

    // 攻略
    var strategy_content_text=document.querySelector(".strategy_content_text");
    var diary_content_text=document.querySelector(".diary_content_text");

    getData('http://127.0.0.1:8080/api/strategy/strategyTitle/',null,null,function (res) {
        if(res && res['status_code']==='10009'){
            for (var r of res["content"]){
                strategy_content_text.innerHTML+=`<a href="###" class="strategy_txt" id="${r["strategy_id"]}">${r["strategy_title"]}</a>`
            }
            var strategy_txts=document.querySelectorAll(".strategy_txt");
            for (var strategy_txt of strategy_txts){
                strategy_txt.onclick=function () {
                    location.href="./pages/strategy_info.html?strategy_id="+this.id;
                }
            }
            xzzs();
        }else{
            alert(res["status_text"])
        }
    });

    getData('http://127.0.0.1:8080/api/diary/diaryTitle/',null,null,function (res) {
        if(res && res['status_code']==='10009'){
            for (var r of res["content"]){
                diary_content_text.innerHTML+=`<a href="#" class="diary_txt" id="${r["diary_id"]}">${r["diary_title"]}</a>`
            }
            var diary_txts=document.querySelectorAll(".diary_txt");
            for (var diary_txt of diary_txts){
                diary_txt.onclick=function () {
                    location.href="./pages/diary_info.html?diary_id="+this.id;
                }
            }
            xzzs();
        }else{
            alert(res["status_text"])
        }
    });


    // 限制字数
    function xzzs() {
        //字数限制{
        var content_text=document.querySelectorAll(".content_text a");
        for (var a of content_text) {
            if (a.innerText.length > 13){
                a.innerText = a.innerText.substring(0, 13) + "..."
            }
        }
    }
    xzzs();

})();
