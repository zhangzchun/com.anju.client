(function() {
    var progress_exp=document.querySelector('#progress_exp');

    var progressType=document.querySelector('#progressType');

    progressType.onclick=function (event) {
        var chils=progressType.children;

        for (ch of chils){
            ch.classList='';
        }
        if (event.target.nodeName=='LI') {
            event.target.className='on';

        } else if (event.target.nodeName=='SPAN'){
            event.target.parentElement.parentNode.className='on';
        }else {
            event.target.parentNode.className='on';

        }
    };



})();






























