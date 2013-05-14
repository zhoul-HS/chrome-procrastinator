// update the button state if procrastinator is disabled
if (procrastinator.isEnabled() === false) {
	extensionIcon.disable();
}

detectRefresh('bg', function(request) {
	console.log('reloaded the settings, and re-applying them');
	// change the button state, if required
	if (procrastinator.isEnabled() === false) {
		extensionIcon.disable();
	} else {
		extensionIcon.enable();
	}
});

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	console.log('checking url: '+details.url);
	var match = procrastinator.matchWebsite(details.url);
	if (match && procrastinator.canRunBlocker(match)) {
		var url = chrome.extension.getURL('block.html')
		if (procrastinator.getBlockUrl() != '') {
			url = procrastinator.getBlockUrl();
		}
		return {redirectUrl: url};
	}
	return {};
}, {urls: ["<all_urls>"]}, ["blocking"]);