/**
 *Created by Lenovo-HXL on 2019/1/21.
 */
(function () {

    var diary_id=location.href.split("?diary_id=")[1];
    getData("http://127.0.0.1:8080/api/diary/diaryInfo/",{"diary_id":diary_id},null,function (res) {
        if (res && res["status_code"]==="10009"){
            var user_icon=document.querySelector("#user_icon");
            var user_name=document.querySelector("#user_name");
            var diary_title=document.querySelector(".diary_title");
            var diary_time=document.querySelector(".diary_time");
            var area=document.querySelector(".area");
            var style=document.querySelector(".style");
            var type=document.querySelector(".type");
            var location=document.querySelector(".location");
            var company_name=document.querySelector(".company_name");
            var browse_num=document.querySelector(".browse_num span");
            var collect_num=document.querySelector(".collect_num span");
            var comment_num=document.querySelector(".comment_num span");
            user_icon.src=res["content"]["user_icon"];
            user_name.innerText=res["content"]["nickname"];
            diary_title.innerText=res["content"]["diary_title"];
            diary_time.innerText=res["content"]["public_date"];
            area.innerText=res["content"]["area"]+"m²";
            style.innerText=res["content"]["style"];
            type.innerText=res["content"]["type"];
            location.innerText=res["content"]["location"];
            company_name.innerText=res["content"]["company"];
            browse_num.innerText=res["content"]["browse_num"];
            collect_num.innerText=res["content"]["collect_num"];
            comment_num.innerText=res["content"]["comment_num"];

            var diary_items=document.querySelector(".diary_items");
            for (var i=0;i<res["content"]["stages"].length;i++){
                var s = "";
                for (var img of res["content"]["stages"][i]["diary_img"]) {
                    s += `<img src="${img}">`
                }
                diary_items.innerHTML += `<div class="diary_item">
                                <div class="stage_title">${res["content"]["stages"][i]["stage"]}</div>
                                <div class="stage_content">
                                    <div class="public_time">
                                        <span>${res["content"]["stages"][i]["diary_date"]}</span>
                                    </div>
                                    <div class="content">
                                        <p>${res["content"]["stages"][i]["diary_content"]}</p>
                                    </div>
                                    <div class="diary_image">
                                        ${s}
                                    </div>
                                </div>
                            </div>`
            }
        } else{
            alert(res["status_text"])
        }
    });


    // 收藏
    var pg_click=document.querySelector('#pg-block-click');
    var span=pg_click.children[0];
    var txt=pg_click.lastChild;

    pg_click.onclick=function () {
        // alert(span.classList);
        span.classList.toggle('collect-icon');
        if (txt.nodeValue=='已收藏') {
            txt.nodeValue='收藏';
        }else {
            txt.nodeValue='已收藏';
        }
    };


    // 目录固定
    var catalog=document.querySelector(".write_diary"),
        H = 0,
        Y = catalog;
    while (Y) {
        H += Y.offsetTop;
        Y = Y.offsetParent;
    }
    window.onscroll = function()
    {
        var s = document.body.scrollTop || document.documentElement.scrollTop;
        if(s>H) {
            catalog.style = "position:fixed;top:80px;left:76.8%;right:auto; width:15.1%;"
        } else {
            catalog.style = ""
        }
    }


    // 评论
    var comment=document.querySelector("#comment");
    var comment_txt=document.querySelector("#comment_txt");
    var comment_content=document.querySelector(".comment_content");
    var second_floor=document.querySelectorAll(".second_floor");
    comment.onclick=function () {
        if (comment_txt.value) {
            comment_content.innerHTML += createFirstFloor();
            comment_txt.value="";
        } else {
            alert("评论内容不能为空")
        }
    };
    // 展开评论和回复评论

    comment_content.onclick=function (event) {
        var node=event.target;
        if (node.className==="comment_reply"){
            node.parentElement.parentElement.nextElementSibling.classList.toggle("hidden");
            for (var sf of second_floor){
                if (sf.style.display==="none"){
                    sf.style.display="flex";
                }
            }
        }else if(node.className==="reply_btn"){
            if (node.previousElementSibling.value){
                var comment_num=node.parentElement.parentElement.parentElement.children[2].children[1].children[0];

                if (comment_num.innerText) {
                    comment_num.innerText=parseInt(comment_num.innerText.substring(0,1))+1 +"条评论";
                }else{
                    comment_num.innerText="1条评论";
                }
                node.parentElement.parentElement.classList.toggle("hidden");
                node.parentElement.parentElement.parentElement.innerHTML += createSecondFloor(node);
            }else {
                alert("回复内容不能为空")
            }
        }else if(node.className==="reply_btn02"){
            var comment_num=node.parentElement.parentElement.parentElement.children[2].children[1].children[0];

            if (node.previousElementSibling.value){
                if (comment_num.innerText) {
                    comment_num.innerText=parseInt(comment_num.innerText.substring(0,1))+1 +"条评论";
                }else{
                    comment_num.innerText="1条评论";
                }
                node.parentElement.parentElement.classList.toggle("hidden");
                node.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML +=createSecondFloor(node);
            }else {
                alert("回复内容不能为空")
            }
        }
        else if(node.className==="comment_num"){
            for (var sf of second_floor){
                if (sf.style.display==="none"){
                    sf.style.display="flex";
                }else {
                    sf.style.display="none";
                }
            }
        }
    };


    //生成一层
    function createFirstFloor(){
        var a=`<div class="first_floor">
                <div class="user_icon">
                    <img src="../image/user_icon01.jpg" alt="">
                </div>
                <div class="comment_main">
                    <div class="nickname">
                        <span>小猪佩奇</span>
                    </div>
                    <div class="comment_txt">
                        <p>${comment_txt.value}</p>
                    </div>
                    <div class="comment_footer">
                        <div class="comment_time">
                            <span>${getNowFormatDate()}</span>
                        </div>
                        <div class="comment_num_reply">
                            <a href="###" class="comment_num"></a>
                            <a href="###" class="comment_reply">回复</a>
                        </div>
                    </div>
                    <div class="reply_box hidden">
                        <form action="#">
                            <textarea rows=3 cols=27 id="reply_txt" name="comment_text" placeholder="你怎么看~~~"></textarea>
                            <button type="button" class="reply_btn">回复</button>
                        </form>
                    </div>
                </div>
            </div>`
        return a;
    }

    // 生成二楼
    function createSecondFloor(node) {
        var reply_man=node.parentElement.parentElement.parentElement.children[0].children[0].innerText;
        var a=`<div class="second_floor" style="display: flex;">
                        <div class="user_icon">
                            <img src="../image/user_icon01.jpg" alt="">
                        </div>
                        <div class="comment_main">
                            <div class="nickname">
                                <span class="reply_man">乔治</span>
                                <span>回复</span>
                                <span class="promulgator">${reply_man}</span>
                            </div>
                            <div class="comment_txt">
                                <p>${node.previousElementSibling.value}</p>
                            </div>
                            <div class="comment_footer">
                                <div class="comment_time">
                                    <span>${getNowFormatDate()}</span>
                                </div>
                                <div class="comment_num_reply">
                                    <a href="###" class="comment_num"></a>
                                    <a href="###" class="comment_reply">回复</a>
                                </div>
                            </div>
                            <div class="reply_box hidden">
                                <form action="#">
                                    <textarea rows=3 cols=27 class="reply_txt" name="comment_text" placeholder="请发表你的看法~~~"></textarea>
                                    <button type="button" class="reply_btn02">回复</button>
                                </form>
                            </div>
                        </div>
                    </div>`;
        return a;
    }


    // 获取当前时间
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "/";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }


})();