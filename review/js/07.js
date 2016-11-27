	var get = function(str) {

	    // 		      1                   2                 3
	    var r = /^(?:#([a-zA-Z0-9_\-]+)|\.([a-zA-Z0-9_\-]+)|([a-zA-Z0-9_\-]+))$/;
	    //				var r = /^(?:#([a-z\-_A-Z0-9]+)|\.([a-zA-Z0-9\-_]+)|([a-zA-Z0-9\-_]+)|(\*))$/;
	    var m = r.exec(str);

	    if (m[1]) {
	        return [document.getElementById(m[1])];
	    } else if (m[2]) {
	        return document.getElementsByClassName(m[2]);
	    } else if (m[3]) {
	        return document.getElementsByTagName(m[3]);
	    }

	};