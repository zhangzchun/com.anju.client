
(function () {

    // 公司id
    // var company_id=location.href.split("?company_id=")[1];

    // ajax获取公司数据,渲染
    getData("http://127.0.0.1:8080/api/company/companyDetail/",{"company_id":1},null,
        function (res) {
            if (res && res["status_code"]==="10009"){

                //公司图片
                var company_img=document.querySelector(".company_img");
                company_img.src=res['content'][0]['com_img'];

                //公司头像
                var company_icon=document.querySelector(".company_icon");
                company_icon.src=res['content'][0]['company_icon'];
                // 公司名
                var company_name=document.querySelectorAll('.company_name');

                for (var name of company_name) {
                    name.innerText=res['content'][0]['com_name'];
                }

                // 保证金
                var bond=document.querySelector('.bond');
                bond.innerText=res['content'][0]['bond'];

                // 口碑值
                var mouth_value=document.querySelectorAll('.mouth-value');

                for (var mouth of mouth_value) {
                    mouth.innerText=res['content'][0]['mouth_value'];
                }

                // 设计案例数
                var case_num=document.querySelector('.case_num');
                case_num.innerText=res['content'][0]['case_num'];

                // 装修工地数
                var work_site_num=document.querySelector('.work_site_num');
                work_site_num.innerText=res['content'][0]['work_site_num'];


                // 好评率
                var favorable_rate=document.querySelector('.favorable_rate');
                favorable_rate.innerText=res['content'][0]['favorable_rate'];

                // 联系电话
                var contact_tel=document.querySelector('.head-com-tel');
                contact_tel.innerHTML+=res['content'][0]['contact_tel'];

                // 地址
                var address=document.querySelector('.address');
                address.innerText+=res['content'][0]['address'];



                // 动态生成设计案例-begin
                var case_row =document.querySelector('.case-cont');

                for (var i=0;i<6;i++) {
                    case_row.innerHTML+=`<div class="card-bx col-xs-4 col-sm-4 col-md-4 " id="${res['content'][i]['case_id']}">
                                         <a href="#">
                                            <div class="img-ct">
                                                <img src="${res['content'][i]['case_img']}"/>

                                            </div>
                                            <div class="card-info">
                                                <p class="card-name ect">${res['content'][i]['case_name']}</p>
                                                <p class="card-detail">${res['content'][i]['area']}m² / ${res['content'][i]['type']} / ${res['content'][i]['sty']} / ${res['content'][i]['reno']}</p>
                                                <p class="card-cost ect">
                                                    <span>
                                                        ${res['content'][i]['price']}
                                                    </span>
                                                    万
                                                </p>
                                            </div>
                                        </a>
                                    </div>`;
                }
                // 动态生成设计案例-end

                //案例点击事件
                let card_bx=document.querySelectorAll(".card-bx");
                for (var c of card_bx){
                    c.onclick=function () {
                        location.href="case_detail.html?case_id="+this.id;
                    }
                }


                // 动态生成设计师-begin
                var row_portrait=document.querySelector('.portrait-cont');

                for (var i=0;i<4;i++) {
                    row_portrait.innerHTML+=`<div class="portrait-bx col-sm-6 col-md-3" id="${res['content'][i]['des_id']}">
                                            <a href="#">
                                                <div class="img-ct">
                                                    <img class="img--lazy" src="${res['content'][i]['des_icon']}" data-original="" alt="设计师头像" style="display: inline;">
                                                </div>

                                                <div class="portrait-info">
                                                    <p class="portrait-name">
                                                        ${res['content'][i]['des']}
                                                    </p>

                                                    <p class="portrait-detail">
                                                        ${res['content'][i]['case_number']}套案例
                                                    </p>
                                                </div>
                                            </a>
                                        </div>`;
                }

                // 动态生成设计师-end
                let portrait_bx=document.querySelectorAll(".portrait-bx");
                for (var p of portrait_bx){
                    p.onclick=function () {
                        location.href="designer_detail.html?designer_id="+this.id;
                    }
                }

            } else {
                alert(res["status_text"]);
            }
        });
})();


//用户信息
var token=window.localStorage && window.localStorage.getItem('token');
var user_id=window.localStorage && window.localStorage.getItem('user_id');
var nickname=window.localStorage && window.localStorage.getItem('nickname');

var virtual_login=document.querySelector('.virtual_login')
var virtual_info=document.querySelector('.virtual_info')
var select_house=document.querySelector('.select-house')


// 预约按钮-begin
var replay_btn=document.querySelectorAll('.replay_btn');

for (var replay of replay_btn) {

    replay.onclick=function () {
        modal.style.display = "block";

        if (token) {
            getData("http://127.0.0.1:8080/api/user/checkToken/", null,{"token": token},
                function (res) {
                    if (res && res["status_code"] === "10003") {

                        // 登陆成功




                    }else {

                        // 登陆过期
                        virtual_info.style.display="none";

                    }
                });

        } else {

            // 未登录
        }
    };
}

// 预约按钮-end




// 预约模态框-begin
var close = document.querySelector('.close');

close.onclick= function(){
    modal.style.display = "none";
};

// 预约模态框-end

// 收藏按钮-begin
var pg_click=document.querySelector('#pg-block-click');
var span=pg_click.children[0];
var txt=pg_click.lastChild;

pg_click.onclick=function () {
    // alert(span.classList);

    span.classList.toggle('collect-icon');
    if (txt.nodeValue=='已收藏') {
        txt.nodeValue='收藏';
    }else {
        txt.nodeValue='已收藏';
    }
};
// 收藏按钮-end


// 立即预约按钮-begin
var submit_btn=document.querySelector('.submit_btn');
submit_btn.onclick=function () {
    alert('点击事件!!!')
}
// 立即预约按钮-end


// 房屋选择-begin
var house_select=document.querySelector('#house_select');
house_select.onchange=function () {

    if(this.value==0) {
        alert('111');
        submit_btn.disabled='true';
    }
    else{
        alert('222');
        submit_btn.disabled='false';
    }
};

// 房屋选择-end


// 认证信息浮现-begin
var license=document.querySelectorAll('.license');

for (var lic of license) {
    lic.onmouseover=function () {
        this.firstElementChild.style.display='block';
    };

    lic.onmouseout=function () {
        this.firstElementChild.style.display='none';
    };
}

// 认证信息浮现-end


// 右侧广告悬浮-begin
var company_right=document.querySelector(".company-right"),
    H = 0,
    Y = company_right;
while (Y) {
    H += Y.offsetTop;
    Y = Y.offsetParent;
}

window.onscroll = function()
{
    var s = document.body.scrollTop || document.documentElement.scrollTop;
    if(s>H) {

        // company_right.style = "position:fixed;top:80px;left:76.8%;right:auto; width:15.1%;";
        company_right.style = "position:fixed;top: 120px; left: auto; right: auto; margin-left: 20px;"
    } else {
        company_right.style = "position: relative; top: 0px; left: auto; right: auto; margin-left: 20px;"
    }
};

// 右侧广告悬浮-end






