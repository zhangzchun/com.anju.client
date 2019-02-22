
// 闭合函数--begin
(function () {

    // 页面跳转
    window.sessionStorage.setItem('from', location.href);

    // 公司id
    var company_id=parseInt(location.href.split("?company_id=")[1]);

    // ajax获取公司所有设计师数据,渲染--begin
    getData("http://127.0.0.1:8080/api/designer/designerList/",{"company_id":company_id},null,
        function (res) {
            if (res && res["status_code"] === "10009") {
                // 找到数据

                // 动态生成设计师列表--begin
                var idData=document.querySelector('#idData');
                for (var i=0;i<res['content'].length;i=i+4){
                    if(i+3<res['content'].length){
                        idData.innerHTML+=`<tr><td><div class="row case module-cont">
                        <div class="card-bx col-md-3 col-sm-3 col-xs-6" 
                            id="${res['content'][i]['des_id']}">
                            <a href="#">
                                <div class="img-ct">
                                    <img src="${res['content'][i]['des_icon']}"/></div>
                                <div class="card-info">
                                    <p class="card-name ect"> ${res['content'][i]['des_name']}</p>
                                    <p class="card-detail"><span> ${res['content'][i]['case_num']}套案例</span></p>
                                    <p class="card-cost ect">设计理念: ${res['content'][i]['design_concept']}</p>
                                </div>
                            </a>
                        </div>
                        <div class="card-bx col-md-3 col-sm-3 col-xs-6 second_img"
                            id="${res['content'][i+1]['des_id']}">
                            <a href="#">
                                <div class="img-ct">
                                    <img src="${res['content'][i+1]['des_icon']}"/></div>
                                <div class="card-info">
                                    <p class="card-name ect"> ${res['content'][i+1]['des_name']}</p>
                                    <p class="card-detail"><span> ${res['content'][i+1]['case_num']}套案例</span></p>
                                    <p class="card-cost ect">设计理念: ${res['content'][i+1]['design_concept']}</p>
                                </div>
                            </a>
                        </div>
                        <div class="card-bx col-md-3 col-sm-3 col-xs-6"
                            id="${res['content'][i+2]['des_id']}">
                            <a href="#">
                                <div class="img-ct">
                                    <img src="${res['content'][i+2]['des_icon']}"/></div>
                                <div class="card-info">
                                    <p class="card-name ect"> ${res['content'][i+2]['des_name']}</p>
                                    <p class="card-detail"><span> ${res['content'][i+2]['case_num']}套案例</span></p>
                                    <p class="card-cost ect">设计理念: ${res['content'][i+2]['design_concept']}</p>
                                </div>
                            </a>
                        </div>
                        <div class="card-bx col-md-3 col-sm-3 col-xs-6 fourth_img"
                            id="${res['content'][i+3]['des_id']}">
                            <a href="#">
                                <div class="img-ct">
                                    <img src="${res['content'][i+3]['des_icon']}"/></div>
                                <div class="card-info">
                                    <p class="card-name ect"> ${res['content'][i+3]['des_name']}</p>
                                    <p class="card-detail"><span> ${res['content'][i+3]['case_num']}套案例</span></p>
                                    <p class="card-cost ect">设计理念: ${res['content'][i+3]['design_concept']}</p>
                                </div>
                            </a>
                        </div>
                    </div></td></tr>`;
                    }

                }


                var card_cost = document.querySelectorAll(".card-cost");
                for (var c of card_cost) {
                    if (c.innerText.length > 40) {
                        c.innerText = c.innerText.substring(0, 40) + "...";
                    }
                }
                goPage(1);
                let card_bx=document.querySelectorAll(".card-bx");
                for (var c of card_bx){
                    c.onclick=function () {
                        location.href="designer_detail.html?designer_id="+this.id;
                    }
                }
                // 动态生成设计师列表--end

            } else {
                //没找到数据
                alert(res["status_text"]);
            }

        });
    // ajax获取公司所有设计师数据,渲染--begin


})();
// 闭合函数--end

// 分页开始

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


// 分页结束