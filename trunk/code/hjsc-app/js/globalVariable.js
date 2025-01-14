//login.js内也有配置

//检查更新

//正式外
var upid='BC1503IN17010';
//内
//var upid='BC1503IN17006';


//		之前接口登陆失效
//		if(!data.success || !data.obj) {
//				mui.toast(data.msg);
//				tokenInvalid(data)
//			}
		//atteam现登录失效
//		if(data.obj===false) {
//			tokenInvalid(data);
//			return;
//			}
		//atcloud现登录失效
//		if(data.responseInfo.responseCode!=1){
//			tokenInvalid(data);
//			return;
//			}

//tokenid失效返回登录页
function tokenInvalid(data){
	//atteam失效：data.msg
	//atcloud失效：data.responseInfo.responseMessage
	if(data.obj===false){
		mui.toast(data.msg);
	}else{
		mui.toast(data.responseInfo.responseMessage);
	}
	if(window.plus){
		//获取当前窗口
		var curr = plus.webview.currentWebview();
		//获取所有Webview窗口
		var wvs=plus.webview.all();
		//遍历窗口
		for(var i=0;i<wvs.length;i++){
			//除当前窗口
			if(wvs[i].getURL()!=curr.getURL()){
				//全部关闭
				plus.webview.close(wvs[i]);
			}
		}
		//打开新页面
		plus.webview.open('login.html');
		//关闭之前的当前页
		curr.close();
		//若有加载则关闭
//		plus.nativeUI.closeWaiting();
		}else{
			document.addEventListener('plusready', plusReady, false);
		}
	
}
//登陆失效end


mui.plusReady(function() {
    plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
	plus.navigator.setStatusBarBackground('#43484e');
});

//适配
(function (doc, win) {
        var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';

                };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);


/**
 * 把需要全局用到的变量存入到本地缓存中
 */

/**
 * 保存
 * @param {Object} userInfo  用户信息
 */
function setGlobalUserInfo(userInfo) {

	if(!window.localStorage) {
		alert("不支持localstorage");
		return false;
	} else {
		var storage = window.localStorage;
		storage.setItem("userInfo", JSON.stringify(userInfo));
	}

}

/**
 * 保存
 * @param {Object} url 链接
 */
function setGlobalUrl(url) {

	if(!window.localStorage) {
		alert("不支持localstorage");
		return false;
	} else {
		var storage = window.localStorage;
		storage.setItem("url", url);
	}

}

/**
 * 保存
 * @param {Object} power 权限
 */
function setGlobalPower(power) {

	if(!window.localStorage) {
		alert("不支持localstorage");
		return false;
	} else {
		var storage = window.localStorage;
		storage.setItem("power", power);
	}

}

/**
 * 保存
 * @param {Object} entID 企业id
 */
function setGlobalEntId(entID) {
	if(!window.localStorage) {
		alert("不支持localstorage");
		return false;
	} else {
		var storage = window.localStorage;
		storage.setItem("entid", entID);
	}
}

/**
 * 保存
 * @param {Object} projId 项目id
 */
function setGlobalEntId(projId) {
	if(!window.localStorage) {
		alert("不支持localstorage");
		return false;
	} else {
		var storage = window.localStorage;
		storage.setItem("projId", projId);
	}
}

/**
 * 获取用户信息
 */
function getGlobalprojId() {
	if(!window.localStorage) {
		alert("不支持localstorage");
	} else {
		var storage = window.localStorage;
		var projId = storage.getItem("projId");
		return projId;
	}
}

/**
 * 获取用户信息
 */
function getGlobalUserInfo() {
	if(!window.localStorage) {
		alert("不支持localstorage");
	} else {
		var storage = window.localStorage;
		var userInfo = storage.getItem("userInfo");
		return JSON.parse(userInfo);
	}
}

/**
 * 获取链接
 */
function getGlobalUrl() {
	if(!window.localStorage) {
		alert("不支持localstorage");
	} else {
		var storage = window.localStorage;
		var url = storage.getItem("url");
		return url;
	}
}

/**
 * 获取权限信息列表
 */
function getGlobalPower() {
	if(!window.localStorage) {
		alert("不支持localstorage");
	} else {
		var storage = window.localStorage;
		var power = storage.getItem("power");
		return power;
	}
}

/**
 * 获取权限信息列表
 */
function getGlobalEntId() {
	if(!window.localStorage) {
		alert("不支持localstorage");
	} else {
		var storage = window.localStorage;
		var entid = storage.getItem("entid");
		return entid;
	}
}

