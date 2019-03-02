(function () {

    // 页面跳转
    window.sessionStorage.setItem('from', location.href);

    var center_left=document.querySelector('.container_center_left');
    //初始让个人中心首页显示出来
    center_left.nextElementSibling.children[0].style.display='block';
    //用户token
    var token = window.localStorage && window.localStorage.getItem('token');
    //用户id
    var user_id=window.localStorage && window.localStorage.getItem('user_id');


    // 导航开始
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
//昵称显示
    var exit=document.querySelector(".exit");

    exit.onclick=function () {
        localStorage.clear();
        location.href="../index.html";
    };

    // 导航结束



    var flag=true;
    var flags=true;
    center_left.onclick=function (event) {
        //  展开与收起
        var et=event.target;
        if((et.id==='my_data'  && flag) || (et.id==="my_collect" && flags)){
            et.children[0].style.display = 'none';
            et.children[1].style.display = 'inline';
            et.children[3].style.display = 'block';
            flag = false;
            flags = false;
        } else if ((et.parentNode.id === 'my_data' && flag) || et.parentNode.id === 'my_collect' && flags) {
            et.parentNode.children[0].style.display = 'none';
            et.parentNode.children[1].style.display = 'inline';
            et.parentNode.children[3].style.display = 'block';
            flag = false;
            flags = false;
        } else if ((et.id === 'my_data' && !flag) || (et.id === "my_collect" && !flags)) {
            et.children[0].style.display = 'inline';
            et.children[1].style.display = 'none';
            et.children[3].style.display = 'none';
            flag = true;
            flags = true;
        } else if ((et.parentNode.id === 'my_data' && !flag) || et.parentNode.id === 'my_collect' && !flags) {
            et.parentNode.children[0].style.display = 'inline';
            et.parentNode.children[1].style.display = 'none';
            et.parentNode.children[3].style.display = 'none';
            flag = true;
            flags = true;
        }


        // 点击左侧 右键对应的页面显示出来
        for (var c of center_left.nextElementSibling.children) {
            c.style.display = 'none';
        };
        if (et.innerText === "个人中心首页") {
            document.querySelector('.personal_index').style.display = 'block';
        } else if (et.innerText === '个人资料') {
            document.querySelector('.personal_info').style.display = 'block';
        } else if (et.innerText === '修改密码') {
            document.querySelector('.change_password').style.display = 'block';
        } else if (et.innerText === '账号与安全') {
            document.querySelector('.account_security').style.display = 'block';
        } else if (et.innerText === '我的预约') {
            document.querySelector('.personal_reservation').style.display = 'block';
        } else if (et.innerText === '装修案例') {
            document.querySelector('.decoration_case').style.display = 'block';
        } else if (et.innerText === '装修公司') {
            document.querySelector('.decoration_company').style.display = 'block';
        } else if (et.innerText === '装修攻略') {
            document.querySelector('.decoration_strategy').style.display = 'block';
        } else if (et.innerText === '装修日记') {
            document.querySelector('.decoration_diary').style.display = 'block';
        } else if (et.innerText === '我的日记') {
            document.querySelector('.personal_diary').style.display = 'block';
        } else if (et.innerText === '消息中心') {
            document.querySelector('.center_news').style.display = 'block';
        } else if (et.id === 'my_data' || et.parentNode.id === 'my_data') {
            document.querySelector('.personal_info').style.display = 'block';
        } else if (et.id === 'my_collect' || et.parentNode.id === "my_collect") {
            document.querySelector('.decoration_case').style.display = 'block';
        }
    };


//    个人中心首页的房屋信息
    var my_house = document.querySelector('.my_house');
    var no_house=document.querySelector('.no_house');
    var house_list = document.querySelector('.house_list');
    var house_info = document.querySelector('.house_info_text');
    var change_houseInfo = document.querySelector('.change_houseInfo');
    var f = true;
    var m = true;
    var user_id = window.localStorage.getItem('user_id');
    // 个人中心首页
    my_house.onclick = function (event) {
        if (event.target.className === 'add_house' && f) {
            document.querySelector('.no_house').style.display = 'none';
            house_list.style.display = 'block';
            house_list.innerHTML = `<table class="table table_info dis">
                            <tr>
                                <td>房屋名:</td>
                                <td><input type="text" value="" class="input house_name" placeholder="取个名字"></td>
                            </tr>
                            <tr>
                                <td>面   积:</td>
                                <td><input type="text" value=""  placeholder="m²" class="input house_area"></td>
                            </tr>
                            <tr>
                                <td>户   型:</td>
                                <td><select id="house_type">
                                        <option>小户型</option>
                                        <option>一居</option>
                                        <option selected="selected">二居</option>
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
                                    <select id="reno_type">
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
                                    <select id="district">
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
                                    <input type="text" value="" class="input district">
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button class="btn btn-default submit" id="save">保存</button></td>
                            </tr>
                        </table>`;
            f = false;
        } else if (event.target.id === 'save') {
            var house_type = document.querySelector('#house_type');
            var status = document.querySelector('#reno_type');
            var district = document.querySelector('#district');
            var house_name = document.querySelector('.house_name');
            var house_area = document.querySelector('.house_area');
            var h_district = document.querySelector('.district');
            var info = {
                'house_name': house_name.value,
                'area': house_area.value,
                'house_type': house_type.value,
                'house_status': status.value,
                'address': district.value,
                'village': h_district.value,
                'user_id': user_id
            };
            // 判断输入的面积是否为数字
            var re = /^[0-9]+.?[0-9]*/;
            var t=re.test(house_area.value);
            if(t){
                house_list.style.display = 'none';
                postData('http://47.102.45.80:8080/api/user/houseInfo/', info,null, function (results) {
                    if (results && results['status_code'] === '10012') {
                        //是渲染增加的那条还是将所有房屋都取出来渲染????
                        //取所有的信息渲染,因为点击保存的时候还没有house_id

                        let id={'user_id':user_id,'house_id':''};
                        postData('http://47.102.45.80:8080/api/user/houseList/', id,{"token": token}, function (res) {
                            if(res && res['status_code']==='10009'){
                                if(res['content']){
                                    no_house.style.display='none';
                                    house_info.innerHTML='';
                                    for(var r of res['content']){
                                        house_info.innerHTML += ` <div id="${r['id']}"><table class="table table_info dis"">
​                            <tr>
​                                <td class="house_info">房屋信息:</td>
​                                <td><span>${r['house_name']}</span>  <span>丨</span>
​                                <span>${r['area']}m²</span> <span>丨</span>
​                                 <span>${r['house_type']}</span> </td>
​                                <td><a href="#" class="editor">编辑</a></td>
​                            </tr>

                            <tr>
                                <td>房屋状态:</td>
                                <td>${r['house_status']}</td>
                            </tr>
                            <tr>
                                <td>所在地区:</td>
                                <td>
                                    <span>${r['address']}</span><span>${r['village']}</span>
​                                </td>
​                            </tr></div>`;
                                    }
                                }
                            }else if(res && res['status_code']==='10006'){
                                location.href="login.html"
                            }else {
                                alert(res['status_text']);
                            }
                        })
                    } else {
                        alert(res['status_text']);
                    }
                });
            }
            else {
                house_area.value='';
                house_area.placeholder='请输入数字'
            }
            f = true;
        } else if (event.target.className === 'editor' && m) {
            //如何根据取出来的id判断所处的位置   下同此
            event.target.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML = `<table class="table table_info dis">
                            <tr>
                                <td>房屋名:</td>
                                <td><input type="text" value="" class="input u_house_name" placeholder="取个名字"></td>
                            </tr>
                            <tr>
                                <td>面   积:</td>
                                <td><input type="text" value=""  placeholder="m²" class="input u_house_area"></td>
                            </tr>
                            <tr>
                                <td>户   型:</td>
                                <td><select id="u_house_type">
                                        <option>小户型</option>
                                        <option>一居</option>
                                        <option>二居</option>
                                        <option  selected="selected">三居</option>
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
                                    <select id="u_reno_type">
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
                                    <select id="u_district">
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
                                    <input type="text" value="" class="input u_district">
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button class="btn btn-default submit" id="update">保存</button></td>
                            </tr>
                        </table>`;
            m=false;
        }else if (event.target.id === 'update'){
            var u_house_type = document.querySelector('#u_house_type');
            var u_status = document.querySelector('#u_reno_type');
            var u_district = document.querySelector('#u_district');
            var u_house_name = document.querySelector('.u_house_name');
            var u_house_area = document.querySelector('.u_house_area');
            var u_h_district = document.querySelector('.u_district');
            var u_info = {
                'house_name': u_house_name.value,
                'area': u_house_area.value,
                'house_type': u_house_type.value,
                'house_status': u_status.value,
                'address': u_district.value,
                'village': u_h_district.value,
                'house_id': event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id
            };
            // 更新房屋信息
            postData('http://47.102.45.80:8080/api/user/updateHouseInfo/', u_info,null, function (res) {
                if (res && res['status_code'] === '10012') {
                    let info_id={'user_id':user_id,'house_id':event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id};
                    postData('http://47.102.45.80:8080/api/user/houseList/', info_id,{"token": token},function (info) {
                        if(info && info['status_code'] === '10009'){
                            event.target.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML = ` <table class="table table_info dis">
​                            <tr>
​                                <td class="house_info">房屋信息:</td>
​                                <td><span>${info['content'][0]['house_name']}</span>  <span>丨</span>
​                                <span>${info['content'][0]['area']}m²</span> <span>丨</span>
​                                 <span>${info['content'][0]['house_type']}</span> </td>
​                                <td><a href="#" class="editor">编辑</a></td>
​                            </tr>

                            <tr>
                                <td>房屋状态:</td>
                                <td>${info['content'][0]['house_status']}</td>
                            </tr>
                            <tr>
                                <td>所在地区:</td>
                                <td>
                                    <span>${info['content'][0]['address']}</span><span>${info['content'][0]['village']}</span>
​                                </td>
​                            </tr>`;
                        }else if(res && res['status_code']==='10006'){
                            location.href="login.html"
                        }else {
                            alert(info['status_text']);
                        }
                    })
                } else {
                    alert(res['status_text']);
                }
            });
            m=true;
        }
    };
    //获取个人中心首页信息
    let id={'user_id':user_id,'house_id':''};
    postData('http://47.102.45.80:8080/api/user/getUserInfo/', id,null, function (res) {
        if(res && res['status_code']==='10009'){
            let user_icon=document.querySelector('.user_Icon');
            let user_name=document.querySelectorAll('.user_name');
            let user_nickname=document.querySelector('.user_nickname');
            let user_Id=document.querySelector('.user_id');
            let Man=document.querySelector('.M');
            let Female=document.querySelector('.F');
            let QQ=document.querySelector('.QQ');
            let address=document.querySelector('.address');
            let icon=document.querySelector('.icon');
            let progress_bar=document.querySelector('.progress_bar');
            let detail=document.querySelector('.detail');
            let telephone=document.querySelector('.telephone');
            user_icon.src.innerText=res['content'][0]['icon'];
            user_name[0].innerText=res['content'][0]['nickname'];
            user_name[1].innerText=res['content'][0]['nickname'];
            user_nickname.innerHTML=`${res['content'][0]['nickname']}`;
            user_Id.innerText=user_id;
            telephone.innerText=res['content'][0]['telephone'].substring(0,3)+'*****'+res['content'][0]['telephone'].substring(8);
            if(res['content'][0]['sex']==='男'){
                Man.checked='checked';
            }else {
                Female.checked='checked';
            }
            if(res['content'][0]['QQ']){
                QQ.innerHTML=`${res['content'][0]['QQ']}`
            }
            if(res['content'][0]['address']){
                address.innerHTML=`${res['content'][0]['address']}`
            }
            icon.src.innerText=res['content'][0]['icon'];
            if(Boolean(QQ.innerText) && !Boolean(address.innerText.substring(3))){
                progress_bar.style.width='154px';
                progress_bar.innerText='70%';
                detail.innerText='完善地区+10%'
            }else if(!Boolean(QQ.innerText) && Boolean(address.innerText.substring(3))){
                progress_bar.style.width='132px';
                progress_bar.innerText='60%';
                detail.innerText='完善QQ+20%'
            }else if(Boolean(QQ.innerText) && Boolean(address.innerText.substring(3))){
                progress_bar.style.width='176px';
                progress_bar.innerText='80%';
                detail.innerText=''
            }
        }
    });
    // 获取房屋信息
    postData('http://47.102.45.80:8080/api/user/houseList/', id,{"token": token}, function (res) {

        if(res && res['status_code']==='10009'){
            if(res['content']){
                no_house.style.display='none'
                for(var r of res['content']){
                    house_info.innerHTML += ` <div id="${r['id']}"><table class="table table_info dis"">
​                            <tr>
​                                <td class="house_info">房屋信息:</td>
​                                <td><span>${r['house_name']}</span>  <span>丨</span>
​                                <span>${r['area']}m²</span> <span>丨</span>
​                                 <span>${r['house_type']}</span> </td>
​                                <td><a href="#" class="editor">编辑</a></td>
​                            </tr>

                            <tr>
                                <td>房屋状态:</td>
                                <td>${r['house_status']}</td>
                            </tr>
                            <tr>
                                <td>所在地区:</td>
                                <td>
                                    <span>${r['address']}</span><span>${r['village']}</span>
​                                </td>
​                            </tr></div>`;
                }
            }
        }else if(res && res['status_code']==='10006'){
            location.href="login.html"
        }

    });
    //个人资料点击事件
    var info_container=document.querySelector('.info_container');
    info_container.onclick=function (event) {
        if(event.target.id==='add'){
            let Man=document.querySelector('.M');
            let Female=document.querySelector('.F');
            let user_nickname=document.querySelector('.user_nickname');
            let district=document.querySelector('#district');
            let village=document.querySelector('#village');
            let QQ=document.querySelector('.QQ');
            var inputs=document.getElementsByName('sex');
            var sex='';
            var sex_id=0;
            for(let input of inputs){
                if(input.checked){
                    sex=input.value
                }
            }
            if(sex==='男'){
                sex_id=0;
            }else if(sex==='女'){
                sex_id=1;
            }
            let con={'nickname':user_nickname.children[0].value,'sex_id':sex_id,'QQ':QQ.children[0].value,'address':district.value+village.value,'id':user_id}
            postData('http://47.102.45.80:8080/api/user/changeUserInfo/',con,null,function (res) {
                if(res && res['status_code']==='10012'){
                    postData('http://47.102.45.80:8080/api/user/getUserInfo/', id,null, function (res) {
                        if(res && res['status_code']==='10009'){
                            let user_icon=document.querySelector('.user_Icon');
                            let user_name=document.querySelectorAll('.user_name');
                            let user_nickname=document.querySelector('.user_nickname');
                            let user_Id=document.querySelector('.user_id');
                            let Man=document.querySelector('.M');
                            let Female=document.querySelector('.F');
                            let QQ=document.querySelector('.QQ');
                            let address=document.querySelector('.address');
                            let icon=document.querySelector('.icon');
                            let progress_bar=document.querySelector('.progress_bar');
                            let detail=document.querySelector('.detail');
                            user_icon.style.src.innerText=res['content'][0]['icon'];
                            user_name[0].innerText=res['content'][0]['nickname'];
                            user_name[1].innerText=res['content'][0]['nickname'];
                            user_nickname.innerHTML=`${res['content'][0]['nickname']}`
                            user_Id.innerText=user_id;
                            if(res['content'][0]['sex']==='男'){
                                Man.checked='checked';
                            }else {
                                Female.checked='checked';
                            }
                            if(res['content'][0]['QQ']){
                                QQ.innerHTML=`${res['content'][0]['QQ']}`
                            }
                            if(res['content'][0]['address']){
                                address.innerHTML=`${res['content'][0]['address']}`
                            }
                            icon.src.innerText=res['content'][0]['icon'];

                            if(Boolean(QQ.innerText) && !Boolean(address.innerText.substring(3))){
                                progress_bar.style.width='154px';
                                progress_bar.innerText='70%';
                                detail.innerText='完善地区+10%'
                            }else if(!Boolean(QQ.innerText) && Boolean(address.innerText.substring(3))){
                                progress_bar.style.width='132px';
                                progress_bar.innerText='60%';
                                detail.innerText='完善QQ+20%'
                            }else if(Boolean(QQ.innerText) && Boolean(address.innerText.substring(3))){
                                progress_bar.style.width='176px';
                                progress_bar.innerText='80%';
                                detail.innerText=''
                            }
                        }
                    });
                }else{
                    alert(res['status_text'])
                }
            })
        }else if(event.target.id==='change'){
            let user_nickname=document.querySelector('.user_nickname');
            let QQ=document.querySelector('.QQ');
            let address=document.querySelector('.address');
            user_nickname.innerHTML=`<input type="text"  class="user_nickname">`
            QQ.innerHTML=`<input type="text" placeholder="提交时请填写正确的QQ号">`;
            address.innerHTML=`<select id="district">
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
                                    <input type="text" placeholder="请输入详细地址" id="village">`
        }
    };


//修改密码
        // 获取验证码
    var identify_code=document.querySelector('.identifying_code');
    getData('http://47.102.45.80:8080/api/user/getIdentifyingCode/', null,null, function (res) {
        if(res && res['status_code']==='10009'){
            identify_code.innerHTML=`<img src="${res['content']['url_code']}" alt="" id="${res['content']['id']}"><a href="#" class="change_code">看不清,换一张</a>`
        }
    });
        //修改密码点击事件
    var changePassword=document.querySelector('.change_password');
    var old_password=document.querySelector('#old_password');
    var new_password=document.querySelector('#new_password');
    var password_confirm=document.querySelector('#password_confirm');
    var old_password_error=document.querySelector('.old_password_error');
    var new_password_s=document.querySelector('.new_password_s');
    var new_password_error=document.querySelector('.new_password_error');
    var password_error=document.querySelector('.password_error');
    var check_s=document.querySelector('.check_result_s');
    var check_f=document.querySelector('.check_result_f');
    changePassword.onclick=function (event) {
        if(event.target.className==='change_code'){
            getData('http://47.102.45.80:8080/api/user/getIdentifyingCode/', null,null, function (res) {
                if(res && res['status_code']==='10009'){
                    identify_code.innerHTML=`<img src="${res['content']['url_code']}" alt="" id="${res['content']['id']}"><a href="#" class="change_code">看不清,换一张</a>`
                }
            })
        }else if(event.target.id==='push_code'){
            let input=document.querySelector('.input_code');
            let info={"code_id":identify_code.children[0].id,"content":input.value};
            postData('http://47.102.45.80:8080/api/user/getIdentifyingCode/', info,null, function (res) {
                if(res && res['status_code']==='10009'){
                    check_s.innerText='√  验证成功';
                    check_f.innerText=''
                }else {
                    check_s.innerText='';
                    check_f.innerText='×  验证失败'
                }
            })
        }else if(event.target.id==='change_password' && check_s.innerText!==''){
            if(checkPassword() && checkConfirm()){
            let info={"user_id":user_id,"old_password":old_password.value,"new_password":new_password.value};
            postData('http://47.102.45.80:8080/api/user/changePassword/', info,null, function (res) {
                if(res && res['status_code']==='10012'){
                    new_password_s.innerText='修改成功';
                    location.href="personal_center.html?user_id="+user_id;
                }else {
                    old_password_error.innerText='密码错误';
                }
            })
        }
        }else if(event.target.id==='change_password' && check_s.innerText===''){
            check_f.innerText='请输入验证码'
        }
    };

function checkPassword() {
    let regMobile=/^\w{6,}$/;
    if(new_password.value){
        if(regMobile.test(new_password.value)){
            new_password_error.innerText='';
            return true;
        }else {
            new_password_error.innerText='*密码必须大于六位';
            return false;
        }
    }else {
        new_password_error.innerText='*密码不能为空';
        return false;
    }
}

function checkConfirm() {
    if(password_confirm.value===new_password.value){
        password_error.innerText='';
        return true
    }else {
        password_error.innerText='*两次密码不一致';
        return false;
    }
}







// 预约
// 动态生成预约
    var tbody=document.querySelector(".reservation tbody");
    var default_reservation=document.querySelector(".default_reservation");
    getData("http://47.102.45.80:8080/api/user/getAppointments/",{"user_id":user_id},null,function (res) {
        if (res && res["status_code"]=="10009"){
            for(var r of res["content"]){
                tbody.innerHTML +=`<tr id="${r["id"]}">
                            <td class="td01">
                                <div class="reservation_company_icon">
                                    <img src="${r["company_icon"]}" alt="">
                                </div>
                                <div class="reservation_company_info">
                                    <span class="reservation_company_name">${r["company_name"]}</span>
                                    <div>
                                        <span>设计案例 :</span>
                                        <span class="case_num">${r["case_num"]}</span>
                                        <span>装修工地 :</span>
                                        <span class="work_site_num">${r["work_site_num"]}</span>
                                    </div>
                                    <div>
                                        <span>联系电话 :</span>
                                        <span>${r["contact_tel"]}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="td02">
                                <div class="house_type">
                                    <span>户型 :</span>
                                    <span>${r["house_type"]}</span>
                                </div>
                                <div class="house_area">
                                    <span>面积 :</span>
                                    <span>${r["area"]}m平方</span>
                                </div>
                                <div class="house_address">
                                    <span>地址 :</span>
                                    <span>苏州市${r["address"]}</span>
                                </div>
                                <div class="house_village">
                                    <span>小区 :</span>
                                    <span>${r["village"]}</span>
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
                c.onclick=function (event) {
                    var a_id=event.target.parentElement.parentElement.id;
                    getData("http://47.102.45.80:8080/api/user/cutAppointment/",{"id":a_id},null,function (res) {
                        if (res && res["status_code"]=="10020") {

                            tbody.removeChild(event.target.parentElement.parentElement);
                            if (tbody.innerHTML === "") {
                                default_reservation.style.display = "flex";
                            } else {
                                default_reservation.style.display = "none";
                            }
                        }else {
                            console.log(res["status_text"])
                        }
                    });
                };
            }
        } else {
            console.log(res["status_text"]);
        }
    });


// 收藏

// 动态生成案例收藏页面
    var collection_case = document.querySelector(".collection_case");
    var default_case = document.querySelector(".default_case");
    var case_chk=document.querySelector(".case_chk");
    getData("http://47.102.45.80:8080/api/user/collectList/",{"collect_type":"case","user_id":user_id},null,function (res) {
        if(res && res["status_code"]==="10009"){
            for (var r of res["content"]) {
                collection_case.innerHTML += `<div class="collection_main case_main" id="${r["id"]}">
                            <div class="check">
                                <input type="checkbox" class="chk_case">
                            </div>
                            <div class="collection_content case_content">
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

            var case_content=document.querySelectorAll(".case_content");
            for (var c of case_content) {
                c.onclick=function () {
                    location.href="case_detail.html?case_id="+this.parentElement.id;
                }
            }
        }else {
            console.log(res["status_text"])
        }
    });


// 动态生成公司收藏页面
    var collection_company = document.querySelector(".collection_company");
    var default_company = document.querySelector(".default_company");
    var company_chk=document.querySelector(".company_chk");
    getData("http://47.102.45.80:8080/api/user/collectList/",{"collect_type":"company","user_id":user_id},null,function (res){
        if(res && res["status_code"]==="10009") {
            for (var r of res["content"]) {
                collection_company.innerHTML += `<div class="collection_main company_main" id="${r["id"]}">
                                <div class="check">
                                    <input type="checkbox" class="chk_company">
                                </div>
                                <div class="collection_content company_content">
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
                                            <span>${r["collect_date"]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>`
            }
            var delete_company = document.querySelector("#delete_company");
            var chk_companys = document.querySelectorAll(".chk_company");
            var chk_all_company = document.querySelector("#chk_all_company");
            chk_all(chk_all_company, chk_companys);
            checkedAllRows(chk_all_company, chk_companys);
            delete_collect(delete_company, ".chk_company", collection_company, default_company, company_chk);
            changePage(collection_company, default_company, company_chk);

            var company_content = document.querySelectorAll(".company_content");
            for (var cc of company_content) {
                cc.onclick = function () {
                    location.href = "companyDetail.html?company_id=" + this.parentElement.id;
                }
            }
        }else {
            console.log(res["status_text"])
        }
    });


// 动态生成攻略收藏页面
    var collection_strategy=document.querySelector(".collection_strategy");
    var default_strategy = document.querySelector(".default_strategy");
    var strategy_chk=document.querySelector(".strategy_chk");
    getData("http://47.102.45.80:8080/api/user/collectList/",{"collect_type":"strategy","user_id":user_id},null,function (res) {
        if(res && res["status_code"]==="10009") {
            for (var r of res["content"]) {
                collection_strategy.innerHTML += `<div class="collection_main strategy_main" id="${r["id"]}">
                                <div class="check">
                                    <input type="checkbox" class="chk_strategy">
                                </div>
                                <div class="collection_content strategy_content">
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
            chk_all(chk_all_strategy, chk_strategy);
            checkedAllRows(chk_all_strategy, chk_strategy);
            delete_collect(delete_strategy, ".chk_strategy", collection_strategy, default_strategy, strategy_chk);
            changePage(collection_strategy, default_strategy, strategy_chk);

            var strategy_content = document.querySelectorAll(".strategy_content");
            for (var sc of strategy_content) {
                sc.onclick = function () {
                    location.href = "strategy_info.html?strategy_id=" + this.parentElement.id;
                }
            }
        }else {
            console.log(res["status_text"])
        }
    });


// 动态生成日记收藏页面
    var collection_diary=document.querySelector(".collection_diary");
    var default_diary = document.querySelector(".default_diary");
    var diary_chk = document.querySelector(".diary_chk");
    getData("http://47.102.45.80:8080/api/user/collectList/",{"collect_type":"diary","user_id":user_id},null,function (res) {
        if(res && res["status_code"]==="10009") {
            for (var r of res["content"]) {
                var s = "";
                for (var img of r["diary_img"]) {
                    s += `<img src="${img}">`
                }
                collection_diary.innerHTML += `<div class="collection_main diary_main" id="${r["diary_id"]}">
                                <div class="check">
                                    <input type="checkbox" class="chk_diary">
                                </div>
                                <div class="collection_content diary_contents">
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
            changePage(collection_diary, default_diary, diary_chk);
            checkedAllRows(chk_all_diary, chk_diary);
            chk_all(chk_all_diary, chk_diary);
            delete_collect(delete_diary, ".chk_diary", collection_diary, default_diary, diary_chk);

            var diary_contents = document.querySelectorAll(".diary_contents");
            for (var dc of diary_contents) {

                dc.onclick = function () {
                    location.href = "diary_info.html?diary_id=" + this.parentElement.id;
                }
            }
        }else {
            console.log(res["status_text"])
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




    // 删除收藏

    function delete_collect(delete_f,chk,collection,default_f,f_chk) {
        delete_f.onclick = function () {
            var chks=document.querySelectorAll(chk);
            for (var ck of chks) {
                if (ck.checked) {
                    var content_id=ck.parentElement.parentElement.id;
                    var collect_type_id=0;
                    if (this.id=="delete_case") {
                        collect_type_id=1
                    }else if(this.id=="delete_company"){
                        collect_type_id=2
                    }else if(this.id=="delete_strategy"){
                        collect_type_id=3
                    }else if(this.id=="delete_diary"){
                        collect_type_id=4
                    }
                    var collect={"content_id":content_id,"collect_type_id":collect_type_id,"user_id":user_id};
                    postData('http://47.102.45.80:8080/api/user/cutCollect/',collect,{"token": token}, function (res) {
                        if (res && res["status_code"]==="10040") {
                            collection.removeChild(ck.parentElement.parentElement);
                            if (collection.innerHTML === "") {
                                default_f.style.display = "flex";
                                f_chk.style.display="none";
                            }else{
                                default_f.style.display = "none";
                                f_chk.style.display="block";
                            }
                        } else if (res && res["status_code"]==="10006") {
                            //登陆过期
                            location.href="login.html";
                        }else {
                            console.log(res["status_text"]);
                        }
                    });
                }
            }
        };
    }


    // 我的日记

    // 动态生成日记列表
    var user_id=window.localStorage && window.localStorage.getItem('user_id');
    var diary_content=document.querySelector(".diary_content");
    var no_diary=document.querySelector(".no_diary");

    // ajax渲染用户日记--begin
    getData("http://47.102.45.80:8080/api/user/userDiary/",{"user_id":user_id},null,
        function (res) {
            if (res && res["status_code"] === "10009") {
                no_diary.style.display="none";

                // 日记列表
                for (var i=0;i<res["content"].length;i++) {
                    diary_content.innerHTML+=`<div class="diary_list">
                                <!--日记标题--begin-->
                                <div class="diary_title">
                                    <p class="diary_name">
                                        <a href="#" class="diary_info" id="${res['content'][i]['id']}">
                                            ${res['content'][i]['diary_title']}
                                        </a>
                                    </p>

                                    <div class="time">
                                        <p>创建时间：${res['content'][i]['public_date']}</p>
                                        <p>更新时间：</p>
                                    </div>

                                </div>
                                <!--日记标题--end-->

                                <!--日记信息--begin-->
                                <div class="diary_detail">

                                    <div class="msg_top">
                                        <span>房屋信息：</span>
                                        <em class="border_right">${res['content'][i]['area']}㎡</em>
                                        <em class="border_right">
                                            ${res['content'][i]['style']}
                                        </em>
                                        <em>
                                           ${res['content'][i]['reno_type']}
                                        </em>
                                        <a href="#" class="btn_edit">编辑</a>
                                    </div>
                                    <p>所在小区：${res['content'][i]['village']} </p>
                                    <p>装修公司：
                                        ${res['content'][i]['company']} </p>
                                </div>
                                <!--日记信息--end-->

                                <!--日记按钮--begin-->
                                <div class="diary_btn">
                                    <span>全部日记：${res['content'][i]['count']}篇</span>
                                    <div class="btn">
                                        <input type="button" class="btn_continue" value="续写日记">
                                    </div>

                                </div>
                                <!--日记按钮--end-->

                            </div>`;

                }
                diary_content.innerHTML+=`
                            <div class=" create_diary">
                                <a href="#" class="btn_create">+新建装修日记</a>
                            </div>`;

                //日记标题点击事件--begin
                let diary_info = document.querySelectorAll(".diary_info");
                for (var di of diary_info) {
                    di.onclick = function () {
                        location.href = "diary_info.html?diary_id=" + this.id;
                    }
                }

                var btn_continue = document.querySelectorAll(".btn_continue");
                for (var bc of btn_continue){
                    bc.onclick = function () {
                        var d_id=this.parentElement.parentElement.parentElement.children[0].children[0].children[0].id;
                        location.href="writeDiary.html?diary_id="+d_id;
                    }
                }
                //日记标题点击事件--end




                // 新建日记事件--begin

                // 模态框
                var close = document.getElementsByClassName('close')[0];
                var modal = document.getElementById('modal');

                // 新建日记
                let create_btn=document.querySelector('.btn_create');
                create_btn.onclick=function() {
                    // 模态框
                    modal.style.display = "block";

                    close.onclick = function () {
                        modal.style.display = "none";
                    };

                    modal.onclick = function (event) {
                        if (event.target.id === 'modal') {
                            modal.style.display = "none";
                        }
                    };


                    // 日记信息
                    var diary_tit=document.querySelector(".diary_tit");
                    var diary_area=document.querySelector(".diary_area");
                    var style_select=document.querySelector(".style_select");
                    var reno_type=document.querySelector(".reno_type");
                    var village=document.querySelector(".village");
                    var company=document.querySelector(".company");

                    var diary={"diary_title":diary_tit.value,
                        "public_date":getNowFormatDate(),
                        "user_id":user_id,
                        "diary_area":diary_area.value,
                        "style_select":style_select.value,
                        "reno_type":reno_type.value,
                        "village":village.value,
                        "company":company.value,
                    };

                    // var btn_diary=document.querySelector(".btn_diary");
                    //
                    // btn_diary.onclick=function () {
                    //     postData('http://192.168.2.85:8080/api/user/',diary,null,
                    //         function (res) {
                    //             if (res && res.status_code=='10001') {
                    //
                    //                 alert("保存成功");
                    //                 location.href="writeDiary.html";
                    //             }
                    //         }
                    //     );
                    // }

                };
                // 新建日记事件--end


            } else {
                console.log("未写日记");
            }

        }
    );
    // ajax渲染用户日记--end



    // var edit_btn=document.querySelector(' .btn_edit');
    //
    // edit_btn.onclick=function () {
    //     alert('点击事件!!!');
    // };
    //
    // var continue_btn=document.querySelector('.btn_continue');
    // continue_btn.onclick=function () {
    //     alert('点击事件!!!');
    // };
    //
    //
    // var create_btn=document.querySelector('.btn_create');
    // create_btn.onclick=function() {
    //     alert('点击事件!!!');
    //
    // };
    //
    // var create_btn=document.querySelector('.btn_instant');
    // create_btn.onclick=function() {
    //     alert('点击事件!!!');
    //
    // };



    // 获取当前时间
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "/";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate + " " + hours + ":" + minutes + ":" + seconds;
        return currentdate;
    }


})();
