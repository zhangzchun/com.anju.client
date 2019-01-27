(function () {

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
