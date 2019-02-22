(function () {

    // 页面跳转
    window.sessionStorage.setItem('from', location.href);

    // 设计师id
    var designer_id=parseInt(location.href.split("?designer_id=")[1]);

    // ajax获取设计师数据,渲染
    getData("http://127.0.0.1:8080/api/designer/designerDetail/",{"designer_id":designer_id},null,
        function(res){
            if (res && res["status_code"]==="10009") {

                // 动态生成设计师
                // 公司名
                var com_name=document.querySelector('.com_name');
                com_name.innerText=res['content'][0]['com_name'];

                // 设计师名
                var des_name=document.querySelector('.des_name');
                des_name.innerText=res['content'][0]['des_name'];


                // 设计师头像
                var icon=document.querySelector('.icon');
                icon.src=res['content'][0]['icon'];

                // 案例数目
                var case_num=document.querySelector('.case_num');
                case_num.innerText=`${res['content'][0]['case_num']}套案例`;

                // 个人简介
                var personal_profile=document.querySelector('.personal_profile');
                personal_profile.innerText=res['content'][0]['personal_profile'];

                // 设计理念
                var design_concept=document.querySelector('.design_concept');
                design_concept.innerText=res['content'][0]['design_concept'];

                // 动态生成案例列表
                var idData=document.querySelector('#idData');
                for (var i=0;i<res['content'].length;i=i+3){

                    if(i+2<res['content'].length){
                        idData.innerHTML+=`<tr><td><div class="row case module-cont">
                    <div class="card-bx col-md-4 col-sm-4 col-xs-6"
                        id="${res['content'][i]['case_id']}">
                        <a href="#">
                            <div class="img-ct">
                                <img src="${res['content'][i]['img_url']}"/></div>
                            <div class="card-info">
                                <p class="card-name ect">${res['content'][i]['des_name']}</p>
                                <p class="card-detail">${res['content'][i]['area']}m² /
                                                    ${res['content'][i]['house_type']} /
                                                    ${res['content'][i]['style']} /
                                                    ${res['content'][i]['rt_type']}</p>
                                <p class="card-cost ect">
                                    <span>
                                        ${res['content'][i]['price']}
                                    </span>
                                    万
                                </p>
                            </div>
                        </a>
                    </div>
                    <div class="card-bx col-md-4 col-sm-4 col-xs-6 second_img"
                        id="${res['content'][i+1]['des_id']}">
                        <a href="#">
                            <div class="img-ct">
                                <img src="${res['content'][i+1]['img_url']}"/></div>
                            <div class="card-info">
                                <p class="card-name ect">${res['content'][i+1]['des_name']}</p>
                                <p class="card-detail">${res['content'][i+1]['area']}m² /
                                                        ${res['content'][i+1]['house_type']} /
                                                        ${res['content'][i+1]['style']} /
                                                        ${res['content'][i+1]['rt_type']}</p>
                                <p class="card-cost ect">
                                    <span>
                                        ${res['content'][i+1]['price']}
                                    </span>
                                    万
                                </p>
                            </div>
                        </a>
                    </div>
                    <div class="card-bx col-md-4 col-sm-4 col-xs-6 " 
                        id="${res['content'][i+2]['des_id']}">
                        <a href="#">
                            <div class="img-ct">
                                <img src="${res['content'][i+2]['img_url']}"/></div>
                            <div class="card-info">
                                <p class="card-name ect">${res['content'][i+2]['des_name']}</p>
                                <p class="card-detail">${res['content'][i+2]['area']}m² /
                                                        ${res['content'][i+2]['house_type']} /
                                                        ${res['content'][i+2]['style']} /
                                                        ${res['content'][i+2]['rt_type']}</p>
                                <p class="card-cost ect">
                                    <span>
                                        ${res['content'][i+2]['price']}
                                    </span>
                                    万
                                </p>
                            </div>
                        </a>
                    </div>
                </div></td></tr>`;

                    }

                }

                goPage(1);
                let card_bx=document.querySelectorAll(".card-bx");
                for (var c of card-bx){
                    c.onclick=function () {
                        location.href="case_detail.html?case_id="+this.id;
                    }
                }

            } else {
                alert(res["status_text"])
            }

        });

})();

//    分页开始

function goPage(pno) {
    var itable = document.getElementById("idData");
    var num = itable.rows.length;//表格所有行数(所有记录数)
    console.log(num);
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

//    分页结束