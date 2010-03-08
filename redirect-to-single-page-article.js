var articleUrlRegEx = /^https?:\/\/(?:www|travel)\.nytimes\.com\/\d{4}\/\d{2}\/\d{2}(?:\/\w+)*\/[-\w]+\.html(\?[^#]*)?(#.*)?$/
var articleUrlRegExMatcher = new RegExp(articleUrlRegEx)
var match = articleUrlRegExMatcher.exec(window.location);
if (match) {
	var query = match[1];
	var fragment = match[2];
	if ((!query || query.indexOf('pagewanted=') == -1) && !fragment) {
		var url = window.location + (query ? '&' : '?' ) + 'pagewanted=all';
		window.location.replace(url);
	}
}
