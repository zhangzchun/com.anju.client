(function () {

    // 页面跳转
    window.sessionStorage.setItem('from', location.href);

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


// 收藏

// 动态生成案例收藏页面
    var collection_case = document.querySelector(".collection_case");
    var default_case = document.querySelector(".default_case");
    var case_chk=document.querySelector(".case_chk");
    getData("http://127.0.0.1:8080/api/user/collectList/",{"collect_type":"case","user_id":1},null,function (res) {
        for (var r of res["content"]) {
            collection_case.innerHTML += `<div class="collection_main case_main" id="${r["id"]}">
                            <div class="check">
                                <input type="checkbox" class="chk_case">
                            </div>
                            <div class="collection_content">
                                <div class="case_img">
                                    <img src="${r["img_url"]}" alt="">
                                </div>
                                <div class="content_info">
                                    <span>${r["name"]}</span>
                                    <span>${r["area"]}</span>
                                    <span>/</span>
                                    <span>${r["house_type"]}</span>
                                    <span>/</span>
                                    <span>${r["style_name"]}</span>
                                    <span>/</span>
                                    <span>${r["renovation_type"]}</span>
                                    <div class="price">
                                        <span>装修价格 :</span>
                                        <span>${r["price"]}</span>万
                                    </div>
                                    <div class="collection_time">
                                        <span>${r["collect_date"]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
        }
        var chk_all_case = document.querySelector("#chk_all_case");
        var chk_cases = document.querySelectorAll(".chk_case");
        var delete_case = document.querySelector("#delete_case");
        chk_all(chk_all_case,chk_cases);
        checkedAllRows(chk_all_case , chk_cases);
        delete_collect(delete_case,".chk_case",collection_case,default_case,case_chk);
        changePage(collection_case,default_case,case_chk);

        var case_main=document.querySelectorAll(".case_main");
        for (var cm of case_main) {
            cm.onclick=function () {
                location.href="case_detail.html?case_id="+this.id;
            }
        }
    });


// 动态生成公司收藏页面
    var collection_company = document.querySelector(".collection_company");
    var default_company = document.querySelector(".default_company");
    var company_chk=document.querySelector(".company_chk");
    getData("http://127.0.0.1:8080/api/user/collectList/",{"collect_type":"company","user_id":1},null,function (res) {
        for (var r of res["content"]) {
            collection_company.innerHTML +=`<div class="collection_main company_main" id="${r["id"]}">
                            <div class="check">
                                <input type="checkbox" class="chk_company">
                            </div>
                            <div class="collection_content">
                                <div class="company_icon">
                                    <img src="${r["company_icon"]}" alt="">
                                </div>
                                <div class="content_info">
                                    <span class="company_name">${r["name"]}</span>
                                    <div>
                                        <span>设计案例 :</span>
                                        <span class="case_num">${r["case_num"]}</span>
                                        <span>装修工地 :</span>
                                        <span class="work_site_num">${r["work_site_num"]}</span>
                                    </div>
                                    <span>联系电话 :</span>
                                    <span class="tel">${r["contact_tel"]}</span>
                                    <div class="collection_time">
                                        <span>${r["contact_tel"]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
        }
        var delete_company = document.querySelector("#delete_company");
        var chk_companys = document.querySelectorAll(".chk_company");
        var chk_all_company = document.querySelector("#chk_all_company");
        chk_all(chk_all_company,chk_companys);
        checkedAllRows(chk_all_company , chk_companys);
        delete_collect(delete_company,".chk_company",collection_company,default_company,company_chk);
        changePage(collection_company,default_company,company_chk);

        var company_main=document.querySelectorAll(".company_main");
        for (var cm of company_main) {
            cm.onclick=function () {
                location.href="companyDetail.html?company_id="+this.id;
            }
        }
    });


// 动态生成攻略收藏页面
    var collection_strategy=document.querySelector(".collection_strategy");
    var default_strategy = document.querySelector(".default_strategy");
    var strategy_chk=document.querySelector(".strategy_chk");
    getData("http://127.0.0.1:8080/api/user/collectList/",{"collect_type":"strategy","user_id":1},null,function (res) {
        for (var r of res["content"]) {
            collection_strategy.innerHTML += `<div class="collection_main strategy_main" id="${r["id"]}">
                            <div class="check">
                                <input type="checkbox" class="chk_strategy">
                            </div>
                            <div class="collection_content">
                                <div class="image">
                                    <img src="${r["strategy_img"]}" alt="">
                                </div>
                                <div class="content_info">
                                    <span>${r["strategy_title"]}</span>
                                    <p>${r["lead"]}</p>
                                    <div class="collection_time">
                                        <span>${r["collect_date"]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
        }
        var strategy_text = document.querySelectorAll(".content_info p");
        for (var p of strategy_text) {
            if (p.innerText.length > 80) {
                p.innerText = p.innerText.substring(0, 80) + "...";
            }
        }
        var chk_strategy = document.querySelectorAll(".chk_strategy");
        var delete_strategy = document.querySelector("#delete_strategy");
        var chk_all_strategy = document.querySelector("#chk_all_strategy");
        chk_all(chk_all_strategy,chk_strategy);
        checkedAllRows(chk_all_strategy , chk_strategy);
        delete_collect(delete_strategy,".chk_strategy",collection_strategy,default_strategy,strategy_chk);
        changePage(collection_strategy, default_strategy, strategy_chk);

        var strategy_main=document.querySelectorAll(".strategy_main");
        for (var sm of strategy_main) {
            sm.onclick=function () {
                location.href="strategy_info.html?strategy_id="+this.id;
            }
        }
    });


// 动态生成日记收藏页面
    var collection_diary=document.querySelector(".collection_diary");
    var default_diary = document.querySelector(".default_diary");
    var diary_chk = document.querySelector(".diary_chk");
    getData("http://127.0.0.1:8080/api/user/collectList/",{"collect_type":"diary","user_id":1},null,function (res) {
        for (var r of res["content"]) {
            var s="";
            for (var img of r["diary_img"]){
                s += `<img src="${img}">`
            }
            collection_diary.innerHTML +=`<div class="collection_main diary_main" id="${r["diary_id"]}">
                            <div class="check">
                                <input type="checkbox" class="chk_diary">
                            </div>
                            <div class="collection_content">
                                <div class="user_info">
                                    <img src="${r["icon"]}" alt="">
                                    <span>${r["nickname"]}</span>
                                </div>
                                <div class="content_info">
                                    <span>${r["diary_title"]}</span>
                                    <div class="style">
                                        <span>${r["style_name"]}</span>
                                        <span>|</span>
                                        <span class="company">${r["company"]}</span>
                                    </div>
                                    <p>${r["diary_content"]}</p>
                                    <div class="diary_image">${s}</div>
                                    <div class="collection_time">
                                        <span>${r["collect_date"]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
        }
        var diary_text = document.querySelectorAll(".content_info p");
        for (var p of diary_text) {
            if (p.innerText.length > 60) {
                p.innerText = p.innerText.substring(0, 60) + "...";
            }
        }

        var chk_all_diary = document.querySelector("#chk_all_diary");
        var chk_diary = document.querySelectorAll(".chk_diary");
        var delete_diary = document.querySelector("#delete_diary");
        changePage(collection_diary,default_diary,diary_chk);
        checkedAllRows(chk_all_diary , chk_diary);
        chk_all(chk_all_diary,chk_diary);
        delete_collect(delete_diary,".chk_diary",collection_diary,default_diary,diary_chk);

        var diary_main=document.querySelectorAll(".diary_main");
        for (var dm of diary_main) {
            dm.onclick=function () {
                location.href="diary_info.html?diary_id="+this.id;
            }
        }
    });



// 判断是否有收藏
    function changePage(collection,default_f,f_chk) {
        if (collection.innerHTML === "") {
            default_f.style.display = "flex";
            f_chk.style.display = "none";
        }else{
            default_f.style.display = "none";
            f_chk.style.display = "block";
        }
    }

// 全选
    function chk_all(chk_all,chks) {
        chk_all.onclick = function () {
            var f = this.checked;
            for (var chk of chks) {
                chk.checked = f;
            }
            if (f) {
                this.nextElementSibling.innerText = "全不选"
            } else {
                this.nextElementSibling.innerText = "全选"
            }

        };

    }

// 检查是否是全选
    function checkedAllRows(chk_all,chks) {
        for (var chk of chks) {
            chk.onclick = function () {
                var flag = true;
                for (var ck of chks) {
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
        }

    }

    var collection_main=document.querySelectorAll(".collection_main");
    for (var cm of collection_main) {
        cm.onclick=function () {
            location.href="strategy_info.html?strategy_id="+this.id;
        }
    }




    // 删除
    function delete_collect(delete_f,chk,collection,default_f,f_chk) {
        delete_f.onclick = function () {
            var chks=document.querySelectorAll(chk);
            for (var ck of chks) {
                if (ck.checked) {
                    collection.removeChild(ck.parentElement.parentElement);
                }
            }
            if (collection.innerHTML === "") {
                default_f.style.display = "flex";
                f_chk.style.display="none";
            }else{
                default_f.style.display = "none";
                f_chk.style.display="block";
            }
        };
    }


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
