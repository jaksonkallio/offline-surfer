//var filter = { urls: ["<all_urls>"] };
//browser.webRequest.onCompleted.addListener(statusCallback, filter);
//browser.webRequest.onErrorOccurred.addListener(statusCallback, filter);

function startup(){
	console.log("Offline Surfer is active");
}

function retry(tab_id){
	console.log("Retrying page load");

	browser.tabs.get(tab_id).then(function (tab) {
		browser.tabs.reload(tab.id, {bypassCache: false});
	});
}

function errorWarrantsRetry(error){
	var valid_errors = ["NS_ERROR_UNKNOWN_HOST"];

	if(valid_errors.indexOf(error) >= 0){
		return true;
	}else{
		return false;
	}
}

function errorCallback(status){
	console.log("Error loading resource: "+status.url);
	if(errorWarrantsRetry(status.error)){
		setTimeout(function(){
			retry(status.tabId);
		}, 5000);
	}
}

startup();
browser.webRequest.onErrorOccurred.addListener(errorCallback, { urls: ["<all_urls>"] });
