var cElem = function ( html ) {
	var docfrag = document.createDocumentFragment();
	var div = document.createElement( 'div' );
	div.innerHTML = html;
	while( div.firstChild ) {
		docfrag.appendChild( div.firstChild );
	}
	return docfrag;
};