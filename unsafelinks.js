function replaceAllLinksWithinElement(element) {
    let allAnchors = element.getElementsByTagName("a");
    for (let anchor of allAnchors) {
        if (anchorElementIsSafeLink(anchor)) {
            replaceSafeLinkAnchorElement(anchor);
        }
    }
}

function decodeSafelink(linkString) {
    // Returns the original destination of a safelink given the full URL
    let pattern = "https?:\\/\\/.*safelinks.protection.outlook.com\\/.*(\\&|\\?)url=(?<url>.*?)&.*";
    let match = linkString.match(pattern);
    let encodedUrl = match.groups.url;
    return decodeURIComponent(encodedUrl);
}

function isSafeLink(linkText) {
    let regexPattern = "https?:\\/\\/.*safelinks.protection.outlook.com\\/.*";
    return !!linkText.match(regexPattern);
}

function anchorElementIsSafeLink(element) {
    let targetUrl = element.href;
    return !!targetUrl && isSafeLink(targetUrl);
}

function replaceSafeLinkAnchorElement(e) {
    let originalDestination = e.href;
    let newDestination = decodeSafelink(originalDestination);
    // e.style.color = "lime";
    e.href = newDestination;
    let linkTextIsSafelink = isSafeLink(decodeURIComponent(e.innerText));
    if (linkTextIsSafelink) {
        e.innerHTML = newDestination;
    }
}

function updateChangedElementsAfterDomUpdate(observation) {
    // This will be called by the observer when the DOM changes within the observation's parentElement.
    for (let mutation of observation) {
        let parentElement = mutation.target;
        replaceAllLinksWithinElement(parentElement);
    }
}

const observeDOM = (function () {
    // From https://stackoverflow.com/a/14570614 under CC BY-SA 4.0
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return function (obj, callback) {
        if (!obj || obj.nodeType !== 1) return;

        if (MutationObserver) {
            // define a new observer
            const mutationObserver = new MutationObserver(callback);

            // have the observer observe for changes in children
            mutationObserver.observe(obj, {childList: true, subtree: true});
            return mutationObserver;
        }

        // browser support fallback
        else if (window.addEventListener) {
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

// Initial page load, update all links
replaceAllLinksWithinElement(document.body);

// Listen for DOM updates and update links when necessary
observeDOM(document.body, updateChangedElementsAfterDomUpdate);