


class TaskCard {
	constructor (parentContainer,task) {
		this.task = task;
		this.parentContainer = parentContainer;
		this.ref = null
	}

	// Creates the task card
	createTask () {
		let elm = Common.createElement('div', 'cards task')
		let text = Common.createElement('text', 'cardText', this.task)
		
		let iconContainer = Common.createElement('div', 'cardIcons');
      	let edit = Common.createElement('i', 'fa fa-edit');
		let remove = Common.createElement('i', 'fa fa-trash');

		let editIconContainer = Common.createElement('div', 'cardIcons editIcons');
      	let check = Common.createElement('i', 'fa fa-check-circle');
		let cross = Common.createElement('i', 'fa fa-times-circle');

		editIconContainer.appendChild(check);
		editIconContainer.appendChild(cross);

		iconContainer.appendChild(edit);
		iconContainer.appendChild(remove);

		elm.appendChild(text);
		elm.appendChild(iconContainer);
		elm.appendChild(editIconContainer);


		elm.setAttribute("draggable", "true")
		this.parentContainer.appendChild(elm);
		this.ref = elm;
	}


	// when card is edited successfully
	edited (evt) {
		let input = this.ref.getElementsByClassName('cardTextInput')[0];
		let textNode = this.ref.getElementsByClassName('cardText')[0];

		if (evt.target.classList.contains('fa-check-circle')) {
			textNode.innerText = input.value;
			this.task = input.value;
		}

		if (evt.target.classList.contains('fa-times-circle')) {

		}
		
		this.ref.removeChild(input);
		this.ref.classList.remove('edit');
		this.ref.setAttribute('draggable', 'true')
	}


	// to control all the edit events in a card
	editCard (evt) {
		let textNode = this.ref.getElementsByClassName('cardText')[0]
		if (this.ref.classList.contains('edit')) {
			this.edited(evt);
		} else {
			this.ref.classList.add('edit');
			this.ref.setAttribute('draggable', 'false')
			let input = Common.createElement('input', 'cardTextInput');
			input.value = textNode.innerText;
			this.ref.appendChild(input)
			input.focus()
		}
	}

	
	removeCard (evt) {
		
	}
	

	init(){
		this.createTask();
	}
	

}
