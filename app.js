// entire code is wrapped in IIFE to prevent any free flowing of variables
(function () {
	var mainContainer = document.getElementsByClassName('mainContainer')[0];
	var appContainer = mainContainer.getElementsByClassName('appContainer')[0];
	
	//One object of task app
	var taskApp = new TaskApp(appContainer);
	taskApp.init();
})()

