//var filter = { urls: ["<all_urls>"] };
//browser.webRequest.onCompleted.addListener(statusCallback, filter);
//browser.webRequest.onErrorOccurred.addListener(statusCallback, filter);

function startup(){
	console.log("Offline Surfer is active");
}

function statusCallback(status){
	console.log(status.url);
}

startup();
browser.webRequest.onBeforeRequest.addListener(statusCallback, { urls: ["<all_urls>"] });
console.log("still alive");
