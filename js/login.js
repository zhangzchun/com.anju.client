
(function () {
    var tel=document.querySelector('#txt_telephone');
    var tel_error=document.querySelector('#tel_error');
    var password=document.querySelector('#txt_password');
    var password_error=document.querySelector('#password_error');
    var login_btn=document.querySelector('#btn_login')

    //查看密码
    document.querySelector('#eye-check').onclick=function() {
        if (password.type=='password') {
            password.type='text';
        }else {
            password.type='password'
        }
    };


    //登录ajax
    login_btn.onclick=function () {
        if(checkPassword() && checkTelphone()){
            //    开始提交后台
            var user={"telephone":tel.value,"password":password.value};
            postData('http://127.0.0.1:8080/api/user/login/',user,function (res) {
                if(res && res.status_code=='10003'){
                    localStorage.setItem('token',res.token);
                    localStorage.setItem('user_id',res.user_id);

                    if(sessionStorage.getItem('from')){
                        location.href=sessionStorage.getItem('from');
                    }else {
                        location.href='../index.html';
                    }

                }else {
                    alert(res.status_text);
                }
            })
        }
    };


    //检查手机号
    function checkTelphone() {
        var regMobile=/^1[3,5,8]\d{9}$/;
        if(tel.value){
            if(regMobile.test(tel.value)){
                tel_error.innerText='';
                return true;
            }else {
                tel_error.innerText='*手机号码格式不正确';
                return false
            }
        }else {
            tel_error.innerText='*手机号码不能为空';
            return false;
        }
    }


    //检查密码
    function checkPassword() {
        var regMobile=/^\w{6,}$/;
        if(password.value){
            if(regMobile.test(password.value)){
                password_error.innerText='';
                return true;
            }else {
                password_error.innerText='*密码必须大于六位';
                return false;
            }
        }else {
            password_error.innerText='*密码不能为空';
            return false;
        }
    }

    //自动检查手机号
    tel.onchange=function () {
        checkTelphone();
    };

    //自动检查密码
    password.onchange=function () {
        checkPassword();
    };

})();




