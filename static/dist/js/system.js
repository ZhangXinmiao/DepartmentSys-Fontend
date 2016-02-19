$(document).ready(function() {
/*	var searchResult;
	var dataToSend = "";
    var systemStatus = Object;
    var nameData = [];
    var availableTags = [];
	function testTelephone() {
		var telephone = $('#telephone').val();
        console.log(telephone);
        var regexTelephone = /\d./;
        if (regexTelephone.test(telephone)) {
            booxbox.alert({
                message: '格式输入错误',
                buttons: {
                    ok: {
                        label: "确定",
                        className: "btn-primary",
                        callback: function() {
                            $('#telephone').val("");
                        }
                    }
                }
            });
            return true;
        } else {
            return false;
        }
	}

    function checkZero() {
        $('.check-zero').each(function() {
            if("" == $(this).val()) {
                $(this).addClass('clear-zero');
                $(this).val(0.0);
            }
        });
    }

    function clearZero() {
        $('.clear-zero').each(function() {
            $(this).val("");
            $(this).removeClass('clear-zero');
        });
    }

    function getDataToSend() {
        checkZero();
        var data = $('#search').serialize();
        clearZero();
        return data;
    }

    function getPrintContent() {
        var i, j, k, count = 1, tdCount = 1;
        var date = new Date().Format("yyyy-MM-dd hh:mm:ss");
        var currentPage = $('body').find('#page-jump-value').data('current-page');
        var resultToPrint = '<table class="table table-bordered text-center" id="print-area" data-exist="1">' +
            '<caption>' +
            '   <h4 class="text-center"><b>' +
            '       CRM系统应收单位信息表' +
            '   </b></h4>' +
            '   <p>' +
            '       <span class="print-caption-left">' +
            '           <b>打印时间：' + date + '</b>' +
            '       </span>' +
            '       <span class="print-caption-right">' +
            '           <b>页码：' + currentPage + '/' + $('body').find('#page-jump-value').data('total-page') + '</b>' +
            '       </span>' +
            '   </p>' +
            '</caption>' +
            '<thead>' +
            '<tr>' +
            '   <td><b>序号</b></td>' +
            '   <td><b>挂账单位</b></td>' +
            '   <td><b>单位代表</b></td>' +
            '   <td><b>联系电话</b></td>' +
            '   <td><b>押金</b></td>' +
            '   <td><b>累计消费</b></td>' +
            '   <td><b>未结消费</b></td>' +
            '   <td><b>余额</b></td>';
        '</thead>' +
        '<tbody>';
        var countData = new Array;
        countData['deposit'] = 0;
        countData['total'] = 0;
        countData['toPay'] = 0;
        countData['left'] = 0;
        console.log(searchResult);
        for (i in searchResult) {
            searchResult[i].date = searchResult[i].date == null ? "无" : searchResult[i].date;
            searchResult[i].lock = searchResult[i].lock == "true" ? "是" : "否";
            searchResult[i].contract = searchResult[i].contract == "true" ? "是" : "否";
            resultToPrint += '<tr>';
            tdCount = 0;
            countData['deposit'] += parseFloat(searchResult[i]['deposit']);
            countData['total'] += parseFloat(searchResult[i]['total']);
            countData['toPay'] += parseFloat(searchResult[i]['toPay']);
            countData['left'] += parseFloat(searchResult[i]['left']);
            for (j in searchResult[i]) {
                if(j == "id") {
                    resultToPrint += '<td>' + ((currentPage - 1) * 13 + count) + '</td>';
                } else if(j == "name" || j == "deputy" || j == "telephone") {
                    resultToPrint += '<td>' + searchResult[i][j] + '</td>';
                } else {
                    resultToPrint += '<td>' +parseFloat(searchResult[i][j]).toFixed(2) + '</td>';
                }
                if(tdCount > 6) {
                    break;
                } else {
                    tdCount++;
                }
            }
            resultToPrint += '</tr>';
            count++;
        }
        var countResultToPrint = '<tr><td><b>合计</b></td><td></td><td></td><td></td>';
        for(var countIndex in countData) {
            countResultToPrint += '<td><b>' + parseFloat(countData[countIndex]).toFixed(2) + '</b></td>';
        }
        countResultToPrint += '</tr>';
        return (resultToPrint + countResultToPrint + '<tobdy></table>');
    }

    function search(notice) {
        $('#none').empty();
        $('#none').append('<h3 class="text-center"></span><i class="fa fa-search"></i>' + notice + '</h3>');
        $('#none').show();
        $('#search-table').hide();
        $('#search-result').empty();
        $('#page-footer').empty();
        dataToSend = getDataToSend();
        $.ajax({
            type : "GET",
            datetype : "json",
            url : $('#search').attr('action') + '/1',
            contentType: "application/json; charset=utf-8",
            data : dataToSend,
            success:function(data,newTextStatus){
                nameData = data.nameData;
                while(availableTags.length > 0) {
                    availableTags.pop();
                }
                for(var shit in nameData)
                {
                    availableTags.push(nameData[shit])
                }
                if(1 == data.status) {
                    $('#system-status').empty();
                    var item;
                    for(item in data.systemStatus) {
                        systemStatus[item] = data.systemStatus[item];
                    }
                    var systemStatusToInsert = '<span id="total" data-total="' + data.systemStatus.sum + '">挂账单位合计：' + data.systemStatus.sum + '&nbsp;</span>' +
                        '押金合计：' + data.systemStatus.deposit + '&nbsp;' +
                        '累计消费合计：' + data.systemStatus.total + '&nbsp;' +
                        '未结消费合计：' + data.systemStatus.toPay + '&nbsp;' +
                        '余额合计：' + data.systemStatus.left;
                    $('#system-status').append(systemStatusToInsert);
                    searchResult = data.data;
                    if (searchResult.length != 0) {
                        $('#none').hide();
                        $('#search-table').show();
                        var detailUrl = $('#search-result').data('detail-url');
                        var i, j, k, resultToInsert = "", count = 1;
                        for (i in searchResult) {
                            searchResult[i].date = searchResult[i].date == null ? "无" : searchResult[i].date;
                            searchResult[i].lock = searchResult[i].lock == "true" ? "是" : "否";
                            searchResult[i].contract = searchResult[i].contract == "true" ? "是" : "否";
                            resultToInsert += '<tr class="search-result-item" data-url="' + detailUrl + searchResult[i].id + '">';
                            for (j in searchResult[i]) {
                                if(j == "id") {
                                    resultToInsert += '<td>' + count + '</td>';
                                } else if(j == "total") {
                                    resultToInsert += '<td class="important">' + parseFloat(searchResult[i][j]).toFixed(2) + '</td>';
                                } else if(j == "deposit" || j == "left" || j == "toPay" || j == "limit") {
                                    resultToInsert += '<td>' +parseFloat(searchResult[i][j]).toFixed(2) + '</td>';
                                } else {
                                    resultToInsert += '<td>' + searchResult[i][j] + '</td>';
                                }
                            }
                            resultToInsert += '</tr>';
                            count++;
                        }
                        var totalData = data.systemStatus.sum;
                        var totalPage = Number(totalData) % 13 == 0 ? (Number(totalData) / 13) : (parseInt(Number(totalData) / 13) + 1);
                        var pageToInsert =
                            '<div class="col-xs-12 center-block text-center">' +
                            '<ul class="pagination">' +
                            '<li><a class="page-item" id="page-first" data-page="1">首页</a></li>' +
                            '<li><a class="page-item" id="page-previous" data-page="' + ((data.currentPage - 1) > 0 ? (data.currentPage - 1) : 0) + '">&lt;</a></li>';
                        if(0 != totalPage) {
                            if(totalPage > 5) {
                                if(data.currentPage <= totalPage - 2 && data.currentPage > 2) {
                                    var pageStart = data.currentPage - 2;
                                    var pageEnd = data.currentPage + 2;
                                }
                                if(data.currentPage > totalPage - 2 && data.currentPage > 2) {
                                    var pageStart = totalPage - 4;
                                    var pageEnd = totalPage;
                                }
                                if(data.currentPage <= totalPage -2 && data.currentPage <= 2) {
                                    var pageStart = 1;
                                    var pageEnd = 5;
                                }
                            } else {
                                var pageStart = 1;
                                var pageEnd = totalPage;
                            }
                            for (k = pageStart; k <= pageEnd; k++) {
                                if (k == data.currentPage) {
                                    pageToInsert += '<li class="active"><a data-page="' + data.currentPage + '" data-current="true">' + k +'</a></li>';
                                    continue;
                                }
                                pageToInsert += '<li><a class="page-item" data-page="' + k + '">' + k + '</a></li>';
                            }
                            pageToInsert += '<li><a class="page-item" id="page-next" data-page="' + ((data.currentPage + 1) <= totalPage ? (data.currentPage + 1) : 0) + '">&gt;</li>' +
                                '<li><a class="page-item" id="page-last" data-page="' + totalPage + '">尾页</a></li>' +
                                '<li><span><b>' + data.currentPage + "/" + totalPage + '</b></span></li>' +
                                '<li><div class="form-group col-sm-2 col-xs-12"><input data-total-page="' + totalPage + '" data-current-page="' + data.currentPage + '" type="text" placeholder="页码" id="page-jump-value" class="form-control"></div></li>' +
                                '<li><a class="btn btn-primary" id="page-jump" value="">跳转</a></li>' +
                                '</ul>' +
                                '</div>';
                            $('#page-footer').append(pageToInsert);
                        }
                        $('#search-result').append(resultToInsert);
                        //autoHeight();
                    } else {
                        $('#none').empty();
                        $('#none').append('<div class="text-center">暂无数据</div>');
                    }
                }
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
                $('#none').empty();
                $('#none').append('<div class="text-center">暂无数据</div>');
                searchResult = null;
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
                bootbox.alert({
                    message: '格式输入错误',
                    buttons: {
                        ok: {
                            label: "确定",
                            className: "btn-primary",
                            callback: function() {
                                $('#telephone').val("");
                            }
                        }
                    }
                });
            }
        });

    }

    function autoHeight() {
        /!*
        var tabaleRowHeight = $('body').find('tr').height();
        var sideBarHeight = $('.main-sidebar').height();
        var contentWrapper = $('.content-wrapper');
        var wrapperHeight = contentWrapper.innerHeight() - 50;
        var content = $('.content');
        var contentHeight = content.outerHeight();
        var distance = (wrapperHeight - contentHeight - 50) / 2 + 50;
        var condition = (contentHeight + distance) < wrapperHeight;
        if(condition) {
            content.css('padding-top', distance + 'px');
        }
        //$('.content-wrapper').css('height', sideBarHeight);
        //$('.box').css('height', sideBarHeight - 70 + 'px');
        console.log("shit");
        //console.log(sideBarHeight);
        //console.log(wrapperHeight);
        //console.log(contentHeight);
        console.log(distance);
        console.log("sidebar" + sideBarHeight, "innerHeight" + window.innerHeight, "clientHeight" + document.body.clientHeight);
        console.log((contentHeight + distance), wrapperHeight, condition);
        //$('.content').css("position","absolute");
        //$('.content').css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
        //                                        $(window).scrollTop()) + "px");
        //$('.content').css({
            //'position' : 'absolute',
            //'top' : '50%',
            //'margin-top' : -$('.content').outerHeight()/2
        //});
        *!/
    }

    $(window).bind("fullscreen-on", function(e) {
        $('body').css('overflow', 'hidden');
        //$('.content').css('padding-top', '10%');
    });

    $(window).bind("fullscreen-off", function(e) {
        $('body').css('overflow', 'auto');
        //$('.content').css('padding-top', '50px');
    });

    window.onresize = autoHeight();

	function page(selectedPage, dom) {
		var isCurrentPage = dom.data('current');
		if(dataToSend != "" && selectedPage != "" && isCurrentPage != "true") {
			$.ajax({
				type : "GET",
				datetype : "json",
				url : $('#search').attr('action') + '/' + selectedPage,
				contentType: "application/json; charset=utf-8",
				data : dataToSend,
				success:function(data,newTextStatus){
					if(1 == data.status) {
						$('#system-status').empty();
                        systemStatus = data.systemStatus;
						var systemStatusToInsert = '<span id="total" data-total="' + data.systemStatus.sum + '">挂账单位合计：' + data.systemStatus.sum + '&nbsp;</span>' +
							'押金合计：' + data.systemStatus.deposit + '&nbsp;' +
							'累计消费合计：' + data.systemStatus.total + '&nbsp;' +
							'未结消费合计：' + data.systemStatus.toPay + '&nbsp;' +
							'余额合计：' + data.systemStatus.left;
						$('#system-status').append(systemStatusToInsert);
						searchResult = data.data;
						if (searchResult.length != 0) {
							var totalData = data.systemStatus.sum;
							var totalPage = Number(totalData) % 13 == 0 ? (Number(totalData) / 13) : (parseInt(Number(totalData) / 13) + 1);
							if(selectedPage <= totalPage) {
                                $('#search-result').empty();
								$('#page-footer').empty();
								var detailUrl = $('#search-result').data('detail-url');
								var i, j, k, resultToInsert = "", count = 1;
								for (i in searchResult) {
									searchResult[i].date = searchResult[i].date == null ? "无" : searchResult[i].date;
									searchResult[i].lock = searchResult[i].lock == "true" ? "是" : "否";
									searchResult[i].contract = searchResult[i].contract == "true" ? "是" : "否";
									resultToInsert += '<tr class="search-result-item" data-url="' + detailUrl + searchResult[i].id + '">';
									for (j in searchResult[i]) {
                                        if(j == "id") {
                                            resultToInsert += '<td>' + ((data.currentPage - 1) * 13 + count) + '</td>';
                                        } else if(j == "total") {
											resultToInsert += '<td class="important">' + parseFloat(searchResult[i][j]).toFixed(2) + '</td>';
										} else if(j == "deposit" || j == "left" || j == "toPay" || j == "limit") {
                                            resultToInsert += '<td>' +parseFloat(searchResult[i][j]).toFixed(2) + '</td>';
                                        } else {
                                            resultToInsert += '<td>' + searchResult[i][j] + '</td>';
                                        }
                                    }
                                    resultToInsert += '</tr>';
                                    count++;
                                }

                                var pageToInsert =
                                    '<div class="col-xs-12 center-block text-center">' +
                                    '<ul class="pagination">' +
                                    '<li><a class="page-item" id="page-first" data-page="1">首页</a></li>' +
                                    '<li><a class="page-item" id="page-previous" data-page="' + ((data.currentPage - 1) > 0 ? (data.currentPage - 1) : 0) + '">&lt;</a></li>';
                                if (0 != totalPage) {
                                    if (totalPage > 5) {
                                        if (data.currentPage <= totalPage - 2 && data.currentPage > 2) {
                                            var pageStart = data.currentPage - 2;
                                            var pageEnd = data.currentPage + 2;
                                        }
                                        if (data.currentPage > totalPage - 2 && data.currentPage > 2) {
                                            var pageStart = totalPage - 4;
                                            var pageEnd = totalPage;
                                        }
                                        if (data.currentPage <= totalPage - 2 && data.currentPage <= 2) {
                                            var pageStart = 1;
                                            var pageEnd = 5;
                                        }
                                    } else {
                                        var pageStart = 1;
                                        var pageEnd = totalPage;
                                    }
                                    for (k = pageStart; k <= pageEnd; k++) {
                                        if (k == data.currentPage) {
                                            pageToInsert += '<li class="active"><a data-page="' + data.currentPage + '" data-current="true">' + k + '</a></li>';
                                            continue;
                                        }
                                        pageToInsert += '<li><a class="page-item" data-page="' + k + '">' + k + '</a></li>';
                                    }
                                    pageToInsert += '<li><a class="page-item" id="page-next" data-page="' + ((data.currentPage + 1) <= totalPage ? (data.currentPage + 1) : 0) + '">&gt;</li>' +
                                        '<li><a class="page-item" id="page-last" data-page="' + totalPage + '">尾页</a></li>' +
                                        '<li><span><b>' + data.currentPage + "/" + totalPage + '</b></span></li>' +
                                        '<li><div class="form-group col-sm-2 col-xs-12"><input data-total-page="' + totalPage + '" data-current-page="' + data.currentPage + '" type="text" placeholder="页码" id="page-jump-value" class="form-control"></div></li>' +
                                        '<li><a class="btn btn-primary" id="page-jump">跳转</a></li>' +
                                        '</ul>' +
                                        '</div>';
                                    $('#page-footer').append(pageToInsert);
                                }
                                $('#search-result').append(resultToInsert);
                                var printDom = $('body').find('#print-area');
                                if(1 == printDom.data('exist')) {
                                    printDom.remove();
                                    var printData = getPrintContent();
                                    $('body').find('.modal-body').append(printData);
                                }
                                //autoHeight();
							}
						} else {

						}
					}
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					console.log(XMLHttpRequest);
					console.log(textStatus);
					console.log(errorThrown);
                    booxbox.alert({
                        message: '格式输入错误',
                        buttons: {
                            ok: {
                                label: "确定",
                                className: "btn-primary",
                                callback: function() {
                                    $('#telephone').val("");
                                }
                            }
                        }
                    });
				}
			});
		}
	}
    //autoHeight();
    $('#date-start').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 0,
        minView: 2,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        todayBtn: true
    });
    $('#date-end').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        weekStart: 0,
        minView: 2,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        todayBtn: true
    });
    search("正在初始化");
	$('#do-search').click(function () {
        search("正在搜索");
	});


	$('#get-excel').click(function () {
		var dataToSend = getDataToSend();
		var excelURL = $('#search').data('excel-url');
		window.open(excelURL + "/?" + dataToSend);
	});

    $('#search').find('input').on("keypress", function(e) {
        if (e.keyCode == 13) {
            var inputs = $(this).parents("form").eq(0).find(":input");
            var idx = inputs.index(this);
            switch(idx) {
                case 10 :
                    inputs[idx + 1].focus();
                    break;
                case 12 :
                    $('#dosearch').click();
                    $('input[type=checkbox]')[1].focus();
                    break;
                case 13 :
                    $('#do-search').click();
                    break;
                default :
                    inputs[idx + 1].focus();
                    inputs[idx + 1].select();
                    break;
            }
            return false;
        }
    });

    $('#search').find('select').keypress(function(e) {
        if(e.keyCode == 13) {
            $('input[type=checkbox]')[0].focus();
        }
    });

    $(document).on('keypress', '#page-jump-value', function(e) {
        if(e.keyCode == 13) {
            $('#page-jump').click();
        }
    });

	$(document).on('click', '.search-result-item', function() {
		window.open($(this).data('url'));
	});

	$(document).on('click', '.page-item', function() {
		page($(this).data('page'), $(this));
	});
	$(document).on('click', '#page-jump', function() {
		page($('body').find('#page-jump-value').val(), $(this));
	});

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

	$('#print').click(function() {
        if(searchResult != null && systemStatus != null) {
/!*            var systemStatusToPrint = '<span><span id="total" data-total="' + systemStatus.sum + '">挂账单位合计：' + systemStatus.sum + '&nbsp;</span>' +
                '押金合计：' + systemStatus.deposit + '&nbsp;' +
                '累计消费合计：' + systemStatus.total + '&nbsp;' +
                '未结消费合计：' + systemStatus.toPay + '&nbsp;' +
                '余额合计：' + systemStatus.left + '</span>';
            $('#system-status').append(systemStatusToInsert);*!/
            if (searchResult.length != 0) {
                var resultToPrint = getPrintContent();
/!*                var totalData = systemStatus.sum;
                var totalPage = Number(totalData) % 10 == 0 ? (Number(totalData) / 10) : (parseInt(Number(totalData) / 10) + 1);
                var pageToInsert =
                    '<div class="col-xs-12 center-block text-center">' +
                    '<ul class="pagination">' +
                    '<li><a class="page-item" id="page-first" data-page="1">首页</a></li>' +
                    '<li><a class="page-item" id="page-previous" data-page="' + ((data.currentPage - 1) > 0 ? (data.currentPage - 1) : 0) + '">&lt;</a></li>';
                if(0 != totalPage) {
                    if(totalPage > 5) {
                        if(data.currentPage <= totalPage - 2 && data.currentPage > 2) {
                            var pageStart = data.currentPage - 2;
                            var pageEnd = data.currentPage + 2;
                        }
                        if(data.currentPage > totalPage - 2 && data.currentPage > 2) {
                            var pageStart = totalPage - 4;
                            var pageEnd = totalPage;
                        }
                        if(data.currentPage <= totalPage -2 && data.currentPage <= 2) {
                            var pageStart = 1;
                            var pageEnd = 5;
                        }
                    } else {
                        var pageStart = 1;
                        var pageEnd = totalPage;
                    }
                    for (k = pageStart; k <= pageEnd; k++) {
                        if (k == data.currentPage) {
                            pageToInsert += '<li class="active"><a data-page="' + data.currentPage + '" data-current="true">' + k +'</a></li>';
                            continue;
                        }
                        pageToInsert += '<li><a class="page-item" data-page="' + k + '">' + k + '</a></li>';
                    }
                    pageToInsert += '<li><a class="page-item" id="page-next" data-page="' + ((data.currentPage + 1) <= totalPage ? (data.currentPage + 1) : 0) + '">&gt;</li>' +
                        '<li><a class="page-item" id="page-last" data-page="' + totalPage + '">尾页</a></li>' +
                        '<li><span>共<b>' + totalPage + '</b>页</span></li>' +
                        '<li><div class="form-group col-sm-2 col-xs-12"><input type="text" placeholder="页码" id="page-jump-value" class="form-control"></div></li>' +
                        '<li><a class="btn btn-primary" id="page-jump" value="">跳转</a></li>' +
                        '</ul>' +
                        '</div>';
                    resultToPrint += pageToInsert;
                }*!/
                //console.log($(document).find('#page-footer').innerHTML());
                //console.log(document.getElementsByTagName('').);
                bootbox.dialog({
                    message: resultToPrint,
                    title:  '<ul id="print-pager-ul">' +
                            '<li>' +
                            '<button class="btn btn-success btn-md" id="start-to-print"><span class="ace-icon fa fa-print icon-on-right bigger-110"></span>开始打印</button>' +
                            '</li>' +
                            '   <li><button class="btn btn-default btn-md" id="print-pager-prev">上一页</button></li>' +
                            '   <li><button class="btn btn-default btn-md" id="print-pager-next">下一页</button></li>' +
                            '   <li>' +
                            '      <input placeholder="页码" id="print-pager-input" class="form-control" type="text"><button id="print-pager-jump" class="btn btn-default btn-md">跳转</button>' +
                            '   </li>' +
                            '</ul>'
                });
                $('body').find('.modal-dialog').css('width', '70%');
            } else {
                bootbox.alert("无可打印内容");
            }
        } else {
            bootbox.alert("请搜索后打印");
        }
	});

    $(document).on('click', '#start-to-print', function() {
        $('#print-area').printArea();
    });

    $(document).on('click', '#print-pager-prev', function() {
        $('body').find('#page-previous').click();
    });

    $(document).on('click', '#print-pager-next', function() {
        $('body').find('#page-next').click();
    });
    $(document).on('click', '#print-pager-jump', function() {
        var pageToJump = $('body').find('#print-pager-input').val();
        $('body').find('#page-jump-value').val(pageToJump);
        $('body').find('#page-jump').click();
    });
    $('#reset').click(function() {
        $('#search-table').hide();
        $('#page-footer').empty();
    });
    $("#name-autocomplete").autocomplete({
        source: availableTags
    });*/
});
