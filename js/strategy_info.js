/**
 *Created by Lenovo-HXL on 2019/1/19.
 */
(function () {

    // 页面跳转
    window.sessionStorage.setItem('from', location.href);

    //攻略id
    var strategy_id=parseInt(location.href.split("?strategy_id=")[1]);

    //用户token
    var token = window.localStorage && window.localStorage.getItem('token');
    //用户id
    var user_id=window.localStorage && window.localStorage.getItem('user_id');

    //收藏信息
    var collect={"content_id":strategy_id,"collect_type_id":2,"user_id":user_id,"collect_date":getNowFormatDate()};


    getData("http://47.102.45.80:8080/api/strategy/strategyDetail/",{"strategy_id":strategy_id},null,function (res) {
        if (res && res["status_code"]==="10009"){
            var strategy_title=document.querySelector("#strategy_title");
            var public_date=document.querySelector("#public_date");
            var lead=document.querySelector("#lead");
            var content = document.querySelector("#content");
            strategy_title.innerText=res["content"]["strategy_title"];
            public_date.innerText=res["content"]["public_date"];
            lead.innerText=res["content"]["lead"];
            content.innerHTML=res["content"]["strategy_content"]

        } else{
            console.log(res["status_text"])
        }
    });



    // 收藏按钮-begin
    var pg_click=document.querySelector('#pg-block-click');
    var span=pg_click.children[0];
    var txt=pg_click.lastChild;

    //渲染收藏信息--begin
    if (token) {
        postData('http://47.102.45.80:8080/api/user/collectDetail/',collect,{"token":token},
            function (res) {
                if (res && res["status_code"]==="10009") {
                    span.classList.toggle('collect-icon');
                    txt.nodeValue='已收藏';

                } else {
                    console.log(res["status_text"]);
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
                postData('http://47.102.45.80:8080/api/user/cutCollect/',collect,{"token": token},
                    function (res) {
                        if (res && res["status_code"]==="10040") {
                            // 取消收藏公司成功
                            span.classList.toggle('collect-icon');
                            txt.nodeValue='收藏';

                        } else if (res && res["status_code"]==="10006") {
                            //登陆过期
                            console.log(res["status_text"]);
                        }else {
                            console.log(res["status_text"]);
                        }
                    });
            }else {
                // txt.nodeValue='已收藏';
                // 收藏公司
                postData('http://47.102.45.80:8080/api/user/makeCollect/',collect,{"token": token},
                    function (res) {
                        if (res && res["status_code"]==="10030") {
                            // 收藏公司成功
                            span.classList.toggle('collect-icon');
                            txt.nodeValue='已收藏';

                        } else if (res && res["status_code"]==="10006"){
                            //登陆过期
                            location.href="login.html";
                        }else {
                            console.log(res["status_text"]);
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

    // 评论
    var comment=document.querySelector("#comment");
    var comment_txt=document.querySelector("#comment_txt");
    var comment_content=document.querySelector(".comment_content");
    var second_floor=document.querySelectorAll(".second_floor");
    // 动态生成评论
    function getCommentData(){
        getData("http://47.102.45.80:8080/api/comment/getComment/",{"strategy_id":strategy_id},null,function (res) {
            if (res && res["status_code"]==="10009") {
                for(var i=0;i< res["content"].length;i++){
                    if(res["content"][i]["comment_num"]){
                        res["content"][i]["comment_num"]=res["content"][i]["comment_num"]+"条评论"
                    }else{
                        res["content"][i]["comment_num"]=""
                    }
                    comment_content.innerHTML += createFirstFloor(res["content"][i]);
                }
                var first_floor=document.querySelectorAll(".first_floor");

                for (var ff1 of first_floor){
                    var comment_id = ff1.id;
                    getData("http://47.102.45.80:8080/api/comment/getReply/",{"comment_id":comment_id},null,function (res) {
                        if (res && res["status_code"]==="10009") {
                            for (var ff2 of first_floor){
                                for(var r of res["content"]){
                                    if (r["comment_id"]==ff2.id) {
                                        console.log(ff2.id);
                                        ff2.children[1].innerHTML += createSecondFloor(r);
                                    }else {
                                        ff2.children[1].innerHTML +=""
                                    }
                                }
                            }
                        }else{
                            console.log(res["status_text"])
                        }
                    });
                }
            }else {
                console.log(res["status_text"])
            }
        });
    }

    getCommentData();


    comment.onclick=function () {
        if (token){
            if (comment_txt.value) {
                var data = {"from_uid": user_id, "comment_content": comment_txt.value, "comment_time": getNowFormatDate(),"comment_type_id":1,"comment_obj_id":strategy_id};
                postData("http://47.102.45.80:8080/api/comment/postComment/", data,{"token": token}, function (res) {
                    if (res && res["status_code"] === "10010") {
                        comment_content.innerHTML="";
                        getCommentData();
                        comment_txt.value = "";
                    } else if(res && res["status_code"] === "10006"){
                        location.href="login.html"
                    }else{
                        console.log(res["status_text"])
                    }
                });
            } else {
                alert("评论内容不能为空")
            }
        }else{
            location.href="login.html"
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
        } else if(node.className==="comment_num"){
            second_floor=node.parentElement.parentElement.parentElement.children;
            for (var sf of second_floor){
                if (sf.className==="second_floor") {
                    if (sf.style.display==="none"){
                        sf.style.display="flex";
                    }else {
                        sf.style.display="none";
                    }
                }
            }
        }else if(node.className==="reply_btn"){
            if (token){
                if (node.previousElementSibling.value){
                    var comment_id = node.parentElement.parentElement.parentElement.parentElement.id;
                    var to_uid=node.parentElement.parentElement.parentElement.parentElement.children[0].id;
                    var reply_content=node.previousElementSibling.value;
                    var to_unickname=node.parentElement.parentElement.parentElement.parentElement.children[1].children[0].innerText;
                    var data = {"from_uid": user_id, "comment_id":comment_id, "reply_id":"null", "reply_type_id":1,"reply_content": reply_content, "to_uid":to_uid, "to_unickname":to_unickname,"reply_time": getNowFormatDate()};
                    postData("http://47.102.45.80:8080/api/comment/postReply/", data,{"token": token}, function (res) {
                        if (res && res["status_code"] === "10010") {
                            comment_content.innerHTML="";
                            getCommentData();
                            comment_txt.value = "";
                        } else if(res && res["status_code"] === "10006"){
                            location.href="login.html"
                        }else {
                            console.log(res["status_text"])
                        }
                    });
                    node.parentElement.parentElement.classList.toggle("hidden");
                }else {
                    alert("回复内容不能为空")
                }
            }
        }else if(node.className==="reply_btn02"){
            if (token){
                if (node.previousElementSibling.value){
                    comment_id = node.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
                    var reply_id = node.parentElement.parentElement.parentElement.parentElement.id;
                    to_uid=node.parentElement.parentElement.parentElement.parentElement.children[0].id;
                    reply_content=node.previousElementSibling.value;
                    to_unickname=node.parentElement.parentElement.parentElement.children[0].children[0].innerText;
                    data = {"from_uid": user_id, "comment_id":comment_id, "reply_id":reply_id, "reply_type_id":2,"reply_content": reply_content, "to_uid":to_uid, "to_unickname":to_unickname,"reply_time": getNowFormatDate()};
                    postData("http://47.102.45.80:8080/api/comment/postReply/", data,{"token": token}, function (res) {
                        if (res && res["status_code"] === "10010") {
                            comment_content.innerHTML="";
                            getCommentData();
                            comment_txt.value = "";
                        } else if(res && res["status_code"] === "10006"){
                            location.href="login.html"
                        }else {
                            console.log(res["status_text"])
                        }
                    });
                    node.parentElement.parentElement.classList.toggle("hidden");
                }else {
                    alert("回复内容不能为空")
                }
            }
        }
    };




    //生成一层
    function createFirstFloor(res){
        var a=`<div class="first_floor" id="${res["id"]}">
                    <div class="user_icon" id="${res["from_uid"]}">
                        <img src="${res["icon"]}" alt="">
                    </div>
                    <div class="comment_main">
                        <div class="nickname">
                            <span>${res["nickname"]}</span>
                        </div>
                        <div class="comment_txt">
                            <p>${res["comment_content"]}</p>
                        </div>
                        <div class="comment_footer">
                            <div class="comment_time">
                                <span>${res["comment_time"]}</span>
                            </div>
                            <div class="comment_num_reply">
                                <a href="###" class="comment_num">${res["comment_num"]}</a>
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
            </div>`;
        return a;
    }

    // 生成二楼
    function createSecondFloor(res) {
        var a=`<div class="second_floor" style="display: flex;" id="${res["id"]}">
                    <div class="user_icon" id="${res["from_uid"]}">
                        <img src="${res["icon"]}" alt="">
                    </div>
                    <div class="comment_main">
                        <div class="nickname">
                            <span class="reply_man" id="${res["from_uid"]}">${res["nickname"]}</span>
                            <span>回复</span>
                            <span class="promulgator" >${res["to_unickname"]}</span>
                        </div>
                        <div class="comment_txt">
                            <p>${res["reply_content"]}</p>
                        </div>
                        <div class="comment_footer">
                            <div class="comment_time">
                                <span>${res["reply_time"]}</span>
                            </div>
                            <div class="comment_num_reply">
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
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate + " " + hours + ":" + minutes + ":" + seconds;
        return currentdate;
    }
})();
