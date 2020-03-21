
class TaskApp {
	constructor (container) {
		this.container = container;
		this.addForm = null
		this.taskGroups = {};

		this.currentDragged = null;
		this.currentDraggedIndex = -1;

		this.source = null;
		this.destination = null;

		this.elementDropped = null;
		this.elementDroppedAtIndex = -1;
		this.elementDroppedContainer = null;

		this.timer = 100
	}


	updateDroppedData () {
		let taskGroupSource = this.source.dataset.grouptitle;
		let taskGroupDestination = this.elementDroppedContainer.dataset.grouptitle;

		let sourceObj = this.taskGroups[taskGroupSource];
		let destinationObj = this.taskGroups[taskGroupDestination];

		destinationObj.addTaskWithDrag(this.elementDropped, this.elementDroppedAtIndex);
		sourceObj.removeTaskWithDrag(this.currentDragged, this.currentDraggedIndex);

	}


	dragStart (event) {
		if (event.target.classList.contains('task')) {
			event.target.style.opacity = .5;
			this.currentDragged = event.target;
			this.currentDraggedIndex = [...this.currentDragged.parentElement.children].indexOf(this.currentDragged);
			this.source = event.target.parentElement
			this.placeHolder = null;
		}
	}


	dragEnd (event){
		event.target.style.opacity = "";
	}


	dragOver (event) {
		event.preventDefault();
		if (event.target.classList.contains('taskBody')) {
			if(this.destination) {
				this.destination.classList.remove('dragActive')
			}
			this.destination = event.target;
			this.destination.classList.add('dragActive')
		}

		if (event.target.classList.contains('task')) {
			let parent = event.target.parentElement;
			if (this.placeHolder && this.placeHolder.parentNode === parent) {
				parent.removeChild(this.placeHolder);
			}
			let placeHolderPresent = parent.getElementsByClassName('placeHolder');
			if (placeHolderPresent.length === 0) {
				this.placeHolder = Common.createElement('div', 'placeHolder');
				parent.insertBefore(this.placeHolder, event.target);
			}
		}
	}

	
	dragEnter (event)  {
		if (event.target.classList.contains('taskBody')) {
			if (this.destination)
				this.destination.classList.add('dragActive')
		}
		if (event.target.classList.contains('task')) {
			let parent = event.target.parentElement;
			let placeHolder = parent.getElementsByClassName('placeHolder')[0];
			if (placeHolder) {
				parent.removeChild(placeHolder);
			}
		}
	}


	dragLeave (event) {
		if (event.target.classList.contains('taskBody')) {
		  	if (this.destination) {
				this.destination.classList.remove('dragActive');
				let placeHolder = event.target.getElementsByClassName('placeHolder');
				if (placeHolder.length > 0) {
					event.target.removeChild(placeHolder[0])
				}
		  	}
		}
	}

	dropped = Common.debounce(function(event) {
		// prevent default action (open as link for some elements)
		event.preventDefault();
		if (event.target.classList.contains("taskBody")) {
			this.currentDragged.parentNode.removeChild(this.currentDragged);
			let placeHolder = event.target.getElementsByClassName('placeHolder');
			event.target.appendChild(this.currentDragged);
			event.target.classList.remove('dragActive');
			this.elementDropped = this.currentDragged;
			this.elementDroppedContainer = event.target;
			this.elementDroppedAtIndex = this.elementDroppedContainer.children.length - 1
			this.updateDroppedData();
		}

		if (event.target.classList.contains("placeHolder") && event.target.parentElement !== null) {
			let index = [...event.target.parentElement.children].indexOf(event.target);
			this.elementDroppedContainer = event.target.parentElement;
			event.target.parentElement.replaceChild(this.currentDragged, event.target);
			this.elementDropped = this.currentDragged;
			this.elementDroppedAtIndex = index;
			this.updateDroppedData();
		}

		let placeHolder = this.container.getElementsByClassName('placeHolder')[0];
		if (placeHolder) {
			placeHolder.parentElement.removeChild(placeHolder);
		}

	}, 50)


	// Attaching eventListeners for drag and drop
	attachDragListeners () {
		this.container.addEventListener("drag", function (event) {
			
		}, false)

		this.container.addEventListener("dragstart", this.dragStart.bind(this), false);
		this.container.addEventListener("dragend", this.dragEnd.bind(this), false);
		this.container.addEventListener("dragover", this.dragOver.bind(this), false)
		this.container.addEventListener("dragenter", this.dragEnter.bind(this), false)
		this.container.addEventListener("dragleave", this.dragLeave.bind(this), false);
		this.container.addEventListener("drop", this.dropped.bind(this), false);
	}


	// Call back when complete list is removed
	taskGroupRemoved (key) {
		let objToDelete = this.taskGroups[key];
		delete this.taskGroups[key];
	}


	// To create a new Group
	createGroup (groupTitle) {
		if (this.taskGroups[groupTitle]) {
		
		} else {
			this.taskGroups[groupTitle] = new Tasks(this.container, groupTitle, this.taskGroupRemoved.bind(this));
			this.taskGroups[groupTitle].init();
			this.addForm.clearForm();
		}
		this.attachDragListeners();
	}
	

	init(){
		this.addForm = new InputForm(this.container, this.createGroup.bind(this));
		this.addForm.init();
		// this.createGroup('Test 1');
		// this.createGroup('Test 2');
	}

}
