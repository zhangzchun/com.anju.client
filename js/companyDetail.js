
(function () {

    // 公司名
    var company_name=document.querySelectorAll('.company_name');

    for (var name of company_name) {
        name.innerText='雅私阁装饰';
    }

    // 保证金
    var bond=document.querySelector('.bond');
    bond.innerText='￥10000';

    // 口碑值
    var mouth_value=document.querySelectorAll('.mouth-value');

    for (var mouth of mouth_value) {
        mouth.innerText='3029';
    }

    // 设计案例数
    var case_num=document.querySelector('.case_num');
    case_num.innerText='8495';

    // 装修工地数
    var work_site_num=document.querySelector('.work_site_num');
    work_site_num.innerText='2495';


    // 好评率
    var favorable_rate=document.querySelector('.favorable_rate');
    favorable_rate.innerText='86%';

    // 联系电话
    var contact_tel=document.querySelector('.head-com-tel');
    contact_tel.innerHTML+='17186408058';

    // 地址
    var address=document.querySelector('.address');
    address.innerText+='平江区江星广场1号楼四楼';




// 动态生成设计案例-begin

var case_row =document.querySelector('.case-cont');

for (var i=0;i<6;i++) {
    case_row.innerHTML+=`            <div class="card-bx col-xs-4 col-sm-4 col-md-4">
                                            <a href="">
                                            <div class="img-ct">
                                                <img src="../image/20181013_549510fca51254e5c38cobhkqj7fyee0_335x228M.jpg"/>

                                            </div>
                                            <div class="card-info">
                                                <p class="card-name ect">雅私阁装饰</p>
                                                <p class="card-detail">333m² / 公寓 / 其他 / 全包</p>
                                                <p class="card-cost ect">
                                                    <span>
                                                        11
                                                    </span>
                                                    万
                                                </p>
                                            </div>
                                        </a>
                                    </div>
`;
}

// 动态生成设计案例-end


// 动态生成设计师-begin

var row_portrait=document.querySelector('.portrait-cont');

for (var i=0; i<4;i++) {
    row_portrait.innerHTML+=`                                    <div class="portrait-bx col-sm-6 col-md-3">
                                        <a href="#" target="_blank">
                                            <div class="img-ct">
                                                <img class="img--lazy" src="../image/20180710_e7b7775941a6e42102b6afd207a594c8.jpg" data-original="" alt="设计师头像" style="display: inline;">
                                            </div>

                                            <div class="portrait-info">
                                                <p class="portrait-name">
                                                    首席设计师
                                                </p>

                                                <p class="portrait-detail">
                                                    113套案例
                                                </p>
                                            </div>
                                        </a>
                                    </div>
`;
}

// 动态生成设计师-end

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
        company_right.style = "position:fixed;top: 20px; left: auto; right: auto; margin-left: 20px;"
    } else {
        company_right.style = "position: relative; top: 0px; left: auto; right: auto; margin-left: 20px;"
    }
};
// 右侧广告悬浮-end


// 预约按钮-begin
    var replay_btn=document.querySelector('#replay_btn');

    replay_btn.onclick=function () {
        modal.style.display = "block";
    };

// 预约按钮-end


// 右侧按钮-begin

var btn_dark=document.querySelector('.btn-dark');

btn_dark.onclick=function () {
    modal.style.display = "block";
};
// 右侧按钮-end


// 预约模态框-begin

var close = document.querySelector('.close');

close.onclick= function(){
    modal.style.display = "none";
};
cancel.onclick= function(){
    modal.style.display = "none";

};
// 预约模态框-end


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

})();





