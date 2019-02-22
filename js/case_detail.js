(function () {

    // 页面跳转
    window.sessionStorage.setItem('from', location.href);

    // 案例id
    var case_id=parseInt(location.href.split('?case_id=')[1]);
    // 用户token
    var token = window.localStorage && window.localStorage.getItem('token');
    // 用户id
    var user_id=window.localStorage && window.localStorage.getItem('user_id');

    // 收藏信息
    var collect={"content_id":case_id,"collect_type_id":4,"user_id":user_id,};


    //后台渲染数据
    var content=document.querySelector('.content');
    var case_name=document.querySelectorAll('.case_name');
    var designer_img=document.querySelector('.designer_img');
    var designer_name=document.querySelectorAll('.designer_name');
    var case_num=document.querySelector('.case_num');
    var company_icon=document.querySelector('#first');
    var type=document.querySelector('.type');
    var style=document.querySelector('.style');
    var area=document.querySelector('.area');
    var price=document.querySelector('.price');
    var renovation=document.querySelector('.renovation');
    var village=document.querySelector('.village');
    var date=document.querySelector('.date');

    getData('http://127.0.0.1:8080/api/case/caseDetail/',{"case_id":case_id},null,function (res) {
        if(res && res['status_code']==='10009'){
            case_name[0].innerText=res['content'][0]['name'];
            case_name[1].innerText=res['content'][0]['name'];
            designer_img.src=res['content'][0]['icon'];
            designer_name[0].innerText=res['content'][0]['des'];
            designer_name[1].innerText=res['content'][0]['des'];
            case_num.innerText=res['content'][0]['case_num'];
            company_icon.src=res['content'][0]['company_icon'];
            type.innerText=res['content'][0]['type'];
            style.innerText=res['content'][0]['sty'];
            area.innerText=res['content'][0]['area'];
            price.innerText=res['content'][0]['price'];
            renovation.innerText=res['content'][0]['reno'];
            village.innerText=res['content'][0]['village'];
            date.innerText=res['content'][0]['date'];

            for(var r of res['content']){
                content.innerHTML+=`<div class="row start_img_small">
                    <div class="col-sm-12 col-xs-12 col-md-12">
                        <img src="${r['img_type']}"/>
                    </div>
                </div>
                <div class="row start_img">
                    <div class="col-sm-12 col-xs-12 col-md-12">
                        <img src="${r['img_url']}"/>
                    </div>
                </div>`
            }
        }
    });
















    //  隐藏部分
    var liu=document.querySelector('.liu');
    var author=document.querySelector('.container .row .author');
    author.onmousemove=function (event) {
        if(event.target.id==='first'){
            liu.style.display='block';
        }else {
            liu.style.display='none';
        }
    }

    // 收藏按钮-begin
    var pg_click=document.querySelector('#pg-block-click');
    var span=pg_click.children[0];
    var txt=pg_click.lastChild;


    //渲染收藏信息--begin
    if (token) {
        postData('http://127.0.0.1:8080/api/user/collectDetail/',collect,{"token":token},
            function (res) {
                if (res && res["status_code"]==="10009") {
                    span.classList.toggle('collect-icon');
                    // txt.nodeValue='已收藏';

                } else {
                    alert(res["status_text"]);
                }

            });
    }
    //渲染收藏信息--end

    // 收藏按钮--begin
    pg_click.onclick=function () {
        // alert(span.classList);
        // span.classList.toggle('collect-icon');

        if (token) {
            if (txt.nodeValue==='已收藏') {
                // txt.nodeValue='收藏';
                // 取消收藏公司
                postData('http://127.0.0.1:8080/api/user/cutCollect/',collect,{"token": token},
                    function (res) {
                        if (res && res["status_code"]==="10040") {
                            // 取消收藏公司成功
                            span.classList.toggle('collect-icon');
                            // txt.nodeValue='收藏';

                        } else if (res && res["status_code"]==="10006") {
                            //登陆过期
                            alert(res["status_text"]);
                        }else {
                            alert(res["status_text"]);
                        }
                    });
            }else {
                // txt.nodeValue='已收藏';
                // 收藏公司
                postData('http://127.0.0.1:8080/api/user/makeCollect/',collect,{"token": token},
                    function (res) {
                        if (res && res["status_code"]==="10030") {
                            // 收藏公司成功
                            span.classList.toggle('collect-icon');
                            // txt.nodeValue='已收藏';

                        } else if (res && res["status_code"]==="10006"){
                            //登陆过期
                            alert(res["status_text"]);
                        }else {
                            alert(res["status_text"]);
                        }
                    });
            }
        } else {
            // 未登录
            // alert("收藏需登录,点击确定");
            location.href="login.html";
        }


    };
    // 收藏按钮--end



    //  返回顶部开始
    var to_top=document.querySelector('#go_top');
    to_top.style.display='none';
    to_top.onclick=function () {
        var scroll_h= document.documentElement.scrollTop || document.body.scrollTop;
        var inter=setInterval(function () {
            scroll_h-=50;
            window.scrollTo(0,scroll_h);
            if(scroll_h<=0){
                clearInterval(inter);
            }
        },2);
        to_top.style.display='none';
    };
    window.onscroll=function () {
        //    innerHeight 浏览器的可视高度，他是变化的(兼容所有浏览器)
        var w=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
//    滚动条滚动的高度
        var scroll_h= document.documentElement.scrollTop || document.body.scrollTop;
        if(scroll_h>w){
            to_top.style.display='block';
        }else{
            to_top.style.display='none';
        }
    }

})();
