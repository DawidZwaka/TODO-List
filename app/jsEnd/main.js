"use strict";

var todo = {
  formConnection: document.querySelector('.todo__crtEl'),
  todoHook: document.querySelector('.todo'),
  createItem: function createItem(InputTxt) {
    var date = new Date(); //creating todo item containter

    var itemCnt = document.createElement('div');
    itemCnt.classList.add('todo__item'); //creating todo meta bar

    var metaBar = document.createElement('h3');
    metaBar.innerHTML = "\n            ".concat(date.getFullYear(), "\n            .\n            ").concat((date.getMonth() + '1').padStart(2, '0'), "\n            .\n            ").concat((date.getDate() + '').padStart(2, '0'), "\n            ");
    metaBar.classList.add('item__meta'); //creating todo item content

    var itemContent = document.createElement('p');
    itemContent.classList.add('item__content');
    itemContent.innerText = InputTxt; //creating todo item delete button

    var itemDel = document.createElement('button');
    itemDel.classList.add('item__del');
    itemDel.addEventListener('click', this.deleteItem); //conecting all items together

    itemCnt.appendChild(metaBar);
    itemCnt.appendChild(itemContent);
    itemCnt.appendChild(itemDel); //returning item

    return itemCnt;
  },
  deleteItem: function deleteItem() {
    //delete todo item
    this.parentElement.remove();
    todo.updateTaskAmount();
  },
  validateForm: function validateForm() {
    var inputArea = this.formConnection.querySelector('.inputTextItem');
    var inputAreaReg = /[^\s]/g;

    if (!inputArea.value.match(inputAreaReg)) {
      inputArea.classList.remove('valFail');
      void inputArea.offsetWidth;
      inputArea.classList.add('valFail');
      return false;
    } else {
      inputArea.classList.remove('valFail');
      return true;
    }
  },
  updateTaskAmount: function updateTaskAmount() {
    var tasks = this.todoHook.querySelectorAll('.todo__item');
    var tasksAmount = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var i = _step.value;
        if (!i.classList.contains('itemInvisible')) tasksAmount++;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.todoHook.querySelector('.todoNav__taskAmount').innerHTML = "Tasks: ".concat(tasksAmount);
  },
  searchTasks: function searchTasks(ev) {
    //debugger;
    var inputValueReg = new RegExp(ev.target.value, 'g');
    var tasks = this.todoHook.querySelectorAll('.todo__item');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = tasks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var i = _step2.value;
        var itemContent = i.querySelector('.item__content').innerHTML;
        if (!itemContent.match(inputValueReg)) i.classList.add('itemInvisible');else i.classList.remove('itemInvisible');
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    this.updateTaskAmount();
  }
};
todo.formConnection.addEventListener('submit', function (e) {
  //turn off default behavior of submit form action
  e.preventDefault();
  var inputArea = this.querySelector('.inputTextItem');
  if (!todo.validateForm()) return; //creating TODO item

  var newTODOitem = todo.createItem(inputArea.value); //adding TODO item to HTML DOM

  var TODOlist = document.querySelector('.todo__items');
  TODOlist.appendChild(newTODOitem); //cleaning areatext

  inputArea.value = null;
  todo.updateTaskAmount();
});
todo.formConnection.querySelector('.inputTextItem').addEventListener('input', todo.validateForm.bind(todo));
todo.todoHook.querySelector('.todoNav__searchInp').addEventListener('input', todo.searchTasks.bind(todo));