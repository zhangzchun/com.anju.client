(function () {

    // 页面跳转
    window.sessionStorage.setItem('from', location.href);

    //  筛选
    var table=document.querySelector('.font');
    var con = document.querySelectorAll(".condition");
    var idData=document.querySelector('#idData');
    var sort=document.querySelector('.sorted');
    for (var c of con){
        c.style.display="none";
    }

    // 生成列表页面
    function getCompanyData(url,args){
        getData(url,args,null,function (res) {
            if(res && res['status_code']==='10009'){
                for(let r of res['content']){
                    idData.innerHTML+=`<tr><td><div class="row company_item" id="${r['id']}">
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
                goPage(1);
                let company_item=document.querySelectorAll(".company_item");
                for (var c of company_item){
                    c.onclick=function () {
                        location.href="companyDetail.html?company_id="+this.id;
                    }
                }
            }else if(res['status_code']==='10008') {
                idData.innerHTML+=""
            }

        });
    }
    function postCompanyData(url,args){
        postData(url,args,function (res) {
            if(res && res['status_code']==='10009'){
                for(let r of res['content']){
                    idData.innerHTML+=`<tr><td><div class="row company_item" id="${r['id']}">
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
                goPage(1);
                let company_item=document.querySelectorAll(".company_item");
                for (var c of company_item){
                    c.onclick=function () {
                        location.href="companyDetail.html?company_id="+this.id;
                    }
                }
            }else if(res['status_code']==='10008') {
                idData.innerHTML+=""
            }

        });
    }

    table.onclick=function (event) {
        var et=event.target;
        if(et.className==='zx' || et.className==='condition' || et.className==='ago'){
            if(et.className==='condition'){
                et.style.display='none';
                et.innerText='';
            }
        }
        else {
            if(et.nodeName==='TD' && et.className!=='line'){
                for(var i=1;i<et.parentNode.children.length;i++){
                    if(et.parentNode.children[0].innerText==="承接价位"){
                        con[0].style.display="inline";
                        con[0].innerText = et.children[0].innerText;
                    }else if(et.parentNode.children[0].innerText==="专长风格"){
                        con[1].style.display="inline";
                        con[1].innerText = et.children[0].innerText;
                    }else if(et.parentNode.children[0].innerText==="所在区域"){
                        con[2].style.display="inline";
                        con[2].innerText = et.children[0].innerText;
                    }
                }
                // et.style.background='#f8f8f8';
            }else if(et.nodeName==='A'){
                for(var i=1;i<et.parentNode.parentNode.children.length;i++){

                    if(et.parentNode.parentNode.children[0].innerText==="承接价位"){
                        con[0].style.display="inline";
                        con[0].innerText = et.innerText;
                    }else if(et.parentNode.parentNode.children[0].innerText==="专长风格"){
                        con[1].style.display="inline";
                        con[1].innerText = et.innerText;
                    }else if(et.parentNode.parentNode.children[0].innerText==="所在区域"){
                        con[2].style.display="inline";
                        con[2].innerText = et.innerText;
                    }
                }
                // et.parentNode.style.background='#f8f8f8';
            }
        }
        idData.innerHTML="";
        var condition={"price_name":con[0].innerText,"style_name":con[1].innerText,"district":con[2].innerText};
        postCompanyData('http://127.0.0.1:8080/api/company/companyScreen/',condition);

        if(con[0].style.display==='none' && con[1].style.display==='none' && con[2].style.display==='none') {
            getCompanyData('http://127.0.0.1:8080/api/company/companyList/',null);
        };
    };
    // 排序
    sort.onclick=function (event) {
        var et = event.target;
        if (et.nodeName === 'A') {
            var c = {"detail": et.innerText};
            idData.innerHTML="";
            postCompanyData('http://127.0.0.1:8080/api/company/companySort/', c);
        }
        ;
    }

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
    };

//    超小屏筛选结束


//    动态生成列表

    if (location.href.indexOf("search_content") !== -1){
        var myurl01 = location.href.split("=")[1];
        getCompanyData("http://127.0.0.1:8080/api/search/", {"search_content": decodeURI(myurl01), "search_condition": "装修公司"})
    }else{
        if(con[0].style.display==='none' && con[1].style.display==='none' && con[2].style.display==='none') {
            getCompanyData('http://127.0.0.1:8080/api/company/companyList/',null);
        }
    }





})();

//    分页开始

function goPage(pno) {
    var itable = document.getElementById("idData");
    var num = itable.rows.length;//表格所有行数(所有记录数)

    var totalPage = 0;//总页数
    var pageSize = 5;//每页显示行数
    //总共分几页
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行  31
    var endRow = currentPage * pageSize;//结束显示的行   40
    endRow = (endRow > num) ? num : endRow;    //40

    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1); i++) {
        var irow = itable.rows[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "table-row";
        } else {
            irow.style.display = "none";
        }
    }
    var tempStr = "";



    if (currentPage > 1) {
        tempStr += "<span class='btn btn-default' href=\"#\" onClick=\"goPage(" + (1) + ")\">首页</span>";
        tempStr += "<span class='btn btn-default page_1' href=\"#\" onClick=\"goPage(" + (currentPage - 1) + ")\">上一页</span>"
    } else {
        tempStr += "<span class='btn btn-default'>首页</span>";
        tempStr += "<span class='btn btn-default page_1'>上一页</span>";
    }

    for (var pageIndex = 1; pageIndex < totalPage + 1; pageIndex++) {
        tempStr += "<a onclick=\"goPage(" + pageIndex + ")\"><span class='btn btn-default'>" + pageIndex + "</span></a>";
    }

    if (currentPage < totalPage) {
        tempStr += "<span class='btn btn-default page_1' href=\"#\" onClick=\"goPage(" + (currentPage + 1) + ")\">下一页</span>";
        tempStr += "<span class='btn btn-default' href=\"#\" onClick=\"goPage(" + (totalPage) + ")\">尾页</span>";
    } else {
        tempStr += "<span class='btn btn-default page_1'>下一页</span>";
        tempStr += "<span class='btn btn-default'>尾页</span>";
    }

    document.querySelector("#barcon").innerHTML = tempStr;
}

//    分页结束

