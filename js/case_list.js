(function () {
    // 页面跳转
    window.sessionStorage.setItem('from', location.href);


    var table=document.querySelector('.font');
    var con = document.querySelectorAll(".condition");
    var idData=document.querySelector('#idData');
    var id={'company_id':location.href.split('=')[1]};
    // var id={'company_id':1};
    for (var c of con){
        c.style.display="none";
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
                for(let i=1;i<et.parentNode.children.length;i++){
                    // et.parentNode.children[i].style.background='#ffffff';
                    if(et.parentNode.children[0].innerText==="户型"){
                        con[0].style.display="inline";
                        con[0].innerText = et.children[0].innerText;
                    }else if(et.parentNode.children[0].innerText==="风格"){
                        con[1].style.display="inline";
                        con[1].innerText = et.children[0].innerText;
                    }else if(et.parentNode.children[0].innerText==="面积" && et.children[0].innerText!==''){
                        con[2].style.display="inline";
                        con[2].innerText = et.children[0].innerText;
                    }
                }
                // et.style.background='#f8f8f8';
            }else if(et.nodeName==='A'){
                for(let i=1;i<et.parentNode.parentNode.children.length;i++){
                    // et.parentNode.parentNode.children[i].style.background='#ffffff'
                    if(et.parentNode.parentNode.children[0].innerText==="户型"){
                        con[0].style.display="inline";
                        con[0].innerText = et.innerText;
                    }else if(et.parentNode.parentNode.children[0].innerText==="风格"){
                        con[1].style.display="inline";
                        con[1].innerText = et.innerText;
                    }else if(et.parentNode.parentNode.children[0].innerText==="面积" && et.innerText!==''){
                        con[2].style.display="inline";
                        con[2].innerText = et.innerText;
                    }
                }
                // et.parentNode.style.background='#f8f8f8';
            }
        }

        let condition={'company_id':1,'pageNum':1,'perPageNum':20,
            "ht_name":con[0].innerText,"style_name":con[1].innerText,"area":con[2].innerText};
        screenPage(condition)

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
    var condition={'company_id':1,'pageNum':1,'perPageNum':20,
        "ht_name":'',"style_name":'',"area":''};
    goPage(condition)


})();
//    分页开始
function goPage(condition) {
    let caseList = document.getElementById("idData");
    let go_page = document.getElementById("barcon");

    caseList.innerHTML='';
    postData('http://127.0.0.1:8080/api/case/caseList/',condition,null,function (res) {
        if(res && res['status_code']==='10009') {
            caseList.innerHTML='';
            for (let r of res['content']) {
                caseList.innerHTML += `<div class="card-bx col-md-3 col-sm-3 col-xs-6  case_item" id="${r['id']}">
            <a href="#">
                <div class="img-ct">
                    <img src="${r['img_url']}"/></div>
                <div class="card-info">
                    <p class="card-name ect">${r['name']}</p>
                    <p class="card-detail">${r['area']}m² / ${r['ht.name']} / ${r['style.name']} / ${r['rt.name']}</p>
                    <p  class="card-cost ect">
                                <span>
                                    ${r['price']}
                                </span>
                        万
                    </p>
                </div>
            </a>
        </div>`
            }
            let case_item=document.querySelectorAll(".case_item");
            for (let c of case_item){
                c.onclick=function () {
                    location.href="case_detail.html?case_id="+this.id;
                }
            }
        }else{
            caseList.innerHTML=`<img src="../image/no-case.png" alt="" class="no_case">`
        }
    });
    //总共分几页
    postData('http://127.0.0.1:8080/api/case/caseNumber/',condition,null,function (res) {
        if(res && res['status_code']==='10009'){
            go_page.innerHTML='';
            for(let i=1;i<=Math.ceil(res['content']['case_num']/20);i++){
                go_page.innerHTML+=`<span class='btn btn-default page_1'>${i}</span>`
            }
        }
    });

    go_page.onclick=function(event){
        for(var a of go_page.children){
            a.id='';
        }
        if(Boolean(event.target.innerText) && event.target.nodeName==='SPAN'){
            event.target.id='active';
            condition.pageNum=event.target.innerText;
            postData('http://127.0.0.1:8080/api/case/caseList/',condition,null,function (res) {
                if(res && res['status_code']==='10009'){
                    caseList.innerHTML='';
                    for(let r of res['content']){
                        caseList.innerHTML+=`<div class="card-bx col-md-3 col-sm-3 col-xs-6  case_item" id="${r['id']}">
            <a href="#">
                <div class="img-ct">
                    <img src="${r['img_url']}"/></div>
                <div class="card-info">
                    <p class="card-name ect">${r['name']}</p>
                    <p class="card-detail">${r['area']}m² / ${r['ht.name']} / ${r['style.name']} / ${r['rt.name']}</p>
                    <p  class="card-cost ect">
                                <span>
                                    ${r['price']}
                                </span>
                        万
                    </p>
                </div>
            </a>
        </div>`
                    }
                    let case_item=document.querySelectorAll(".case_item");
                    for (let c of case_item){
                        c.onclick=function () {
                            location.href="case_detail.html?case_id="+this.id;
                        }
                    }
                }
            });
        }

    }

}

//筛选加分页
function screenPage(condition){
    let caseList = document.getElementById("idData");
    let go_page = document.getElementById("barcon");


    caseList.innerHTML='';
    postData('http://127.0.0.1:8080/api/case/caseScreen/',condition,null,function (res) {
        if(res && res['status_code']==='10009'){
            caseList.innerHTML='';
            for(let r of res['content']){
                caseList.innerHTML+=`<div class="card-bx col-md-3 col-sm-3 col-xs-6  case_item" id="${r['id']}">
            <a href="#">
                <div class="img-ct">
                    <img src="${r['img_url']}"/></div>
                <div class="card-info">
                    <p class="card-name ect">${r['name']}</p>
                    <p class="card-detail">${r['area']}m² / ${r['ht.name']} / ${r['style.name']} / ${r['rt.name']}</p>
                    <p  class="card-cost ect">
                                <span>
                                    ${r['price']}
                                </span>
                        万
                    </p>
                </div>
            </a>
        </div>`
            }
            let case_item=document.querySelectorAll(".case_item");
            for (let c of case_item){
                c.onclick=function () {
                    location.href="case_detail.html?case_id="+this.id;
                }
            }
        }else{
            caseList.innerHTML=`<img src="../image/no-case.png" alt="" class="no_case">`
        }
    });

    //总共分几页
    postData('http://127.0.0.1:8080/api/case/caseNumber/',condition,null,function (res) {
        if(res && res['status_code']==='10009'){
            go_page.innerHTML='';
            for(let i=1;i<=Math.ceil(res['content']['case_num']/20);i++){
                go_page.innerHTML+=`<span class='btn btn-default page_1'>${i}</span>`
            }
        }
    });

    go_page.onclick=function(event){
        for(var a of go_page.children){
            a.id='';
        }
        if(Boolean(event.target.innerText) && event.target.nodeName==='SPAN'){
            event.target.id='active';
            condition.pageNum=event.target.innerText;
            postData('http://127.0.0.1:8080/api/case/caseScreen/',condition,null,function (res) {
                if(res && res['status_code']==='10009'){
                    caseList.innerHTML='';
                    for(let r of res['content']){
                        caseList.innerHTML+=`<div class="card-bx col-md-3 col-sm-3 col-xs-6  case_item" id="${r['id']}">
            <a href="#">
                <div class="img-ct">
                    <img src="${r['img_url']}"/></div>
                <div class="card-info">
                    <p class="card-name ect">${r['name']}</p>
                    <p class="card-detail">${r['area']}m² / ${r['ht.name']} / ${r['style.name']} / ${r['rt.name']}</p>
                    <p  class="card-cost ect">
                                <span>
                                    ${r['price']}
                                </span>
                        万
                    </p>
                </div>
            </a>
        </div>`
                    }
                    let case_item=document.querySelectorAll(".case_item");
                    for (let c of case_item){
                        c.onclick=function () {
                            location.href="case_detail.html?case_id="+this.id;
                        }
                    }
                }
            });
        }

    }
}
//    分页结束