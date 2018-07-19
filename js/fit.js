function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }   
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11  
    }else{
        return -1;//不是ie浏览器
    }
}

function loadCanvas () {
    var oHead = document.getElementsByTagName('head')[0];
    var animScript= document.createElement("script");
    var createScript= document.createElement("script");
    animScript.src="js/anim.js";
    createScript.src="js/create.js";
    oHead.appendChild(animScript);
    oHead.appendChild(createScript);
}

function showAndHide () {
    var main = document.querySelector('#main');
    var sub = document.querySelector('#sub');
    main.style.display = "none";
    sub.style.display = "block";
}

var ieVersion = IEVersion();
if (ieVersion == 11 || ieVersion == -1) {
    loadCanvas();   // 加载canvas脚本
} else if (ieVersion < 11 && ieVersion != -1) {
    showAndHide();  // 显示图片 + 隐藏main层
}