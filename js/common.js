class Common {
	constructor () {

	}
	
	static createElement  (elmType, classList = '', innerText = '') {
		var elm = document.createElement(elmType);
		elm.setAttribute('class', classList);
		if (innerText !== undefined) {
			elm.innerText =  innerText
		}
		return elm;
	}

	static debounce (func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    static throttle (func, wait = 100) {
        let timer = (new Date()).getTime();
        return function(...args) {
        	let newTimer = (new Date()).getTime();
        	if (newTimer - timer >= wait) {
        		func.apply(this, args);
        		timer = newTimer;
        	}


            // if (timer === null) {
	           //  timer = setTimeout(() => {
	           //      func.apply(this, args);
	           //      timer = null;
	           //  }, wait); 
            // }
        }
    }
}