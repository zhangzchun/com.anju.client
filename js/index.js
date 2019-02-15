/**
 *Created by Lenovo-HXL on 2019/1/17.
 */
// 导航
(function () {

    // //Ajax 请求
    // getData("127.0.0.1:8080/api/",null,null,function (res) {
    //     location.href='index.html';
    // });



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






//字数限制{
    var diary_text = document.querySelector(".diary_text");
    var diary_title = document.querySelector(".diary_title span");
    var strategy_content_text=document.querySelectorAll(".strategy_content_text a");
    if (diary_text.innerText.length > 60) {
        diary_text.innerText = diary_text.innerText.substring(0, 60) + "..."
    }
    if (diary_title.innerText.length > 15) {
        diary_title.innerText = diary_title.innerText.substring(0, 15) + "..."
    }
    for (var a of strategy_content_text) {
        if (a.innerText.length > 15){
            a.innerText = a.innerText.substring(0, 15) + "..."
        }
    }


})();
