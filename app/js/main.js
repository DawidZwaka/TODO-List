const todo = {
    formConnection: document.querySelector('.todo__crtEl'),
    todoHook: document.querySelector('.todo'),
    createItem(InputTxt) {
        const date = new Date();

        //creating todo item containter
        const itemCnt = document.createElement('div');
        itemCnt.classList.add('todo__item');

        //creating todo meta bar
        const metaBar = document.createElement('h3');
        metaBar.innerHTML = `
            ${date.getFullYear()}
            .
            ${(date.getMonth()+'1').padStart(2, '0')}
            .
            ${(date.getDate()+'').padStart(2, '0')}
            `;
        metaBar.classList.add('item__meta');

        //creating todo item content
        const itemContent = document.createElement('p');
        itemContent.classList.add('item__content');
        itemContent.innerText = InputTxt;

        //creating todo item delete button
        const itemDel = document.createElement('button');
        itemDel.classList.add('item__del');
        itemDel.addEventListener('click', this.deleteItem);

        //conecting all items together
        itemCnt.appendChild(metaBar);
        itemCnt.appendChild(itemContent);
        itemCnt.appendChild(itemDel);
        
        //returning item
        return itemCnt;
    },
    deleteItem() {
        //delete todo item
        this.parentElement.remove();
        todo.updateTaskAmount()
    },
    validateForm(){
        const inputArea = this.formConnection.querySelector('.inputTextItem');
        const inputAreaReg = /[^\s]/g

        if(!inputArea.value.match(inputAreaReg))
        {
            inputArea.classList.remove('valFail');
            void inputArea.offsetWidth;
            inputArea.classList.add('valFail');
            return false;
        }else 
        {
            inputArea.classList.remove('valFail');
            return true;
        }
    },
    updateTaskAmount() {
        const tasks = this.todoHook.querySelectorAll('.todo__item');
        let tasksAmount = 0;
        for(const i of tasks) if(!i.classList.contains('itemInvisible')) tasksAmount++;
        this.todoHook.querySelector('.todoNav__taskAmount').innerHTML = `Tasks: ${tasksAmount}`;
    },
    searchTasks(ev) {
        //debugger;
        const inputValueReg = new RegExp(ev.target.value, 'g');
        const tasks = this.todoHook.querySelectorAll('.todo__item');
        for(const i of tasks)
        {
            const itemContent = i.querySelector('.item__content').innerHTML;
            if(!itemContent.match(inputValueReg)) i.classList.add('itemInvisible');
            else i.classList.remove('itemInvisible');
        }
        this.updateTaskAmount();
    }
}


todo.formConnection.addEventListener('submit', function(e){
    //turn off default behavior of submit form action
    e.preventDefault();

    const inputArea = this.querySelector('.inputTextItem');


    if(!todo.validateForm()) return;

    //creating TODO item
    const newTODOitem = todo.createItem(inputArea.value);

    //adding TODO item to HTML DOM
    const TODOlist = document.querySelector('.todo__items');
    TODOlist.appendChild(newTODOitem);

    //cleaning areatext
    inputArea.value = null;
    todo.updateTaskAmount();
});

todo.formConnection.querySelector('.inputTextItem').addEventListener('input', todo.validateForm.bind(todo));
todo.todoHook.querySelector('.todoNav__searchInp').addEventListener('input', todo.searchTasks.bind(todo));