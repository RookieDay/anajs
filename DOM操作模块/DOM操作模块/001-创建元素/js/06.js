var id = function(id) {
    return document.getElementById(id);
};


onload = function() {
    var d1 = id('dv1');
    var d2 = id('dv2');
    var list = d1.getElementsByTagName("p");
    var len;
    //				for ( var i = 0, len = list.length; i < len; i++ ) {
    //					
    //					d2.appendChild( list[ 0 ] );
    //					
    //				}

    //				while ( list[ 0 ] ) {
    //					d2.appendChild( list[ 0 ] );
    //				}

    while (d1.firstChild) {
        d2.appendChild(d1.firstChild);
    }
};