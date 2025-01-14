// 状态转换
var statusObject = {
	1: '正在处理',
	2: '解决完成',
	3: '主题关闭'
}
Vue.filter('transformStatus', function(status) {
	return statusObject[status];
})

// 转换时间
Vue.filter('switchingTime', function(time) {
	var date = new Date(time);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var finish = month + '-' + day + " " + hour + ":" + minutes;
	return finish;
})
//js转换时间戳
function timec(time) {
	var now = new Date(),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}
//截取yyyy-MM-dd HH:mm:ss
function subtime(time){
	var str=time.indexOf('-')-4;
	var newstr=time.substring(str,time.length-9);
	return newstr;
}

//区间所有日期
var dateArr = [];
function getDiffDate(start, end) {
	dateArr.splice(0);
    var startTime = getDate(start);
    var endTime = getDate(end);
    while ((endTime.getTime() - startTime.getTime()) > 0) {
        var year = startTime.getFullYear();
        var month = startTime.getMonth().toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(),10) + 1) : (startTime.getMonth() + 1);
        var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
        dateArr.push(year + "-" + month + "-" + day);
//      console.log(dateArr)
        startTime.setDate(startTime.getDate() + 1);
    }
    return dateArr;
//  return year + "-" + month + "-" + day;
}
function getDate (datestr) {
    var temp = datestr.split("-");
    if (temp[1] === '01') {
        temp[0] = parseInt(temp[0],10) - 1;
        temp[1] = '12';
    } else {
        temp[1] = parseInt(temp[1],10) - 1;
    }
    //new Date()的月份入参实际都是当前值-1
    var date = new Date(temp[0], temp[1], temp[2]);
    return date;
}


// 转换时间
Vue.filter('switchingTime2', function(time) {
	console.log(time);
	var date = new Date(time);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var finish = year + '-' + month + '-' + day + " " + hour + ":" + minutes + ":" + seconds;
	return finish;
})

function addZero(n) {
	return n < 10 ? '0' + n : n ;
}
// 转换时间
Vue.filter('switchingTime7', function(time) {
//	console.log(time);
	var date = new Date(time);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var finish = addZero(year) + '/' + addZero(month) + '/' + addZero(day);
//	console.log('finish',finish);
	return finish;
	
})
//日期
Vue.filter('eday', function(d) {
	var str = d.indexOf('-') - 4;
	var newstr = d.substring(str, d.length - 9);
	return newstr;
})

//时间
Vue.filter('estart', function(e) {
	var str1 = e.indexOf(':') - 2;
	var newresult = e.substring(str1, e.length - 3);
	return newresult;
})

// 获取地址栏参数:英文
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
//获取地址栏参数：中文参数
function getUrlParam(key) {
	// 获取参数
	var url = window.location.search;
	// 正则筛选地址栏
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	// 匹配目标参数
	var result = url.substr(1).match(reg);
	//返回参数值
	return result ? decodeURIComponent(result[2]) : null;
}

// 使用mui.openWindow打开新页面
function GoToURL(url, id) {
	mui.openWindow({
		url: url,
		id: id
	})
}

// 使用mui.openWindow打开新页面，不使用缓存
function GoToUrlNoCache(url, id) {
	mui.openWindow({
		url: url,
		id: id,
		createNew: true,
		styles: {
			cachemode: "noCache",
		}

	})
}

// 产品实例导航
function chanpin_sldh() {
	//得到tonid
	userInfo = getGlobalUserInfo();
	$.ajax({
		type: 'GET',
		url: URL + '/arctron-usercenter/UserApp/getInstanceList.json?pCode=BS1803',
		beforeSend: function(request) {
			request.setRequestHeader('tokenId', userInfo.tokenId);
		},
		dataType: 'JSON',
		success: function(data) {
			if(data.userInstance == undefined) { //不存在对象
				//				mui.toast('您没有产品实例导航权限');
			} else {
				var jumpPlace = data.userInstance.length > 1 ? true : false;
				if(!jumpPlace) {
					var hardCode = data.userInstance[0].hardCode;
					var ip = data.userInstance[0].ip;
					var port = data.userInstance[0].port;
					var midUrl = data.userInstance[0].midUrl;
					//存储用于webgl
					userInfo.hardcode = hardCode;
					userInfo.hardip = ip;
					userInfo.hardport = port;
					setGlobalUserInfo(userInfo);

					// 内网
					var urlAddress = hardCode + '://' + ip + ':' + port + midUrl;
					//
					//					var urlAddress = hardCode + '://' + '203.156.220.3' + ':' + port + midUrl;
					//将url保存起来再进行跳转
					userInfo.url = urlAddress;

					// 上传文件url
					userInfo.fileUrl = data.userInstance[0].fileUrl;

					setGlobalUserInfo(userInfo);
					// 跳转到企业导航页面
					enterprise_navigation();
				} else {
					GoToUrlNoCache('chanpin_sldh.html', 'chanpin_sldh');
				}
			}
		},
		error: function() {
			$('body').show();
			mui.toast('发生异常');
		}
	});
}

// 企业导航
function enterprise_navigation() {
	userInfo = getGlobalUserInfo();
	//1.2   企业导航
	$.ajax({
		type: "GET",
		url: userInfo.url + "/mobile/getUserLoginInfo",
		beforeSend: function(request) {
			request.setRequestHeader('tokenId', userInfo.tokenId);
		},
		data: {
			appType: 7
		},
		success: function(data) {
			if(data.success == false) {
				mui.toast(data.msg);
			} else {
				if(data.obj.ents == undefined || data.obj.ents == null) { //假设不存在ents 说明只有一个或者一个都没有
					if(data.obj.companyName == undefined) {
						mui.toast('您没有企业导航任何权限');
					} else { //说明存在一个权限
						userInfo.entid = data.obj.entId;
						userInfo.companyName = data.obj.companyName;
						userInfo.imgUuid = data.obj.imgUuid;
						setGlobalUserInfo(userInfo)
						//GoToURL('project_navigation.html', 'project_navigation');
						project_navigation();
					}
				} else {
					GoToUrlNoCache('enterprise_navigation.html', 'enterprise_navigation');
				}
			}

		},
		error: function() {
			$('body').show();
			mui.toast('发生异常');
		}
	});
}

// 项目导航
function project_navigation() {
	userInfo = getGlobalUserInfo();
	//需要动态获取entid
	$.ajax({
		type: 'GET',
		url: userInfo.url + '/mobile/projectList',
		data: {
			'entId': userInfo.entid,
			'userId': userInfo.userId,
		},
		success: function(data) {
			if(data.obj == undefined) { //假设没有数据
				mui.toast('您没有权限');
			} else {
				//判断是否需要自动跳转
				if(data.obj.length == 1) {
					// 将pid存入
					userInfo.projId = data.obj[0].projId;
					userInfo.project = data.obj[0];
					setGlobalUserInfo(userInfo);
					getguropid(userInfo);
					//					console.log("--------------"+JSON.stringify(userInfo));
				} else {
					GoToUrlNoCache('project_navigation.html', 'project_navigation');
				}
			}
		},
		error: function() {
			$('body').show();
			mui.toast('发生异常');
		}
	});
}

// 标签跳转   有些页面不可这样写
/*mui('body').on('tap', 'a', function() {
	if(this.href != ''){
		window.top.location.href = this.href;
	}
});*/

//获取当前的群组信息存入
function getguropid(userInfo) {
	//	userInfo = getGlobalUserInfo();
	$.ajax({
		type: 'GET',
		url: userInfo.url + '/cloud/getGroupList?type=json',
		data: {
			'projectId': userInfo.projId,
			'tokenId': userInfo.tokenId
		},
		dataType: 'JSON',
		success: function(data) {
			//						console.log(data.userGroupList);
			for(i = 0; i < data.userGroupList.length; i++) {
				if(data.userGroupList[i].groupName == '默认群组') {
					userInfo.groupId = data.userGroupList[i].groupId;
					userInfo.groupName = data.userGroupList[i].groupName;
					setGlobalUserInfo(userInfo);
					GoToURL('gailan.html', 'gailan1');
					//								console.log("这个里面"+JSON.stringify(userInfo));
				}
			}
		}
	})
}

/*文件大小转换*/
function changeSize(size) {
	var num;
	if((size / 1024) <= 1024) {
		num = size / 1024;
		return num.toFixed(2) + 'KB';
	}
	if((size / 1024) > 1024 && (size / 1024) <= (1024 * 1024)) {
		num = (size / 1024) / 1024;
		return num.toFixed(2) + 'M';
	}
	if((size / 1024) > (1024 * 1024)) {
		num = ((size / 1024) / 1024) / 1024
		return num.toFixed(2) + 'G';
	}
}

// 显示图标
Vue.filter('format', function(value) {
	var i = tool.getAttachIcon(value)
	return "../../" + i.src;
});

//解码url
Vue.filter('changeName', function(value) {
	return decodeURI(value);
});