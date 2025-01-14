mui.init();

/*var _img;
				var  _title;
				var  _account;
				var  _administrator;
				var  _address;
				var  _scale;
				var  _unit;*/

function get(_img, _title, _account, _administrator, _address, _scale, _unit) {

	return '<div class="mark-out" id="test">' +
		'<div class="mark-one2"><img class="circle" src="../../icon/circle.png"></div>' +
		'<div class="info2">' +
		'<div class="detail-out2">' +
		'<div class="detail-left2 ">' +
		'<img class="img-title" src="' + _img + '" />' +
		'</div>' +
		'<div class="detail-left2 right-left ">' +
		'<a class="mui-navigate">' + _title + '</a>' +
		'<div class="detail">工程账号：' + _account + '</div>' +
		'<div class="detail">工程管理员：' + _administrator + '</div>' +
		'<div class="detail">工程地址：' + _address + '</div>' +
		'<div class="detail">工程规模：' + _scale + '</div>' +
		'<div class="detail">建设单位：' + _unit + '</div>' +
		'</div>' +
		'</div>' +
		'<div class="nav nav-border"></div>' +
		'<div class="nav nav-background"></div>' +
		'</div>' +
		'</div>';
}

init3();

function init3() {
	var position = new AMap.LngLat(116.397428, 39.90923);
	var position2 = new AMap.LngLat(116.369441, 39.90923);
	// 创建地图实例
	var map = new AMap.Map("container", {
		zoom: 13,
		center: position,
		resizeEnable: true
	});

	// 点标记显示内容，HTML要素字符串
	/*var markerContent = '' +
		'<div class="custom-content-marker">' +
		'   <img class="circle" src="../../icon/circle.png">' +
		'</div>';*/

	var temp = '<div class="mark-out">' +
		'<div class="mark-one"><img class="circle" src="../../icon/circle.png"></div>' +
		'<div class="info" id="info2" onclick="change(this)"  >' +
		'<span>三八河商品住宅项目</span>' +
		'<div class="nav nav-border"></div>' +
		'<div class="nav nav-background"></div>' +
		'</div>' +
		'</div>';

	var temp2 = '<div class="mark-out">' +
		'<div class="mark-one"><img class="circle" src="../../icon/circle.png"></div>' +
		'<div class="info" id="info"  onclick="change(this)">' +
		'<span >企业办公楼</span>' +
		'<div class="nav nav-border"></div>' +
		'<div class="nav nav-background"></div>' +
		'</div>' +
		'</div>';

	var marker = new AMap.Marker({
		position: position,
		// 将 html 传给 content
		content: temp,
		// 以 icon 的 [center bottom] 为原点
		offset: new AMap.Pixel(-93, -20)
	});

	var marker2 = new AMap.Marker({
		position: position2,
		// 将 html 传给 content
		content: temp2,
		// 以 icon 的 [center bottom] 为原点
		offset: new AMap.Pixel(-13, -200)
	});

	/*		marker2.getContent().bind("click",function(){
				
				alert(1);
});*/

	//点标注的点击事件
	marker2.on('click', function(e) {

		//alert(marker2.getContent());
		//console.log(marker2);

		var position = e.target.F.position;
		var offset = e.target.F.offset;

		$("#test").remove();
		map.remove(marker);
		map.add(marker);

		map.remove(marker2);

		var tm = get('../../icon/office1.jpg', '企业办公楼', 'Q300218090317', '王自强', '上海市浦东新区', '15000 m2', '上海浦东土地控股有限公司');

		var temp = new AMap.Marker({
			position: position,
			// 将 html 传给 content
			content: tm,
			// 以 icon 的 [center bottom] 为原点
			offset: offset
		});

		map.add(temp);

	});

	marker.on('click', function(e) {
		$("#test").remove();
		map.remove(marker2);
		map.add(marker2);

		var position = e.target.F.position;
		var offset = e.target.F.offset;

		map.remove(marker);

		var tm = get('../../icon/office2.jpg', '三八河商品住宅项目', 'Q300218090317', '刘明利', '上海市浦东新区', '15000 m2', '上海浦东土地控股有限公司');

		var temp = new AMap.Marker({
			position: position,
			// 将 html 传给 content
			content: tm,
			// 以 icon 的 [center bottom] 为原点
			offset: offset
		});

		map.add(temp);
	});

	//点击合法marker重定向到parkInfo页面
	/*var _onClick = function(e) {
   			change(e);
   				//window.open("parkInfo.html?id="+this.G.index,"_blank");
   				 
            }*/

	//给所有的点标注添加点击事件
	/*AMap.event.addListener(marker, 'click', _onClick);
	AMap.event.addListener(marker2, 'click', _onClick);*/
	// 将 markers 添加到地图
	map.add(marker);
	map.add(marker2);
	//设置地图自适应
	map.setFitView();

}

// 清除 marker
function clearMarker() {
	map.remove(marker);
}

// 渲染数据
var dataList = new Vue({
	el: '#item1',
	data: {
		list: []
	},
	watch: {
		list: function() {
			this.$nextTick(function() {
				rlush();
			})
		}
	}
});

$(function() {
	//return;
	userinfo = getGlobalUserInfo();
	//需要动态获取entid
	//	 console.log("entid"+userinfo.entid);
	$.ajax({
		type: 'GET',
		url: userinfo.url + '/mobile/projectList',
		data: {
			'entId': userinfo.entid,
			'userId': userinfo.userId,
		},
		success: function(data) {
			console.log(data.obj);
			//			alert(data.obj);
			if(data.obj == undefined) { //假设没有数据
				mui.toast('您没有权限');
			} else {
				//判断是否需要自动跳转
				if(data.obj.length == 1) {
					//					将pid存入
					userinfo.projId = data.obj[0].projId;
					userinfo.project = data.obj[0];
					setGlobalUserInfo(userinfo);
					getguropid(userInfo);
					//					location.href = '/hjsc-app/pages/at_team/gailan.html';
					mui.openWindow({
						url: 'gailan.html',
						id: 'gailan1',
						createNew: true,
						styles: {
							cachemode: "noCache",
						}
					});
				} else {
					//绑定页面
					dataList.list = data.obj;
				}
			}
			$("#ti").css('display', 'block');
			$("#ds").css('display', 'block');

		}
	});

	new Vue({
		el: heads,
		data: {
			companyName: userinfo.companyName
		}
	})
});

//跳转
function rlush() {
	$('.mui-table-view-cell').on("tap", function() {
		userinfo.projId = $(this).prop('id');
		var index = $(this).attr('index');
		userinfo.project = dataList.list[index]; //获取整个项目
		setGlobalUserInfo(userinfo);
		getguropid(userinfo);
		//      mui.openWindow({
		//					url:'gailan.html',
		//					id:'gailan1',
		//				})
	});
}

//获取当前的群组信息存入
function getguropid(userinfo) {
	$.ajax({
		type: 'GET',
		url: userinfo.url + '/cloud/getGroupList?type=json',
		data: {
			'projectId': userinfo.projId,
			'tokenId': userinfo.tokenId
		},
		dataType: 'JSON',
		success: function(data) {
			for(i = 0; i < data.userGroupList.length; i++) {
				if(data.userGroupList[i].groupName == '默认群组') {
					userinfo.groupId = data.userGroupList[i].groupId;
					setGlobalUserInfo(userinfo);
					//								console.log(userinfo);
					mui.openWindow({
						url: 'gailan.html',
						id: 'gailan1',
						createNew: true,
						styles: {
							cachemode: "noCache",
						}
					})

				}
			}
		}
	})
}

//接收参数
//mui.plusReady(function() {
//	var self = plus.webview.currentWebview();
//	var name = self.name;
//	var pid = self.pid;
//	alert(name + '--' + pid)
//});