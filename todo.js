/**
 * Created by Administrator on 2019/7/10.
 */

var inputDom = document.querySelector("#write");
var todoList = document.querySelector(".todo .clist")
var doneList = document.querySelector(".done .clist")
var todoNumSpan = document.querySelector('.todo h1 .num');
var doneNumSpan = document.querySelector('.done h1 .num');
var main = document.querySelector(".main")

var dataList = localStorage.dataList?JSON.parse(localStorage.dataList):[];
renderList()

inputDom.onkeypress = function(e){
    //console.log(e)
    if(e.key == "Enter"&&inputDom.value!=""){
        //往datalist数据里添加待办事件数据
        var data = {
            content:inputDom.value,
            type:"todo"
        }
        dataList.push(data)
        //根据数据渲染列表
        renderList()
    }
}

function renderList(){
    localStorage.dataList = JSON.stringify(dataList)
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    var todoNum = 0;
    var doneNum = 0;
    dataList.forEach(function(item,index){
        var newDiv = document.createElement("div")
        newDiv.className = "item";
        if(item.type=="todo"){
            todoNum++;
            newDiv.innerHTML = `
                <span class="checkbox">
                    <input type="checkbox" name="check" value="" data-index="${index}" />
                </span>
                <span class="content">
                    ${item.content}
                </span>
                <span class="delete" data-index="${index}"></span>
            `;
            todoList.appendChild(newDiv)
        }else{
            doneNum ++;
            newDiv.innerHTML = `
                <span class="checkbox">
                    <input type="checkbox" name="check" checked="checked" value="" />
                </span>
                <span class="content">
                    ${item.content}
                </span>
                <span class="delete" data-index="${index}"></span>
            `;
            doneList.appendChild(newDiv)
        }
    })
    console.log(todoNum)
    todoNumSpan.innerHTML = todoNum;
    doneNumSpan.innerHTML = doneNum;
}

todoList.onchange = function(e){
    var index = e.target.dataset.index;
    console.log(index)
    dataList[index].type = "done";
    renderList()
}

main.addEventListener("click",function(e){
    if(e.target.className=="delete"){
        var index = e.target.dataset.index;
        dataList.splice(index,1);
        renderList();
    }
})