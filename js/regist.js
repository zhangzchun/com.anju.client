

(function () {

    var tel=document.querySelector('#txt_telephone');
    var tel_error=document.querySelector('#tel_error');
    var name=document.querySelector('#txt_name');
    var name_error=document.querySelector('#name_error');
    var password=document.querySelector('#txt_password');
    var password_error=document.querySelector('#password_error');
    var check_agree=document.querySelector('#check_agree');
    var check_error=document.querySelector('#check_error');
    var regist_btn=document.querySelector('#btn_regist');

    document.querySelector('#eye-check').onclick=function() {
        if (password.type=='password') {
            password.type='text';
        }else {
            password.type='password'
        }
    };

    regist_btn.onclick=function () {

        if(checkTelphone() && checkName() &&checkPassword() && checkAgree()){
            //  开始提交后台
            var user={"telephone":tel.value,"nickname":name.value, "password":password.value};
            postData('http://192.168.2.85:8080/api/user/regist/',user,function (res) {
                if(res && res.status_code=='10001'){

                    localStorage.setItem('token',res.token);
                    localStorage.setItem('user_id',res.user_id);
                    location.href='../index.html';

                }else {
                    alert(res.status_text);
                }
            })
        }
    };

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

    function checkName() {
        var regMobile='';
        if (name.value) {
            name_error.innerText='';
            return true;
        }else{
            name_error.innerText='用户名不能为空';
            return false;
        }
    }

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

    function checkAgree() {
        if (check_agree.checked==true) {
            check_error.innerText='';
            check_agree.setAttribute('value','true');
            return true
        }else {
            check_agree.setAttribute('value','false');
            check_error.innerText='请先阅读安居用户注册协议';
            return true
        }
    }

    tel.onchange=function () {
        checkTelphone();
    };

    password.onchange=function () {
        checkPassword();
    };

    name.onchange=function () {
        checkName();
    }
})();





