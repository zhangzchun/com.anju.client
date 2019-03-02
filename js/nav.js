(function () {
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

// 导航搜索
    var search_btn_block=document.querySelector('#search_btn_block');
    var search_txt=document.querySelector('#search_txt');
    var form=document.querySelector('.nav_hidden form');
    var search_btn_none=document.querySelector("#search_btn_none");
    var search_header=document.querySelector(".search_header");
    search_txt.style.display="none";
    search_header.style.display="none";
    search_btn_none.style.display="none";
    search_btn_block.style.display="block";
    search_btn_block.onclick=function () {
        search_txt.style.display = "block";
        search_header.style.display = "block";
        search_btn_none.style.display = "block";
        search_btn_block.style.display = "none";
        form.style.border = "solid 1px #888888";
    };
    search_btn_none.onclick=function () {
        search_txt.style.display="none";
        search_header.style.display="none";
        search_btn_none.style.display="none";
        search_btn_block.style.display="block";
        form.style.border="none";
    };
    //搜索
    var li_company=document.querySelector(".li_company");
    var li_strategy=document.querySelector(".li_strategy");
    var li_diary=document.querySelector(".li_diary");
    var dropdownMenu=document.querySelector("#dropdownMenu");
    var search_ul=document.querySelector(".search_ul");

    search_ul.style.display="none";
    dropdownMenu.onclick=function () {
        if (search_ul.style.display==="none"){
            search_ul.style.display="block";
        }else {
            search_ul.style.display="none"
        }
    };
    li_company.onclick=function () {
        dropdownMenu.innerHTML=li_company.innerText + '<span class="caret"></span>';
    };
    li_strategy.onclick=function () {
        dropdownMenu.innerHTML=li_strategy.innerText + '<span class="caret"></span>';
    };
    li_diary.onclick=function () {
        dropdownMenu.innerHTML=li_diary.innerText + '<span class="caret"></span>';
    };
    search_txt.onkeyup=function (event) {
        if (event.keyCode=="13"){
            var search_condition=dropdownMenu.innerText;
            var search_content=search_txt.value;
            if (search_content){
                if (search_condition==="装修公司") {
                    location.href="company_list.html?search_content="+search_content
                }else if (search_condition==="装修攻略" || search_condition==="装修日记"){
                    location.href="strategy_list.html?search_content="+search_content+"&search_condition="+search_condition
                }
            } else{
                alert("搜索内容不能为空")
            }
        }
    };


    // 登录注册
    var login=document.querySelector(".login");
    var register=document.querySelector(".register");
    var nick_name=document.querySelector(".nick_name");
    nick_name.style.display="none";
    var token=window.localStorage && window.localStorage.getItem('token');
    var user_id=window.localStorage && window.localStorage.getItem('user_id');
    var nickname=window.localStorage && window.localStorage.getItem('nickname');

    if (token) {
        getData("http://47.102.45.80:8080/api/user/checkToken/", null,{"token": token}, function (res) {
            if (res && res["status_code"] === "10003") {
                login.style.display="none";
                register.style.display="none";
                nick_name.style.display="block";
                nick_name.innerText=nickname;

                nick_name.onclick=function () {
                    token=window.localStorage && window.localStorage.getItem('token');
                    if(token){
                        getData("http://47.102.45.80:8080/api/user/checkToken/", null,{"token": token}, function (res) {
                            if (res && res["status_code"] === "10003") {
                                location.href = "personal_center.html?user_id=" + user_id
                            }else{
                                location.href="login.html"
                            }
                        })
                    }else{
                        location.href="login.html"
                    }
                }

            }else{
                login.style.display="block";
                register.style.display="block";
                nick_name.style.display="none";
            }
        });
    }

})();