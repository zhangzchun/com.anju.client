(function () {
    //  筛选
    var table=document.querySelector('.font');
    var con = document.querySelectorAll(".condition");
    for (var c of con){
        c.style.display="none";
    }
    table.onclick=function (event) {
        var et=event.target;
        if(et.className==='zx' || et.className==='condition' || et.className==='ago'){
            if(et.className==='condition'){
                et.style.display='none'
            }
        }
        else {
            if(et.nodeName==='TD' && et.className!=='line'){
                for(var i=1;i<et.parentNode.children.length;i++){
                    et.parentNode.children[i].style.background='#ffffff';
                    if(et.parentNode.children[0].innerText==="服务区域"){
                        con[0].style.display="inline";
                        con[0].innerText = et.children[0].innerText+" ×";
                    }else if(et.parentNode.children[0].innerText==="承接价位"){
                        con[1].style.display="inline";
                        con[1].innerText = et.children[0].innerText+" ×";
                    }else if(et.parentNode.children[0].innerText==="专长风格"){
                        con[2].style.display="inline";
                        con[2].innerText = et.children[0].innerText+" ×";
                    }else if(et.parentNode.children[0].innerText==="所在区域"){
                        con[3].style.display="inline";
                        con[3].innerText = et.children[0].innerText+" ×";
                    }
                }
                et.style.background='#f8f8f8';
            }else if(et.nodeName==='A'){
                for(var i=1;i<et.parentNode.parentNode.children.length;i++){
                    et.parentNode.parentNode.children[i].style.background='#ffffff'
                    if(et.parentNode.parentNode.children[0].innerText==="服务区域"){
                        con[0].style.display="inline";
                        con[0].innerText = et.innerText+" ×";
                    }else if(et.parentNode.parentNode.children[0].innerText==="承接价位"){
                        con[1].style.display="inline";
                        con[1].innerText = et.innerText+" ×";
                    }else if(et.parentNode.parentNode.children[0].innerText==="专长风格"){
                        con[2].style.display="inline";
                        con[2].innerText = et.innerText+" ×";
                    }else if(et.parentNode.parentNode.children[0].innerText==="所在区域"){
                        con[3].style.display="inline";
                        con[3].innerText = et.innerText+" ×";
                    }
                }
                et.parentNode.style.background='#f8f8f8';
            }
        }

    };

//超小屏筛选开始
    var btn_group=document.querySelector('#btn-group');
    var uls=document.querySelectorAll('.dropdown-menu');
    var flag=true
    btn_group.onclick=function (event) {
        if(event.target.type=='button' && flag){
            for(var ul of uls){
                ul.style.display='none';
            }
            event.target.nextElementSibling.style.display='block';
            flag=false;
        }else {
            event.target.nextElementSibling.style.display='none';
            flag=true;
        }
    }

//    超小屏筛选结束

//    动态生成列表
    var idData=document.querySelector('#idData');
    getData('http://127.0.0.1:8088/api/company/companyList/',null,null,function (res) {
        for(let r of res){
        idData.innerHTML+=`<tr><td><div class="row">
        <div class="col-lg-12">
            <div class="row">
                <div class="col-md-1  col-sm-1  col-xs-1  circle-left">
                    <div class="circle">
                        <img src="${r['company_icon']}"/>
                    </div>
                </div>
                <div class="col-md-11 col-sm-11 col-xs-11 company_list">
                    <div class="text-top">
                        <a href="#"><h3>${r['name']}</h3></a>
                        <div class="row">
                            <div class="col-md-9 col-sm-9 col-xs-9 case">
                                <span>设计案例 : ${r['case_num']}</span>
                                <span>装修工地 : ${r['work_site_num']}</span>
                            </div>
                            <div class="col-md-3 col-sm-3 col-xs-3 tel">
                                <h4>${r['contact_tel']}</h4>
                            </div>
                        </div>

                    </div>
                    <div class="img">
                        <div class="row">
                            <div class="col-md-3 col-sm-4 col-xs-4 first_img">
                                <a href="#"><img src="${r['c_img']}"/></a>
                            </div>
                            <div class="col-md-3 col-sm-4 col-xs-4 second_img">
                                <a href="#"><img src="${r['c_img']}"/></a>
                            </div>
                            <div class="col-md-3 col-sm-4 col-xs-4 third_img">
                                <a href="#"><img src="${r['c_img']}"/></a>
                            </div>
                            <div class="col-md-3 col-sm-4 col-xs-6 fourth_img">
                                <a href="#"><img src="${r['c_img']}"/></a>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div></td></tr>`
        }

        //调用分页函数
        goPage(1);
        });


})();


