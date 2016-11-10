var zTreeObj;
var setting = {
    callback: {
        beforeClick:beforeClick,
        onClick:onClick
    },
    view: {
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom
    },
    edit: {
        drag: {
            autoExpandTrigger: true,
            isCopy: true,
            isMove: true,
            prev: true,
            next: true,
            inner: true,
            borderMax: 10,
            borderMin: -5,
            minMoveSize: 5,
            maxShowNodeNum: 5,
            autoOpenTime: 500
        },
        editNameSelectAll: true,
        enable: true,
        removeTitle: "删除",
        renameTitle: "重命名",
        showRemoveBtn: true,
        showRenameBtn: true
    }
};

function beforeClick(treeId, treeNode, clickFlag){
    // console.log(treeNode.tId+"_a");

};

function onClick(event, treeId, treeNode){
    var treeA=event.target.parentNode;
    $(treeA).attr("href","www.baidu.com");
    


};

var newCount=1;
function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='添加子项目' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    var btn = $("#addBtn_" + treeNode.tId);
    if (btn) btn.bind("click", function() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"); 
        zTree.addNodes(treeNode, { id: (100+newCount), pId: treeNode.id, name: "新建文件名" + (newCount++) });
        return false;
    });
};

function removeHoverDom(treeId, treeNode) {
    $("#addBtn_" + treeNode.tId).unbind().remove();
};

var zNodes = [{
    name: "根节点",
    open: true,
    children: [{
        name: "test1",
        open: true,
        children: [
            { name: "test1_1" }, { name: "test1_2" }, { name: "test1_3" }, { name: "test1_4" }
        ]
    }, {
        name: "test2",
        children: [
            { name: "test2_1" }, { name: "test2_2" }, { name: "test2_3" }, { name: "test2_4" }
        ]
    }, {
        name: "test3",
        children: [
            { name: "test3_1" }, { name: "test3_2" }, { name: "test3_3" }, { name: "test3_4" }
        ]
    }, {
        name: "test4",
        children: [
            { name: "test4_1" }, { name: "test4_2" }, { name: "test4_3" }, { name: "test4_4" }
        ]
    }, {
        name: "test5",
        children: [
            { name: "test5_1" }, { name: "test5_2" }, { name: "test5_3" }, { name: "test5_4" }
        ]
    }, {
        name: "test6",
        children: [
            { name: "test6_1" }, { name: "test6_2" }, { name: "test6_3" }, { name: "test6_4" }
        ]
    }]
}];
zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
