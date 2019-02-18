(function () {
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
    var id={'case_id':location.href.split('=')[1]};
    getData('http://127.0.0.1:8080/api/case/caseDetail/',id,null,function (res) {
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

    //  收藏开始
    var pg_click=document.querySelector('#pg-block-click');
    var span=pg_click.children[0];
    var txt=pg_click.lastChild;

    pg_click.onclick=function () {
        // alert(span.classList);
        span.classList.toggle('collect-icon');
        // if (txt.nodeValue=='已收藏') {
        //     txt.nodeValue='收藏';
        // }else {
        //     txt.nodeValue='已收藏';
        // }
    };
    // 收藏结束



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
