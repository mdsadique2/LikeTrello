
class InputForm {
	constructor (container, onClickMethod, inputPlaceHolder, buttonLabel) {
		this.container = container;
		this.placeholder = inputPlaceHolder ? inputPlaceHolder : 'Enter Group/List Title';
		this.buttonLabel = buttonLabel ? buttonLabel : 'Add New Group';
		this.onClickMethod = onClickMethod ? onClickMethod : null;
		this.ref = null;
		this.inputValue = '';
	}

	addEvent = (event) => {
		this.onClickMethod(this.inputValue)
	}

	checkKey = (event) => {
		this.inputValue = event.target.value
		if (event.key === "Enter") {
			this.addEvent()
		}
	}



	createForm () {
		let form = Common.createElement('div', 'inputForm');
		let input = Common.createElement('input', 'cards task width100');
      	input.setAttribute('placeholder', this.placeholder);
      	let addButton = Common.createElement('button', 'width100 noBg', this.buttonLabel);
      	form.appendChild(input);
      	form.appendChild(addButton);
      	this.ref = form;
      	this.container.appendChild(form);
      	if (this.onClickMethod) {
      		input.addEventListener('keypress', this.checkKey)
      		addButton.addEventListener('click', this.addEvent);
      	}
	}

	removeEventListeners () {
		let button = this.ref.getElementsByTagName('button')[0];
		let input = this.ref.getElementsByTagName('input')[0];
		button.removeEventListener("click", this.addEvent); 
      	input.removeEventListener('keypress', this.checkKey)

	}


	clearForm () {
		let input = this.ref.getElementsByTagName('input')[0];
		input.value = '';
	}
	

	init(){
		this.createForm();
	}
	

}
