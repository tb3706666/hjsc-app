/**
 * 是否收藏标识  false 为未收藏
 */
var ISCOLLECT;

/**
 * 获取当前点击的下标
 */
var INDEX;

/**
 * 主题ID
 */
var DCID;

/**
 *当前点击的a标签对象 
 */
var CUR;

/**
 * 是之前的还是之后的数据
 */
var direction;


/**
 * 什么时间
 */
var time;

/**
 * 点击查询之后
 */

var ischeck=false;

///**
// * 项目id
// */
//
//var addproid;
$("#add").on('tap', function() {
	GoToUrlNoCache('published.html', 'published');
})

// 关闭父页面
//mui.plusReady(function() {
//	alert(plus.webview.currentWebview().opener().id);
//  plus.webview.currentWebview().opener().close('none');
//});

mui.plusReady(function() {

	var curr = plus.webview.currentWebview();
	var wvs = plus.webview.all();
	for(var i = 0, len = wvs.length; i < len; i++) {
		//关闭除当前页面外的其他页面
		//if (wvs[i].getURL() != curr.getURL()){
		//  plus.webview.close(wvs[i]);
		//}
		//关闭除指定页面外的其他页面
		//key 可以是指定页面名称或者其他关键字
		if(wvs[i].getURL().indexOf("published") != -1) {
			plus.webview.close(wvs[i], 'none');
		}
	}
	//打开login页面后再关闭setting页面
	//curr.close();
});

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
var SIZE = 0;
var CURSIZE = 0;
var vueList = new Vue({
	el: "#card",
	data: {
		list: []
	},
	watch: {
		list: function() {
			SIZE = this.list.length;
			this.$nextTick(function() {
				isOpen();
				operation();
				jump();
			})
		}
	},
});

var titleList = [{
		title: '相关性',
		text: '相关性',
		type: '0',
		status: 'true'
	},
	{
		title: '相关性',
		text: '全部主题',
		type: '-1'
	},
	{
		title: '相关性',
		text: '由我发表',
		type: '1'
	},
	{
		title: '相关性',
		text: '有我评论',
		type: '2'
	},
	{
		title: '相关性',
		text: '有提到我',
		type: '3'
	},
	{
		title: '相关性',
		text: '我的收藏',
		type: '4'
	},

	{
		title: '主题状态',
		text: '主题状态',
		type: '0',
		status: 'true'
	},
	{
		title: '主题状态',
		text: '全部状态',
		type: '-1'
	},
	{
		title: '主题状态',
		text: '正在处理',
		type: '1'
	},
	{
		title: '主题状态',
		text: '解决完成',
		type: '2'
	},
	{
		title: '主题状态',
		text: '讨论终结',
		type: '3'
	},
];

new Vue({
	el: '#titleList',
	data: {
		titleList: titleList
	}
})

// 是否显示展开收藏
function isOpen() {
	for(var i = CURSIZE; i < (SIZE + CURSIZE); i++) {
		var cur = $('#Ndetail' + i);
		var rowNum = Math.round(cur.height() / parseFloat(cur.css('line-height')));
		if(rowNum > 2) {
			$('#detail' + i).addClass("two_h")
			$('#detail' + i).next().show();
			$('#detail' + i).next().html('展开');
		} else {
			$('#detail' + i).removeClass('two_h');
			$('#detail' + i).next().hide();
		}
	}
	CURSIZE = SIZE;

	//详情展开全部
	$('.open_').unbind();
	$('.open_').on('tap', function() {
		$(this).prev().toggleClass('two_h');
		$(this).html() == '展开' ? $(this).html('收起') : $(this).html('展开');
	})

}

// 渲染操作标签点击事件
function operation() {
	$('.arrov-out').unbind();
	$('.arrov-out').on('tap', function() {
		setTimeout(function() {
			$("#topPopover").css('left', '0px');
		}, 20);

		//false 为未收藏
		ISCOLLECT = $(this).attr('collect');
		INDEX = $(this).attr('index');
		CUR = $(this);
		DCID = $(this).attr('dcId');
		if(ISCOLLECT == 'true') {
			$("#collect").html('取消收藏');
			$("#collect").parent().prev().prop('src', '../../icon/ztg_2_1.png')
		} else {
			$("#collect").html('收藏');
			$("#collect").parent().prev().prop('src', '../../icon/ztg_2.png')
		}

		//完成点击事件
		ztstatus = $(this).attr('ztstatus');
		//		console.log('状态',ztstatus);
		ztupd = "";
		if(ztstatus == 2) {
			ztupd = "再议";
		} else if(ztstatus == 3) {
			ztupd = "开启";
		} else {
			ztupd = "完成";
		}
		$('#zaiyi').html(ztupd);

	})
}

// 跳转页面
function jump() {
	$('.card-out').unbind();
	$('.card-out').on('tap', function(e) {

		if(!$(e.target).hasClass('stop')) {
			var index = $(this).attr('index');
			var obj = vueList.list[index];
			var url = 'Thematic.html?dcId=' + obj.dcId + '&subProjId=' + obj.subProjId+"&index="+index;
//			parent.jump(url);
       GoToURL(url,"gothematic");
      
		}

	});
}

$(function() {

	init_data();
	//正确代码

	$("#otherChoose").on('tap', function(e) {})

	//其他筛选
	$('#middlePopover .mui-table-view-cell').on('tap', function() {
		//alert();
		// 标题不做反应
		if($(this).hasClass('titleColor')) {
			return;
		}
		// 如果是相关性
		if($(this).find('.condition').hasClass('relation')) {
			$('.relation').empty();
			$('.condition').removeClass('relation2');
			$(this).find('.relation').addClass('relation2');
			$(this).find('.relation').html("✓");
			mui('#middlePopover').popover('toggle');
			ischeck=true;
			//          mui('#middlePopover').popover('hide');
		} else { //如果是主题状态
			ischeck=true;
			$('.status').empty();
			$('.condition').removeClass('status2');
			$(this).find('.status').addClass('status2');
			$(this).find('.status').html("✓");
			mui('#middlePopover').popover('toggle');
			//          mui('#middlePopover').popover('hide');
		}
		init();

	});

})

/**
 * 加载本地缓存数据
 */
function init_data() {
	userInfo = getGlobalUserInfo();
	userId = userInfo.userId;
	tokenId = userInfo.tokenId;
	projId = userInfo.projId;
	entId = userInfo.entid;
	url = userInfo.url;

	init_project();
	//init_GroupId();

	//init_list();
}

//获取建筑容器信息  渲染项目名称
function init_project() {
	//1.6 && 1.7 方法一样
	$.ajax({
		type: 'GET',
		url: url + '/mobile/getAllSubProject',
		beforeSend: function(request) {
			request.setRequestHeader('tokenId', tokenId);
			
		},
		data: {
			entId: entId,
			userId: userId,
			projId: projId
		},
		async: true,
		dataType: 'JSON',
		success: function(data) {
			//console.log("项目名称", data.obj);
			//登陆失效
			if(!data.success || !data.obj) {
				tokenInvalid(data);
			} else {
				init_GroupId();
//				console.log(userInfo);
//				addproid=userInfo.
           if(userInfo.builderId==undefined){
	           userInfo.builderId = data.obj.SubProject[0].ID;
							setGlobalUserInfo(userInfo);
							console.log("刚进来",userInfo.builderId);
               }             
				//项目名称
				new Vue({
					el: '#projectPopover',
					data: {
						titleList: data.obj.SubProject,
//						proid:
					},
					mounted: function() {
						$('.ztname1').html(this.titleList[0].Name);
						// 项目名称
						$("#projectPopover .mui-table-view-cell").on('tap', function() {
							$('.ztname1').html($(this).text().replace('✓'));
							$('.project').empty();
							$('.project').removeClass('project2');
							$(this).find('.project').addClass('project2');
							$(this).find('.project').html("✓");
					  	var builderId = $(this).find('.ztgou').attr("projectId");  
							userInfo.builderId = builderId;
							setGlobalUserInfo(userInfo);
							console.log("后来",userInfo.builderId);
							//mui('#projectPopover').popover('hide');
							mui('#projectPopover').popover('toggle');
							ischeck=true;
							init();
						});
						
						var xmh=$('#projectPopover ul li').length*30+'px';
						$('#projectPopover').height(xmh);
					}
				})
				//项目名称，其他筛选
				//数据渲染完成后让其超出可滚动
				mui('#projectPopover .mui-scroll-wrapper,#middlePopover .mui-scroll-wrapper').scroll();
				
			}

		}
	});
}

//4.1 获取群组列表id  渲染群组
function init_GroupId() {
	$.ajax({
		type: 'GET',
		url: url + '/cloud/getGroupList?type=json',
		data: {
			'projectId': projId,
			'tokenId': tokenId
		},
		async: true,
		dataType: 'json',
		success: function(data) {
			if(data.responseInfo.responseCode == 101) {
				mui.toast(data.responseInfo.responseMessage);
			} else {
				//若用户存在于“质量检查、安全检查和质量验收”群组内，在当前群组下拉框中隐藏这3个群组
//				console.log(data.userGroupList);
				var datas = [];
			for (var i = 0; i < data.userGroupList.length; i++) { 
//				console.log(data.userGroupList[i].groupName);
				//
         if(data.userGroupList[i].groupName =="质量检查" || data.userGroupList[i].groupName=="安全检查" || data.userGroupList[i].groupName=="质量验收" || data.userGroupList[i].groupName=="安全验收" ){
         }else{
         	datas.push(data.userGroupList[i]);
         }
       };
				var gids = new Vue({
					el: '#groupPopover',
					data: {
						titleList: datas
					},
					mounted: function() {
						$('.ztname2').html(this.titleList[0].groupName);
						$("#groupPopover .mui-table-view-cell").on('tap', function() {
							$('.ztname2').html($(this).text().replace('✓'));
							$('.groupId').empty();
							$('.groupId').removeClass('groupId2');
							$(this).find('.groupId').addClass('groupId2');
							$(this).find('.groupId').html("✓");
							var ugid = $(this).find('span').attr("groupId");
							userInfo.groupId = ugid;
							setGlobalUserInfo(userInfo);
							// mui('#groupPopover').popover('hide');
							mui('#groupPopover').popover('toggle');
							ischeck=true;
							init();
						});
						mui('#groupPopover .mui-scroll-wrapper').scroll();
						var qzh=$('#groupPopover ul li').length*37+'px';
						$('#groupPopover').height(qzh);
					}
				});

				// 渲染主题列表
				//init_list();
				updown();

			}

		}
	})
}

function init() {
	CURSIZE = 0;
	//pageNums = 1;
//	pageSize = 5;
	time=0;
		ischeck=true;
	miniRefresh.scrollTo(0, 300);
	miniRefresh.resetUpLoading();
	//minirefresh.triggerDownLoading();
	miniRefresh.triggerUpLoading();
	//init_list();
}


// 页数
//var pageNums = 1;
//
//// 条数
//var pageSize = 5;
//
//// 当前条数
//var curSize = 0;
//
//// 总页数
//var totalPage;

// 加载主题列表
function init_list(arg) {

	//alert(arg+"===> 总页数："+totalPage+" 当前页数:"+pageNums);

	// 项目id
	var builderId = $(".project2").attr('projectId');
	// 群组id
	var ugId = $('.groupId2').attr('groupId');
	// 主题状态
	var status = $(".status2").attr('type');
	// 相关性
	var type = $('.relation2').attr('type');

				//2.9
				$.ajax({
					type: "get",
					url: userInfo.url +"/mobile/dcListWithIndex",
					async: true,
					beforeSend: function(request) {
						request.setRequestHeader('tokenId', userInfo.tokenId);
						request.setRequestHeader('appType', 7);
					},
					data: {
						builderId: builderId, //从1.6方法中返回值DefaultSubProjId来
						userId: userInfo.userId,
						projId:userInfo.projId,
						ugId: ugId,
						status: status, //1：正在处理，2：解决完成，3：终结讨论，4：等待审核，5：修改补充，6：验收驳回，7：验收通过，8：等待整改，9：等待检查，10：继续整改，11：整改撤销，12：整改完成，13：等待初审，14：等待复审，15：初审的修改补充，16：复审的修改补充
						type: type,
						entId: userInfo.entid,
						time:time,
						direction:direction, // direction 0:之前的，1:之后的
					},
					success: function(data) {
//						debugger;/
//						console.log('主题列表', data);
						//登陆失效
						if(!data.success || !data.obj) {
							tokenInvalid(data);
							miniRefresh.endDownLoading();
							return;
						}
						//如果是查询之后的
						if(ischeck==true){
								vueList.list = data.obj;
//								if(){
//									
//								}
								ischeck=false;

						}else{
						if(vueList.list.length==0){
							vueList.list = data.obj;
						}else{
							 console.log(data.obj);
							if(data.obj == undefined || data.obj.length == 0){
								miniRefresh.endDownLoading();
								miniRefresh.endUpLoading(true);
								return;
							}
							
							//判断第一个值和查询出来的第一个主题id是否一致
							if(vueList.list[0].dcId!=data.obj[0].dcId){
//								   vueList.list = data.obj;
//							}else{
								vueList.list = vueList.list.concat(data.obj);
							}
						
						}
						}
				if(arg == 'down') {
					miniRefresh.endDownLoading();
					
				} else if(arg == 'up') {
					miniRefresh.endUpLoading((data.obj.length==0));
				} else {
					miniRefresh.endUpLoading((data.obj.length==0));
				}
				if(data.obj.length == 0) {
					$(".upwrap-tips").html('没有查询到相关数据');
				}
				
				mui.previewImage();
		},
		error: function() {
			miniRefresh.endDownLoading();
		}
				});
}

$('#topPopover .mui-table-view-cell').on('tap', function() {
	var id = $(this).data('id');
	switch(id) {
		case 1:
			var btn = ['确定', '取消'];
			mui.confirm('确定删除吗?', ' ', btn, function(e) {
				if(e.index == 0) {
					$.ajax({ //  2.11 
						type: "get",
						url: userInfo.url+"/mobile/deleteDC",
						async: true,
						beforeSend: function(request) {
							request.setRequestHeader('tokenId', tokenId);
							request.setRequestHeader('appType', 7);
						},
						data: {
							userId: userInfo.userId,
							dcId: DCID, //执行2.9方法
							type: 1, //1：设计协调页签，2：质量验收页签，3：质量检查页签，4：安全验收页签
							entId: userInfo.entid
						},
						success: function(data) {
							console.log(data);
							debugger;
							//登陆失效
							if(data.obj==false) {
								tokenInvalid(data);
								return;
							}
							
							if(data.success) {
								mui.toast("删除成功");
								//移除掉这个div
								vueList.list.splice(INDEX, 1);
							} else {
								mui.toast('删除失败，发生异常');
							}
							//							console.log("2.10", data);
						}
					});
				}
			})
			break;
		case 2:
			//2.10
			$.ajax({
				type: "POST",
				url: userInfo.url + "/mobile/collect",
				async: true,
				beforeSend: function(request) {
					request.setRequestHeader('tokenId', tokenId);
					request.setRequestHeader('appType', 7);
				},
				data: {
					userId: userInfo.userId,
					dcId: DCID, //执行2.9
					isCollect: ISCOLLECT == 'false' ? 1 : 0, //1:收藏  其他
					entId: userInfo.entid
				},
				success: function(data) {
					// console.log("2.10",data);
					if(data.success) {
						if(ISCOLLECT == 'false') {
							vueList.list[CUR.attr('index')].collect = true;
							mui.toast('收藏成功');
							CUR.attr('collect', 'true');
							$("#collect").html('取消收藏');
						} else {
							vueList.list[CUR.attr('index')].collect = false;
							mui.toast('取消收藏成功');
							CUR.attr('collect', 'false');
							$("#collect").html('收藏');
						}
					} else {
						mui.toast('收藏失败，发生异常');
					}
				}
			});
			// 阻止冒泡

			break;
		case 3:
			//获取里面的值
			zaiyi = $('#zaiyi').html();
			teststatus = "";
			//获取下标改变当前列表的状态
			var inde=CUR.attr("index");
			
			if(zaiyi == '完成') {
				//弹出框框进行选择
				var btnArray = ['终结讨论', '解决完成'];
				mui.confirm('请选择你的操作', ' ', btnArray, function(e) {
					//debugger;
					if(e.index == 1) {
						$('#zaiyi').html('再议');
						teststatus = 2;
						vueList.list[inde].dcStatus=2;
						CUR.attr('ztstatus', teststatus);
						zaiyis = '再议';
						wancheng();
						mui.toast('解决完成');
					} else {
						$('#zaiyi').html('开启');
						teststatus = 3;
						vueList.list[inde].dcStatus=3;
						CUR.attr('ztstatus', teststatus);
						zaiyis = '开启';
						wancheng();
						mui.toast('终结讨论');
					}
				})

			} else {
				$('#zaiyi').html('完成');
				//正在处理  1
				zaiyis = '完成';
				teststatus = 1;
				vueList.list[inde].dcStatus=1;
				CUR.attr('ztstatus', teststatus);
				wancheng();
				mui.toast('正在处理');
			}
			

			break;
			//case 4:
			//	mui.toast('审核');
			//	break;
			//case 5:
			//	mui.toast('检查');
			//	break;
			//	case 6:
			//	mui.toast('提交');
			//	break;
	}

	mui('#topPopover').popover('hide')
})

mui('#home_scroll').scroll();

//下拉刷新上拉加载
var miniRefresh;

function updown() {
	var loadFull = new Object();
	loadFull.isEnable = false;
	//loadFull.isAuto = false;

	// 引入任何一个主题后，都会有一个 MiniRefresh 全局变量
	miniRefresh = new MiniRefresh({
		container: '#test',
		//isUseBodyScroll:true,
		down: {
			// 是否每次下拉完毕后默认重置上拉，为false时下拉刷新后不会自动重置上拉状态
			//isAutoResetUpLoading: true,
			//isAuto: true,
			callback: function() {
			  time=0;
			  direction=1;//之后的
				$('.two_h').each(function(index) {
					if(index > 5) {
						$(this).removeClass('two_h');
					}
				});
         ischeck=true;
				//setTimeout(function() {
				CURSIZE = 0;
				//pageNums = 1;
				pageSize = 5;
				
				totalPage = undefined;
				init_list('down');

				//miniRefresh.endDownLoading();

				//}, 500)

			}
		},
		up: {
			//isAuto:false,
			loadFull: loadFull,
			callback: function() {
				direction=0; //之前的
				//获取最后一条的时间戳
					var listlength=vueList.list.length-1;
					
					if(listlength==-1){
						time=0;
					}else{
						if(ischeck==true){
							time=0;
						}else{
							 time=vueList.list[listlength].createTime;
						}
						
					}
//					alert(vueList.list[listlength].createTime);
				//alert('上拉===》 总页数:'+totalPage +" 页数："+ pageNums);
				// 上拉事件
				//if(totalPage != pageNums) {
					setTimeout(function() {
						init_list('up');
					}, 500);

			},
		}
	});

}

$('.bg_sanjiao').on('tap', function(e) {
	//e.stopPropagation();
})

// 标签跳转
mui('body').on('tap', 'a', function() {
	//alert(this.href);
	return;
	if(this.href != '') {
		window.top.location.href = this.href;
	}
});

// 监听点击背景触发搜索主题列表
window.addEventListener('tap', function(e) {           
	if(e.target.className == 'mui-backdrop mui-active') {
		pageNums = 1;
		init_list();
	}   
}, true);

function wancheng() {
	//return;
	$.ajax({
		type: "GET",
		url: userInfo.url + "/mobile/finishDC",
		async: true,
		beforeSend: function(request) {
			request.setRequestHeader('tokenId', userInfo.tokenId);
			request.setRequestHeader('appType', 7);
		},
		data: {
			userId: userInfo.userId,
			type: 1, // 1：设计协调页签，2：质量验收页签，3：质量检查页签，4：安全验收页签
			entId: userInfo.entid,
			dcId: DCID, //查询2.9返回值
			operate: zaiyi,
			dcStatus: teststatus,

		},
		success: function(data) {
//			console.log('ajax', zaiyis);
			$('#zaiyi').html(zaiyis);
		}
	});
}

//恢复视点
$(document).on("tap",'#go',function(){
	var infos=$(this).attr('location');
	event.stopPropagation();//阻止触发父元素的点击事件
	mui.openWindow({
		url: 'Space_container.html',
        id: 'Space_container',
        extras: {
            infos: infos,
        },
	});
});

//改变收藏状态
function resetCollect(index, status){
	  if(status != undefined){
	  		vueList.list[index].collect = status;
	  }
	
	
	 
}
