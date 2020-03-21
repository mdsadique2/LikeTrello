

class Tasks {
	constructor (parentContainer, groupName, groupRemovedCallBack) {
        this.parentContainer = parentContainer;
        this.groupName = groupName;
        this.ref = null
        this.groupBodyRef = null
        this.inputForm = null;
        this.allTasks = [];
        this.groupRemovedCallBack = groupRemovedCallBack;
    }


    inputUI () {
      let inputGroup = Common.createElement('div', 'taskInput');
      this.inputForm = new InputForm(inputGroup, this.addTask.bind(this), 'Enter Task Details...', 'Add Task');
      this.inputForm.init();
      inputGroup.appendChild(this.inputForm.ref);
      return inputGroup
    }


    addTask (taskDetails) {
        if (!taskDetails.trim()) {
            return
        }
        let newTask = new TaskCard(this.groupBodyRef, taskDetails);
        newTask.init();
        this.allTasks.push(newTask);
        this.inputForm.clearForm();
    }


    addTaskWithDrag (elm, index) {
        let newTask = new TaskCard(this.groupBodyRef, elm.innerText);
        newTask.ref = elm;
        this.allTasks.splice(index,0,newTask)
    }


    removeTaskWithDrag (elm, passedIndex) {
        let index = this.allTasks.indexOf(elm);
        this.allTasks.splice(index,1)
    }

    removeGroup (event) {
        let key = this.ref.dataset.grouptitle;
        this.inputForm.removeEventListeners();
        this.ref.removeEventListener("click", this.groupClicked); 
        this.parentContainer.removeChild(this.ref);
        if (this.groupRemovedCallBack) {
            this.groupRemovedCallBack(key)
        }
    }


    // action when card  remove/edit is clicked
    cardAction(event) {
        let card = event.target.closest(".cards.task");
        let cardContainer = event.target.closest(".taskBody");
        let key = cardContainer.dataset.grouptitle;
        let index = [...cardContainer.children].indexOf(card);
        if (event.target.classList.contains('fa-edit') || event.target.classList.contains('fa-check-circle') || event.target.classList.contains('fa-times-circle') ) {
            this.allTasks[index].editCard(event);
        }
        if (event.target.classList.contains('fa-trash')) {
            this.allTasks.splice(index,1);
            cardContainer.removeChild(card);
        }
    }



    // Click Event in task group/list
    groupClicked = (event) => {
        if (event.target.classList.contains('fa')) {
            let parent = event.target.parentNode;
            if (parent.classList.contains('taskHeader')) {
                this.removeGroup();
            }

            if (parent.classList.contains('cardIcons')) {
                this.cardAction(event);
            }

        }
    }



    createGroupUI () {
      let group = Common.createElement('div', 'taskGroups');
      let header = Common.createElement('div', 'taskHeader');
      let textNode = Common.createElement('text', '', this.groupName);
      let icon = Common.createElement('i', 'fa fa-times-circle');

      header.appendChild(textNode);
      header.appendChild(icon);

      let body = Common.createElement('div', 'taskBody');
      body.setAttribute("data-groupTitle", this.groupName);
      group.setAttribute("data-groupTitle", this.groupName);
      let input = this.inputUI();
      group.appendChild(header);
      group.appendChild(body);
      group.appendChild(input);

      this.groupBodyRef = body;
      this.ref = group;
      this.parentContainer.appendChild(group);

      this.ref.addEventListener('click', this.groupClicked)
    }



    init () {
        this.createGroupUI();
        // this.addTask('test task 1');
        // this.addTask('test task 2');
        // this.addTask('test task 3');
    }
	
}