$(document).ready(function () {
    $(".find").click(function(){
      get();
    });
    //点击详情按钮执行的操作
    $("body").on("click", ".detail", function(){
        var mark = $(this).attr("data-mark");
        $.ajax({
            type: "GET",
            url: "/data.json",
            contentType: "application/json; charset=utf-8",
            data: "list",
            async: false,
            success: function(data){
                data = data.list;
                var roomNumber = data[mark]['roomNumber'];
                var roomState = data[mark]['roomType'];
                var bId = data[mark]['bId'];
                var roomUnit = data[mark]['roomUnit'];
                var roomFloor = data[mark]['roomFloor'];
                var roomType = data[mark]['roomType'];
                var roomArea = data[mark]['roomArea'];
                var roomDirection = data[mark]['roomDirection'];
                bootbox.dialog({
                    title: "房产详情",
                    message: '<form class="form-horizontal" role="form">' +
                    '<div class="form-group">' +
                    '<label for="roomNumber" class="col-sm-5 control-label">' +
                    '房间号' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control" id="roomNumber" value="' + roomNumber + '" readonly/>' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomState" class="col-sm-5 control-label">' +
                    '房间状态' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control" id="roomState" value="' + roomState + '" readonly />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="bId" class="col-sm-5 control-label">' +
                    '所属楼宇' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control" id="bId" value="' + bId + '" readonly />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomUnit" class="col-sm-5 control-label">' +
                    '单元号' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control" id="roomUnit" value="' + roomUnit + '" readonly />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomFloor" class="col-sm-5 control-label">' +
                    '房间所在楼层' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control" id="roomFloor" value="' + roomFloor + '" readonly />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomType" class="col-sm-5 control-label">' +
                    '房间户型' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control" id="roomType" value="' + roomType + '"  readonly/>' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomArea" class="col-sm-5 control-label">' +
                    '房间面积' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control" id="roomArea" value="' + roomArea + '" readonly />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomDirection" class="col-sm-5 control-label">' +
                    '房间朝向' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control" id="roomDirection" value="' + roomDirection + '" readonly />' +
                    '</div>' +
                    '</div>' +
                    '</form>',
                    buttons: {
                        "cancel": {
                            "label": "<i class='icon-info'></i> 关闭详情页",
                            "className": "btn-sm btn-primary",
                            "callback": function () {
                            }
                        }
                    }
                });
                //将获取到的数据放在表单中
               // $("#roomNumber").setAttribute("value", roomNumber);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });


    //点击修改信息进行的操作
    $("body").on("click", ".alter", function() {
        //console.log($(this).attr("data-mark"));
        var mark = $(this).attr("data-mark");
        $.ajax({
            type: "GET",
            url: "/data.json",
            contentType: "application/json; charset=utf-8",
            data: "list",
            async: false,
            success: function(data){
                data = data.list;
                var roomNumber = data[mark]['roomNumber'];
                var roomState = data[mark]['roomType'];
                var bId = data[mark]['bId'];
                var roomUnit = data[mark]['roomUnit'];
                var roomFloor = data[mark]['roomFloor'];
                var roomType = data[mark]['roomType'];
                var roomArea = data[mark]['roomArea'];
                var roomDirection = data[mark]['roomDirection'];
                bootbox.dialog({
                    title: "房产详情",
                    message: '<form class="form-horizontal" id="alterForm" role="form">' +
                    '<div class="form-group">' +
                    '<label for="roomNumber" class="col-sm-5 control-label">' +
                    '房间号' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间号！" id="roomNumber" value="' + roomNumber + '" />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomState" class="col-sm-5 control-label">' +
                    '房间状态' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间状态!" id="roomState" value="' + roomState + '"  />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="bId" class="col-sm-5 control-label">' +
                    '所属楼宇' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间所属楼宇!" id="bId" value="' + bId + '"  />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomUnit" class="col-sm-5 control-label">' +
                    '单元号' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间单元号!" id="roomUnit" value="' + roomUnit + '"  />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomFloor" class="col-sm-5 control-label">' +
                    '房间所在楼层' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房屋所在楼层!" id="roomFloor" value="' + roomFloor + '"  />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomType" class="col-sm-5 control-label">' +
                    '房间户型' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间户型!" id="roomType" value="' + roomType + '"  />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomArea" class="col-sm-5 control-label">' +
                    '房间面积' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间状面积!" id="roomArea" value="' + roomArea + '"  />' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="roomDirection" class="col-sm-5 control-label">' +
                    '房间朝向' +
                    '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间朝向!" id="roomDirection" value="' + roomDirection + '"  />' +
                    '</div>' +
                    '</div>' +
                    '</form>',
                    buttons: {
                        "success": {
                            "label": "<i class='icon-ok'>保存</i>",
                            "className": "btn-sm btn-success",
                            "callback":function (){
                                $("#alterForm").Validform();
                                var roomNumber = $("#roomNumber").val();
                                var roomState = $("#roomState").val();
                                var bId = $("#bId").val();
                                var roomUnit = $("#roomUnit").val();
                                var roomFloor = $("#roomFloor").val();
                                var roomType = $("#roomType").val();
                                var roomArea = $("#roomArea").val();
                                var roomDirection = $("#roomDirection").val();
                                var flag = true;
                                $(".edit").each(function(item) {
                                    if( $(this).val() == "" ) {
                                        flag = false;
                                    }
                                });
                                if(flag) {
                                    $.ajax({
                                        type: "POST",
                                        url: "",
                                        contentType: "application/json; charset=utf-8",
                                        data: JSON.stringify({
                                            roomNumber: roomumber,
                                            roomState: roomState,
                                            bId: bId,
                                            roomUnit: roomUnit,
                                            roomFloor: roomFloor,
                                            roomType: roomType,
                                            roomArea: roomArea,
                                            roomDirection: roomDirection
                                        }),
                                        success: function (result) {
                                            console.log("success post");
                                        },
                                        error: function (error) {
                                            console.log(error);
                                        }
                                    });
                                }else{
                                    bootbox.alert("输入信息错误,请重试");
                                }
                                //根据返回的号码判断操作是否成功
                                //$.ajax({
                                //    type: "GET",
                                //    url: "",
                                //    contentType: "application/json; charset=utf-8",
                                //    data: mark,
                                //    success: function(result){
                                //        mark = data;
                                //        if(mark == 1){
                                //            bootbox.alert("已成功修改信息!");
                                //        }
                                //        else{
                                //            bootbox.alert("修改信息失败!");
                                //        }
                                //    },
                                //    error: function(error){
                                //        bootbox.alert("修改信息失败!" + error);
                                //    }
                                //});
                            }
                        },
                        "cancel": {
                            "label": "<i class='icon-info'></i> 取消",
                            "className": "btn-sm btn-danger",
                            "callback": function () {
                            }
                        }
                    }
                });
                $('body').find('#alterForm').Validform({
                    tiptype:3,
                    callback:function(form){
                        console.log(form);
                        return false;
                    }
                });

            },
            error: function(error) {
                console.log(error);
            }
        });


    });

    //点击删除信息进行的操作
    $("body").on("click", ".delete", function(){
        bootbox.dialog({
            message: '<p>确定删除该条信息?<p/>',
            buttons: {
                success: {
                    "label" : "<i class='icon-info'></i> 确定",
                    "className" : "btn-sm btn-success",
                    "callback" : function() {
                        //向服务器发出请求,传递mark数据,获取返回码赋值给flag
                        //$.ajax({
                        //
                        //});
                        //get返回值进行判断,假如返回码记做flag
                        var flag = 1;
                        if(flag == 1){
                            bootbox.alert("修改成功!");
                        }else{
                            bootbox.alert("修改失败! 请重新操作!");
                        }
                    }
                },
                "cancel":{
                    "label" : "<i class='icon-info'></i> 取消",
                    "className" : "btn-sm btn-danger",
                    "callback" : function() {}
                }
            }
        });
    });

    //get数据
    function get(){
        var data;
        $.ajax({
          type: "GET",
          url: "/data.json",
          contentType: "application/json; charset=utf-8",
          data: "code",
          async: false,
          success: function(data){
              data = data.code;

              $(".find").attr("data-code", data);
          },
          error: function(error) {
              console.log(error);
          }
        });
        //$.get("/data.json", function(data){
          //获取总数据数量记录为totalData
          var totalData = $(".find").attr("data-code");
          data = data
          //总页数
          var totalPage = Number(totalData) % 10 === 0 ? (Number(totalData) / 10) : (parseInt(Number(totalData) / 10) + 1);
          var beginpage = '<table class="table table-striped table-bordered table-hover text-center">'+
                             '<thead><tr>'+
                                '<td>编号</td><td>房间号</td><td>房间状态</td><td>所属楼宇</td><td>单元号</td><td>房间所在楼层</td>'+
                                '<td>房间户型</td><td>房间面积</td><td>房间朝向</td><td>操作</td>' +
                             '</tr></thead>';
          //调用分页插件
          PageClick = function(pageclickednumber) {
              $("#pager").pager({ pagenumber: pageclickednumber, pagecount: totalPage, buttonClickCallback: PageClick });
              $("#result").html("");
              var beginTip = (pageclickednumber - 1) * 10;
              var endTip = pageclickednumber * 10 - 1;
              var pageToInsert = beginpage;


              //向服务器请求第pageclickednumber页的数据
               $.ajax({
                   type: "GET",
                   url: "/data.json",
                   contentType: "application/json; charset=utf-8",
                   async: false,
                   success: function (data) {
                       data = data;
                       console.log(data);
                       if(pageclickednumber != totalPage){
                           for(var i = beginTip ; i <= endTip ; i++){
                               pageToInsert += '<tr>' +
                                   '<td>' + JSON.stringify(data.list[i]['roomId']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[i]['roomNumber']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[i]['roomState']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[i]['bId']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[i]['roomUnit']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[i]['roomFloor']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[i]['roomType']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[i]['roomArea']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[i]['roomDirection']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + '<button class="btn btn-primary btn-sm detail" data-mark="' + i + '"><span class="glyphicon glyphicon-eye-open"></span>详情</button>' + '&nbsp&nbsp' + '<button class="btn btn-warning btn-sm alter" data-mark="' + i + '"><span class="glyphicon glyphicon-wrench"></span>修改</button>' + '&nbsp&nbsp' + '<button class="btn btn-danger btn-sm delete" data-delmark="' + i + '"><span class="glyphicon glyphicon-share-alt"></span>删除</button>' + '</td>' +
                                   '</tr>';

                           }
                       }else{
                           for(var j = beginTip ; j <= totalData - 1 ; j++){
                               pageToInsert += '<tr>' +
                                   '<td>' + JSON.stringify(data.list[j]['roomId']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[j]['roomNumber']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[j]['roomState']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[j]['bId']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[j]['roomUnit']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[j]['roomFloor']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[j]['roomType']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[j]['roomArea']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + JSON.stringify(data.list[j]['roomDirection']).replace("\"", "").replace("\"", "") + '</td>' +
                                   '<td>' + '<button class="btn btn-primary btn-sm detail" data-mark="' + j + '"><span class="glyphicon glyphicon-eye-open"></span>详情</button>' + '&nbsp&nbsp' + '<button class="btn btn-warning btn-sm alter" data-mark="' + j + '"><span class="glyphicon glyphicon-wrench"></span>修改</button>' + '&nbsp&nbsp' + '<button class="btn btn-danger btn-sm delete" data-delmark="' + j + '"><span class="glyphicon glyphicon-share-alt"></span>删除</button>' + '</td>' +
                                   '</tr>';
                           }
                       }
                       pageToInsert += '</table>';
                       $("#result").append(pageToInsert);
                   },
                   error: function (error) {
                       console.log(error);
                   }
               });



          };
          $("#pager").pager({ pagenumber: 1, pagecount: $(".find").attr("data-code"), buttonClickCallback: PageClick});
          PageClick( 1 );
      //});
    }
});
