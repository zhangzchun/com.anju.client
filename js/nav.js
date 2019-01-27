(function () {
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
    search_txt.style.display="none";
    search_btn_none.style.display="none";
    search_btn_block.style.display="block";
    search_btn_block.onclick=function () {
        search_txt.style.display = "block";
        search_btn_none.style.display = "block";
        search_btn_block.style.display = "none";
        form.style.border = "solid 1px #888888";
    };
    search_btn_none.onclick=function () {
        search_txt.style.display="none";
        search_btn_none.style.display="none";
        search_btn_block.style.display="block";
        form.style.border="none";
    };

})();