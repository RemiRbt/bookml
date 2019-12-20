import ext from "./utils/ext";

function onRequest(request, sender, sendResponse) {}

ext.runtime.onMessage.addListener(onRequest);