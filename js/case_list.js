(function () {
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
                    if(et.parentNode.children[0].innerText==="户型"){
                        con[0].style.display="inline";
                        con[0].innerText = et.children[0].innerText+" ×";
                    }else if(et.parentNode.children[0].innerText==="风格"){
                        con[1].style.display="inline";
                        con[1].innerText = et.children[0].innerText+" ×";
                    }else if(et.parentNode.children[0].innerText==="面积"){
                        con[2].style.display="inline";
                        con[2].innerText = et.children[0].innerText+" ×";
                    }
                }
                et.style.background='#f8f8f8';
            }else if(et.nodeName==='A'){
                for(var i=1;i<et.parentNode.parentNode.children.length;i++){
                    et.parentNode.parentNode.children[i].style.background='#ffffff'
                    if(et.parentNode.parentNode.children[0].innerText==="户型"){
                        con[0].style.display="inline";
                        con[0].innerText = et.innerText+" ×";
                    }else if(et.parentNode.parentNode.children[0].innerText==="风格"){
                        con[1].style.display="inline";
                        con[1].innerText = et.innerText+" ×";
                    }else if(et.parentNode.parentNode.children[0].innerText==="面积"){
                        con[2].style.display="inline";
                        con[2].innerText = et.innerText+" ×";
                    }
                }
                et.parentNode.style.background='#f8f8f8';
            }
        }

    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //超小屏筛选开始
    var btn_group=document.querySelector('#btn-group');
    var uls=document.querySelectorAll('.dropdown-menu');
    var flag=true;
    btn_group.onclick=function (event) {
        if(event.target.type==='button' && flag){
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
    for (var i=0;i<8;i++){
        idData.innerHTML+=`<tr><td><div class="row case module-cont">
            <div class="card-bx col-md-3 col-sm-3 col-xs-6">
                <a href="#">
                    <div class="img-ct">
                        <img src="../image/company_img01.jpg"/></div>
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
            <div class="card-bx col-md-3 col-sm-3 col-xs-6 second_img">
                <a href="#">
                    <div class="img-ct">
                        <img src="../image/company_img01.jpg"/></div>
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
            <div class="card-bx col-md-3 col-sm-3 col-xs-6">
                <a href="#">
                    <div class="img-ct">
                        <img src="../image/company_img01.jpg"/></div>
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
            <div class="card-bx col-md-3 col-sm-3 col-xs-6 fourth_img">
                <a href="#">
                    <div class="img-ct">
                        <img src="../image/company_img01.jpg"/></div>
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
        </div></td></tr>`
    }


})();
//    分页开始

function goPage(pno) {
    var itable = document.getElementById("idData");
    var num = itable.rows.length;//表格所有行数(所有记录数)
    console.log(num);
    var totalPage = 0;//总页数
    var pageSize = 3;//每页显示行数
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
    console.log(endRow);
    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1); i++) {
        var irow = itable.rows[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "table-row";
        } else {
            irow.style.display = "none";
        }
    }
    var pageEnd = document.getElementById("pageEnd");
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
goPage(1)


//    分页结束