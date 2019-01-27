(function () {
    var center_left=document.querySelector('.container_center_left');
    //初始让个人中心首页显示出来
    center_left.nextElementSibling.children[0].style.display='block';

    var flag=true;
    var flags=true;
    center_left.onclick=function (event) {
        //  展开与收起
        var et=event.target;
        if((et.id==='my_data'  && flag) || (et.id==="my_collect" && flags)){
            et.children[0].style.display='none';
            et.children[1].style.display='inline';
            et.children[3].style.display='block';
            flag=false;
            flags=false;
        }else if((et.parentNode.id==='my_data'  && flag) || et.parentNode.id==='my_collect'  && flags){
            et.parentNode.children[0].style.display='none';
            et.parentNode.children[1].style.display='inline';
            et.parentNode.children[3].style.display='block';
            flag=false;
            flags=false;
        }else if((et.id==='my_data' && !flag) || (et.id==="my_collect" && !flags)){
            et.children[0].style.display='inline';
            et.children[1].style.display='none';
            et.children[3].style.display='none';
            flag=true;
            flags=true;
        }else if((et.parentNode.id==='my_data'  && !flag) || et.parentNode.id==='my_collect'  && !flags){
            et.parentNode.children[0].style.display='inline';
            et.parentNode.children[1].style.display='none';
            et.parentNode.children[3].style.display='none';
            flag=true;
            flags=true;
        }


        // 点击左侧 右键对应的页面显示出来
        for(var c of center_left.nextElementSibling.children ){
            c.style.display='none';
        };
        if(et.innerText==="个人中心首页"){
            document.querySelector('.personal_index').style.display='block';
        }else if(et.innerText==='个人资料'){
            document.querySelector('.personal_info').style.display='block';
        }else if(et.innerText==='修改密码'){
            document.querySelector('.change_password').style.display='block';
        }else if(et.innerText==='账号与安全'){
            document.querySelector('.account_security').style.display='block';
        }else if(et.innerText==='我的预约'){
            document.querySelector('.personal_reservation').style.display='block';
        }else if(et.innerText==='装修案例'){
            document.querySelector('.decoration_case').style.display='block';
        }else if(et.innerText==='装修公司'){
            document.querySelector('.decoration_company').style.display='block';
        }else if(et.innerText==='装修攻略'){
            document.querySelector('.decoration_strategy').style.display='block';
        }else if(et.innerText==='装修日记'){
            document.querySelector('.decoration_diary').style.display='block';
        }else if(et.innerText==='我的日记'){
            document.querySelector('.personal_diary').style.display='block';
        }else if(et.innerText==='消息中心'){
            document.querySelector('.center_news').style.display='block';
        }else if(et.id==='my_data' || et.parentNode.id==='my_data'){
            document.querySelector('.personal_info').style.display='block';
        }else if(et.id==='my_collect' || et.parentNode.id==="my_collect"){
            document.querySelector('.decoration_case').style.display='block';
        }
    };


//    个人中心首页的房屋信息
    var add_house=document.querySelector('.add_house');
    var house_list=document.querySelector('.house_list');
    var house_info=document.querySelector('.house_info_text');
    add_house.onclick=function () {
        document.querySelector('.no_house').style.display='none';
        house_list.innerHTML+= `<table class="table table_info dis">
                            <tr>
                                <td>房屋名:</td>
                                <td><input type="text" value="" class="input" placeholder="取个名字"></td>
                            </tr>
                            <tr>
                                <td>面   积:</td>
                                <td><input type="text" value=""  placeholder="m²" class="input"></td>
                            </tr>
                            <tr>
                                <td>户   型:</td>
                                <td>
                                    <select>
                                        <option selected="selected">小户型</option>
                                        <option>一居</option>
                                        <option>二居</option>
                                        <option>三居</option>
                                        <option>四居</option>
                                        <option>复式</option>
                                        <option>别墅</option>
                                        <option>公寓</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>房屋状态:</td>
                                <td>
                                    <select>
                                        <option selected="selected">还没买房</option>
                                        <option>已买房,未拿到钥匙</option>
                                        <option>准备装修</option>
                                        <option>已定装修公司</option>
                                        <option>已装修</option>
                                    </select></td>
                            </tr>
                            <tr>
                                <td>所在地区:</td>
                                <td>
                                    <select>
                                        <option selected="selected">沧浪区</option>
                                        <option>金阊区</option>
                                        <option>吴中区</option>
                                        <option>吴江区</option>
                                        <option>相城区</option>
                                        <option>虎丘区</option>
                                        <option>平江区</option>
                                        <option>高新区</option>
                                        <option>工业园区</option>
                                    </select>
                                    <input type="text" value="" class="input">
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button class="btn btn-default submit"  id="a_btn">保存</button></td>
                            </tr>
                        </table>`;
        var submit=document.querySelector('#a_btn');
        submit.onclick=function () {
            document.querySelector('.no_house').style.display='none';
            house_list.children[0].style.display='none';
            house_info.innerHTML+=` <table class="table table_info dis">
                            <tr>
                                <td class="house_info">房屋信息:</td>
                                <td><span>${this.parentNode.parentNode.parentNode.children[0].children[1].children[0].value}</span>  <span>丨</span>
                                <span>${this.parentNode.parentNode.parentNode.children[1].children[1].children[0].value}</span> <span>丨</span>
                                 <span>小户型</span> </td>
                                <td><a href="#" class="editor">编辑</a></td>
                            </tr>

                            <tr>
                                <td>房屋状态:</td>
                                <td>还没买房</td>
                            </tr>
                            <tr>
                                <td>所在地区:</td>
                                <td>
                                    <span>沧浪区</span><span>${this.parentNode.parentNode.parentNode.children[4].children[1].children[1].value}</span>
                                </td>
                            </tr>
                        </table>`;
            var editor=document.querySelector('.editor');
            editor.onclick=function () {
                document.querySelector('.no_house').style.display='none';
                house_info.children[0].style.display='none';
                house_list.innerHTML+= `<table class="table table_info dis">
                            <tr>
                                <td>房屋名:</td>
                                <td><input type="text" value="${this.parentNode.previousElementSibling.children[0].innerText}" class="input" placeholder="取个名字"></td>
                            </tr>
                            <tr>
                                <td>面   积:</td>
                                <td><input type="text" value="${this.parentNode.previousElementSibling.children[2].innerText}"  placeholder="m²" class="input"></td>
                            </tr>
                            <tr>
                                <td>户   型:</td>
                                <td>
                                    <select>
                                        <option selected="selected">小户型</option>
                                        <option>一居</option>
                                        <option>二居</option>
                                        <option>三居</option>
                                        <option>四居</option>
                                        <option>复式</option>
                                        <option>别墅</option>
                                        <option>公寓</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>房屋状态:</td>
                                <td>
                                    <select>
                                        <option selected="selected">还没买房</option>
                                        <option>已买房,未拿到钥匙</option>
                                        <option>准备装修</option>
                                        <option>已定装修公司</option>
                                        <option>已装修</option>
                                    </select></td>
                            </tr>
                            <tr>
                                <td>所在地区:</td>
                                <td>
                                    <select>
                                        <option selected="selected">沧浪区</option>
                                        <option>金阊区</option>
                                        <option>吴中区</option>
                                        <option>吴江区</option>
                                        <option>相城区</option>
                                        <option>虎丘区</option>
                                        <option>平江区</option>
                                        <option>高新区</option>
                                        <option>工业园区</option>
                                    </select>
                                    <input type="text" value="${this.parentNode.parentNode.parentNode.children[2].children[1].children[1].innerText}" class="input">
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button class="btn btn-default submit"  id="a_btn">保存</button></td>
                            </tr>
                        </table>`;
            }
        };
    };

    // 预约
    // 动态生成预约
    var thead=document.querySelector(".reservation thead");
    var tbody=document.querySelector(".reservation tbody");
    var default_reservation=document.querySelector(".default_reservation");
    for (var i=0;i<3;i++){
        tbody.innerHTML +=`<tr>
                            <td class="td01">
                                <div class="reservation_company_icon">
                                    <img src="../image/company_logo03.jpg" alt="">
                                </div>
                                <div class="reservation_company_info">
                                    <span class="reservation_company_name">星卡星装饰</span>
                                    <div>
                                        <span>设计案例 :</span>
                                        <span class="case_num">1635</span>
                                        <span>装修工地 :</span>
                                        <span class="work_site_num">573</span>
                                    </div>
                                </div>
                            </td>
                            <td class="td02">
                                <div class="house_type">
                                    <span>户型 :</span>
                                    <span>别墅豪宅</span>
                                </div>
                                <div class="house_area">
                                    <span>面积 :</span>
                                    <span>500m平方</span>
                                </div>
                                <div class="house_address">
                                    <span>地址 :</span>
                                    <span>苏州市沧浪区</span>
                                </div>
                                <div class="house_village">
                                    <span>小区 :</span>
                                    <span>沧浪别墅</span>
                                </div>
                            </td>
                            <td class="td03">
                                <span>正在预约</span>
                            </td>
                            <td class="td04">
                                <button type="button" class="cancel">取消预约</button>
                            </td>
                        </tr>`
    }
    if (tbody.innerHTML===""){
        default_reservation.style.display="flex";
    } else{
        default_reservation.style.display="none";
    }
    var cancel_btn=document.querySelectorAll(".cancel");
    for (var c of cancel_btn){
        c.onclick=function () {
            tbody.removeChild(this.parentElement.parentElement);
            if (tbody.innerHTML===""){
                default_reservation.style.display="flex";
            } else{
                default_reservation.style.display="none";
            }
        };
    }

// 动态生成收藏页面
    var collection_case = document.querySelector(".collection_case");
    var default_case = document.querySelector(".default_case");
    var case_chk=document.querySelector(".case_chk");
    for (var i = 0; i < 3; i++) {
        collection_case.innerHTML += `<div class="collection_main">
                            <div class="check">
                                <input type="checkbox" class="chk_case">
                            </div>
                            <div class="collection_content">
                                <div class="case_img">
                                    <img src="../image/case01.png" alt="">
                                </div>
                                <div class="content_info">
                                    <span>雷女士雅居</span>
                                    <span>180m²</span>
                                    <span>/</span>
                                    <span>公寓</span>
                                    <span>/</span>
                                    <span>现代</span>
                                    <span>/</span>
                                    <span>全包</span>
                                    <div class="price">
                                        <span>装修价格 :</span>
                                        <span>30</span>万
                                    </div>
                                    <div class="collection_time">
                                        <span>2019/01/23</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
    }
    if (collection_case.innerHTML === "") {
        default_case.style.display = "flex";
        case_chk.style.display="none";
    }else{
        default_case.style.display = "none";
        case_chk.style.display="block";
    }

    var collection_company = document.querySelector(".collection_company");
    var default_company = document.querySelector(".default_company");
    var company_chk=document.querySelector(".company_chk");
    for (var i=0;i<3;i++){
        collection_company.innerHTML +=`<div class="collection_main">
                            <div class="check">
                                <input type="checkbox" class="chk_company">
                            </div>
                            <div class="collection_content">
                                <div class="company_icon">
                                    <img src="../image/company_logo03.jpg" alt="">
                                </div>
                                <div class="content_info">
                                    <span class="company_name">星卡星装饰</span>
                                    <div>
                                        <span>设计案例 :</span>
                                        <span class="case_num">1635</span>
                                        <span>装修工地 :</span>
                                        <span class="work_site_num">573</span>
                                    </div>
                                    <div class="collection_time">
                                        <span>2019/01/23</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
    }
    if (collection_company.innerHTML === "") {
        default_company.style.display = "flex";
        company_chk.style.display = "none";
    }else{
        default_company.style.display = "none";
        company_chk.style.display = "block";
    }
    var collection_strategy=document.querySelector(".collection_strategy");
    var default_strategy = document.querySelector(".default_strategy");
    var strategy_chk=document.querySelector(".strategy_chk");
    for (var i=0;i<3;i++){
        collection_strategy.innerHTML +=`<div class="collection_main">
                            <div class="check">
                                <input type="checkbox" class="chk_strategy">
                            </div>
                            <div class="collection_content">
                                <div class="image">
                                    <img src="../image/carousel03.jpg" alt="">
                                </div>
                                <div class="content_info">
                                    <span>花50块买的隔板，竟然用出空间扩大5m²的效果</span>
                                    <p>近年来，由于受到日本主妇的影响，我们也开始讲究整洁有条理，学会做收纳...</p>
                                    <div class="collection_time">
                                        <span>2019/01/23</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
    }
    if (collection_strategy.innerHTML === "") {
        default_strategy.style.display = "flex";
        strategy_chk.style.display = "none";
    }else{
        default_strategy.style.display = "none";
        strategy_chk.style.display = "block";
    }
    var collection_diary=document.querySelector(".collection_diary");
    var default_diary = document.querySelector(".default_diary");
    var diary_chk = document.querySelector(".diary_chk")
    for (var i=0;i<3;i++){
        collection_diary.innerHTML +=`<div class="collection_main">
                            <div class="check">
                                <input type="checkbox" class="chk_diary">
                            </div>
                            <div class="collection_content">
                                <div class="user_info">
                                    <img src="../image/user_icon06.jpg" alt="">
                                    <span>小猪佩奇</span>
                                </div>
                                <div class="content_info">
                                    <span>陈琴_4273·东宇南岸中旅蓝岸5-306（132m²）</span>
                                    <div class="style">
                                        <span>简约</span>
                                        <span>|</span>
                                        <span class="company">苏州市华尔居装饰工程有限公司</span>
                                    </div>
                                    <p>
                                        12月29日：墙面打磨完毕，刷好一底一面，面漆还有一点明天来补完。地暖安装完毕，开三天测试，煤气管买小了，烧水时有啸声，买了6分管改天要换一下。明天下午地板送货，款已付...</p>
                                    <div class="diary_image">
                                        <img src="../image/diary_01.jpg">
                                        <img src="../image/diary_02.jpg">
                                        <img src="../image/diary_03.jpg">
                                        <img src="../image/diary_04.jpg">
                                    </div>
                                    <div class="collection_time">
                                        <span>2019/01/23</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
    }
    if (collection_diary.innerHTML === "") {
        default_diary.style.display = "flex";
        diary_chk.style.display = "none";
    }else{
        default_diary.style.display = "none";
        diary_chk.style.display = "block";
    }
    // 全选
    var chk_all_case = document.querySelector("#chk_all_case");
    var chk_all_company = document.querySelector("#chk_all_company");
    var chk_all_strategy = document.querySelector("#chk_all_strategy");
    var chk_all_diary = document.querySelector("#chk_all_diary");
    var chk_cases = document.querySelectorAll(".chk_case");
    var chk_companys = document.querySelectorAll(".chk_company");
    var chk_strategy = document.querySelectorAll(".chk_strategy");
    var chk_diary = document.querySelectorAll(".chk_diary");

    chk_all_case.onclick = function () {
        var f = this.checked;
        for (var chk of chk_cases) {
            chk.checked = f;
        }
        if (f) {
            this.nextElementSibling.innerText = "全不选"
        } else {
            this.nextElementSibling.innerText = "全选"
        }

    };
    chk_all_company.onclick = function () {
        var f = this.checked;
        for (var chk of chk_companys) {
            chk.checked = f;
        }
        if (f) {
            this.nextElementSibling.innerText = "全不选"
        } else {
            this.nextElementSibling.innerText = "全选"
        }

    };
    chk_all_strategy.onclick = function () {
        var f = this.checked;
        for (var chk of chk_strategy) {
            chk.checked = f;
        }
        if (f) {
            this.nextElementSibling.innerText = "全不选"
        } else {
            this.nextElementSibling.innerText = "全选"
        }

    };
    chk_all_diary.onclick = function () {
        var f = this.checked;
        for (var chk of chk_diary) {
            chk.checked = f;
        }
        if (f) {
            this.nextElementSibling.innerText = "全不选"
        } else {
            this.nextElementSibling.innerText = "全选"
        }

    };


    for (var chk of chk_cases) {
        chk.onclick = function () {
            checkedAllRows(chk_all_case)
        }
    }
    for (var chk of chk_companys) {
        chk.onclick = function () {
            checkedAllRows(chk_all_company)
        }
    }
    for (var chk of chk_strategy) {
        chk.onclick = function () {
            checkedAllRows(chk_all_strategy)
        }
    }
    for (var chk of chk_diary) {
        chk.onclick = function () {
            checkedAllRows(chk_all_diary)
        }
    }

    // 检查是否是全选
    function checkedAllRows(chk_all) {
        var flag = true;
        for (var ck of chk_cases) {
            if (!ck.checked) {
                flag = false;
                break;
            }
        }
        chk_all.checked = flag;
        if (flag) {
            chk_all.nextElementSibling.innerText = "全不选"
        } else {
            chk_all.nextElementSibling.innerText = "全选"
        }
    }

    // 删除
    var delete_case = document.querySelector("#delete_case");
    delete_case.onclick = function () {
        chk_cases=document.querySelectorAll(".chk_case");
        for (var ck_case of chk_cases) {
            if (ck_case.checked) {
                collection_case.removeChild(ck_case.parentElement.parentElement);
            }
        }
        if (collection_case.innerHTML === "") {
            default_case.style.display = "flex";
            case_chk.style.display="none";
        }else{
            default_case.style.display = "none";
            case_chk.style.display="block";
        }
    };
    var delete_company = document.querySelector("#delete_company");
    delete_company.onclick = function () {
        chk_companys = document.querySelectorAll(".chk_company");
        for (var ck of chk_companys) {
            if (ck.checked) {
                collection_company.removeChild(ck.parentElement.parentElement);
            }
        }
        if (collection_company.innerHTML === "") {
            default_company.style.display = "flex";
            company_chk.style.display = "none";
        }else{
            default_company.style.display = "none";
            company_chk.style.display = "block";
        }
    };
    var delete_strategy = document.querySelector("#delete_strategy");
    delete_strategy.onclick = function () {
        chk_strategy = document.querySelectorAll(".chk_strategy");
        for (var ck of chk_strategy) {
            if (ck.checked) {
                collection_strategy.removeChild(ck.parentElement.parentElement);
            }
        }
        if (collection_strategy.innerHTML === "") {
            default_strategy.style.display = "flex";
            strategy_chk.style.display = "none";
        }else{
            default_strategy.style.display = "none";
            strategy_chk.style.display = "block";
        }
    };
    var delete_diary = document.querySelector("#delete_diary");
    delete_diary.onclick = function () {
        chk_diary = document.querySelectorAll(".chk_diary");
        for (var ck of chk_diary) {
            if (ck.checked) {
                collection_diary.removeChild(ck.parentElement.parentElement);
            }
        }
        if (collection_diary.innerHTML === "") {
            default_diary.style.display = "flex";
            diary_chk.style.display = "none";
        }else{
            default_diary.style.display = "none";
            diary_chk.style.display = "block";
        }
    };




    // 我的日记
    var edit_btn=document.querySelector(' .btn_edit');

    edit_btn.onclick=function () {
        alert('点击事件!!!');
    };

    var continue_btn=document.querySelector('.btn_continue');
    continue_btn.onclick=function () {
        alert('点击事件!!!');
    };


    var create_btn=document.querySelector('.btn_create');
    create_btn.onclick=function() {
        alert('点击事件!!!');

    };

    var create_btn=document.querySelector('.btn_instant');
    create_btn.onclick=function() {
        alert('点击事件!!!');

    };


})();
