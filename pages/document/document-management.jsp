<%--
  Created by IntelliJ IDEA.
  User: Eason Yang
  Date: 1/17/2016
  Time: 9:51 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <jsp:include page="../common/head.jsp" flush="false"/>
    <style>

    </style>
</head>
<body class="skin-blue">
    <jsp:include page="../common/header.jsp" flush="true"/>
    <jsp:include page="../common/sidebar.jsp" flush="true"/>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">

        <!-- Main content -->
        <section class="content">
            <b>
                <section>
                    <span class="page-title">
                        Title
                    </span>
                </section>
            </b>
            <div class="box">
                <div class="box-header with-border">
                    <div class="row">
                        <div class="col-sm-4">
                            <button class="btn btn-success btn-md" id="add">
                                <span>
                                    <i class="ace-icon fa fa-plus-square-o bigger-120"></i>
                                </span>
                                新增
                            </button>
                        </div>
                    </div>
                </div>
                <div class="box-body">
                    <div class="row" id="search-table">
                        <div class="col-lg-12">
                            <div class="row">
                                <div class="col-lg-12">
                                    <form id="search" class="form-inline">
                                        <div class="input-group">
                                            <div class="input-group-addon">房间号</div>
                                            <input type="text" id="roomumber" class="form-control input-sm" name="roomNumber" placeholder="请输入房产编号">
                                        </div>
                                        <div class="input-group">
                                            <div class="input-group-addon">户型</div>
                                            <input type="text" id="roomType" class="form-control input-sm" name="roomType" placeholder="请输入户型">
                                        </div>
                                        <div class="input-group">
                                            <div class="input-group-addon">所属楼宇</div>
                                            <input type="text" id="bId" class="form-control input-sm" name="bId" placeholder="请输入所属楼宇">
                                        </div>
                                        <div class="input-group">
                                            <div class="input-group-addon">房间楼层</div>
                                            <input type="text" id="roomFloor" class="form-control input-sm" name="roomFloor" placeholder="请输入房间楼层">
                                        </div>
                                        <div class="input-group">
                                            <button type="button" class="find btn btn-success btn-sm" id="findTips" style="margin-left:2%">
                                                <span class="glyphicon glyphicon-search "></span>
                                                搜索
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div id="result"></div>
                            <div id="pager" class="text-center"></div>
                            <!--<table class="table table-hover table-bordered table-condensed text-center">
                                <thead>
                                <tr>
                                    <td><b>序号</b></td>
                                    <td><b>标题</b></td>
                                    <td><b>作者</b></td>
                                    <td><b>内容</b></td>
                                    <td><b>操作</b></td>
                                </tr>
                                </thead>
                                <tbody id="search-result">
                                </tbody>

                            </table>
                            <div id="page-footer">
                            </div>-->
                        </div>

                        <!-- /.col-lg-12 -->
                    </div>
                </div><!-- /.box-body -->
            </div><!-- /.box -->
        </section><!-- /.content -->
    </div

    <jsp:include page="../common/script.jsp" flush="true"/>
    <script>
        $(document).ready(function(){
           $("#add").click(function(){
              bootbox.dialog({
                  title: "增加房产信息",
                  message: '<form class="form-horizontal" id="addForm" role="form">' +
                      '<div class="form-group">' +
                           '<label for="roomNumber" class="col-sm-5 control-label">' +
                                '房间号' +
                           '</label>' +
                           '<div class="col-sm-5">' +
                                '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间号!" id="roomNumber" placeholder="房间号" />'+
                           '</div>' +
                       '</div>' +
                       '<div class="form-group">' +
                           '<label for="roomState" class="col-sm-5 control-label">' +
                                '房间状态' +
                           '</label>' +
                           '<div class="col-sm-5">' +
                                '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间状态!" id="roomState" placeholder="房间状态" />' +
                           '</div>' +
                       '</div>' +
                       '<div class="form-group">' +
                           '<label for="bId" class="col-sm-5 control-label">' +
                                '所属楼宇' +
                           '</label>' +
                           '<div class="col-sm-5">' +
                                '<input type="text" class="form-control" datatype="*" nullmsg="请填写房间所属楼宇!" id="bId" placeholder="所属楼宇" />' +
                           '</div>' +
                       '</div>' +
                       '<div class="form-group">' +
                           '<label for="roomUnit" class="col-sm-5 control-label">' +
                                '单元号' +
                           '</label>' +
                           '<div class="col-sm-5">' +
                                '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间单元号!" id="roomUnit" placeholder="单元号" />' +
                           '</div>' +
                       '</div>' +
                       '<div class="form-group">' +
                           '<label for="roomFloor" class="col-sm-5 control-label">' +
                                '房间所在楼层' +
                           '</label>' +
                           '<div class="col-sm-5">' +
                                '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间所在楼层!" id="roomFloor" placeholder="房间所在楼层" />' +
                           '</div>' +
                       '</div>' +
                       '<div class="form-group">' +
                           '<label for="roomType" class="col-sm-5 control-label">' +
                                '房间户型' +
                           '</label>' +
                           '<div class="col-sm-5">' +
                                '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间户型!" id="roomType" placeholder="房间户型" />' +
                           '</div>' +
                       '</div>' +
                       '<div class="form-group">' +
                           '<label for="roomArea" class="col-sm-5 control-label">' +
                                '房间面积' +
                           '</label>' +
                           '<div class="col-sm-5">' +
                                '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间面积!" id="roomArea" placeholder="房间面积" />' +
                           '</div>' +
                       '</div>' +
                       '<div class="form-group">' +
                           '<label for="roomDirection" class="col-sm-5 control-label">' +
                                '房间朝向' +
                           '</label>' +
                           '<div class="col-sm-5">' +
                                '<input type="text" class="form-control edit" datatype="*" nullmsg="请填写房间朝向!" id="roomDirection" placeholder="房间朝向" />' +
                           '</div>' +
                       '</div>' +
                       '</form>',
                  buttons:{
                      "success": {
                            "label": "<i class='icon-ok'>保存</i>",
                            "className" : "btn-sm btn-success",
                            "callback" : function() {
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
                                            roomNumber: roomNumber,
                                            roomState: roomState,
                                            bId: bId,
                                            roomUnit: roomUnit,
                                            roomFloor: roomFloor,
                                            roomType: roomType,
                                            roomArea: roomArea,
                                            roomDirection: roomDirection
                                        })
                                    });
                                } else {
                                    bootbox.alert("输入信息错误,请重试");
                                }
                            }
                      },
                      "cancel": {
                          "label" : "<i class='icon-info'></i> 取消",
                          "className" : "btn-sm btn-danger",
                          "callback" : function() {}
                      }
                  }
              });
               $('body').find('#addForm').Validform({
                   tiptype:3,
                   callback:function(form){
                       console.log(form);
                       return false;
                   }
               });
           });
        });
    </script>
</body>
</html>
