var articleUrlRegEx = /^https?:\/\/(?:www|travel)\.nytimes\.com\/\d{4}\/\d{2}\/\d{2}(?:\/\w+)*\/[-\w]+\.html(\?[^#]*)?(#.*)?$/
var articleUrlRegExMatcher = new RegExp(articleUrlRegEx)

singlePageArticleLinks(document.links);
document.body.addEventListener("DOMNodeInserted", onNodeInserted, false);

function onNodeInserted(event) {
	var node = event.target;
	if (node.nodeType == Node.ELEMENT_NODE) {
		if (node.tagName == 'A') {
			modyifyArticleLink(node);
		}
	    var links = node.getElementsByTagName('a');
		singlePageArticleLinks(links);
	}
}

function singlePageArticleLinks(links) {
	for (var i = 0; i < links.length; i++) {
		singlePageArticleLink(links[i]);
	}
}

function singlePageArticleLink(link) {
	var match = articleUrlRegExMatcher.exec(link.href);
	if (match) {
		var query = match[1];
		var fragment = match[2];
		if ((!query || query.indexOf('pagewanted=') == -1) && !fragment) {
			link.href = link.href + (query ? '&' : '?' ) + 'pagewanted=all';
		}
	}
}
