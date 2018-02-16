var active = true;

try {
    chrome.storage.sync.get({
        activate: true
    }, function (items) {
        active = items.activate;
        if (active) {
            main();
        }
        track(items.activate ? "true" : "false");
    });
} catch (e) {
    if (active) {
        main();
    }
    track("undefined");
}

function track(active) {
    //UA-9413471-3

    ga('create', 'UA-9413471-3', 'auto');
    ga('set', 'dimension1', active);
    ga('send', 'pageview');

   
}

//Content script, image replacer
function main() {

    
    (function ($) {
        
        var self = {
            rNetImgs: [
                'https://rawgit.com/Jacobus722/Memes/master/fresh-timbs.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/Computer-Hacker.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/Supreme-logo.png',
                'https://rawgit.com/Jacobus722/Memes/master/computer-threat-blur.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/crouton.PNG',
                'https://rawgit.com/Jacobus722/Memes/master/dankey-kang.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/double-finger-guns.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/drinking-water-bottle.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/old-man-at-computer.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/phil-swift2.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/timbs.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/sanic.png',
                'https://rawgit.com/Jacobus722/Memes/master/shotgun1.png',
                'https://rawgit.com/Jacobus722/Memes/master/shotgun2.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme1.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme2.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme3.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme4.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme5.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme6.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme7.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme8.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme9.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme10.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme11.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme12.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme13.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme14.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme15.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme16.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme17.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme18.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme19.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme20.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme21.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme22.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme23.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme24.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme25.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme26.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme27.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme28.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme29.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme30.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme31.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme32.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme33.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme34.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme35.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme36.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme37.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme38.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme39.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme40.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme41.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme42.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme43.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme44.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme45.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme46.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme47.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme48.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme49.jpg',
                'https://rawgit.com/Jacobus722/Memes/master/meme50.jpg',

            ],

            //Handles all images on page with an interval of time
            handleImages: function (lstImgs, time) {
                $.each($('img'), function (i, item) {
                    //Skip if image is already replaced
                    if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                        var h = $(item).height();
                        var w = $(item).width();

                        //If image loaded
                        if (h > 0 && w > 0) {

                            self.handleImg(item, lstImgs);
                        }
                        else {
                            //Replace when loaded
                            $(item).load(function () {
                                //Prevent 'infinite' loop
                                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                    self.handleImg(item, lstImgs);
                                }
                            });
                        }
                    }
                    var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

                    var i = 1;

                    window.setInterval(function () {
                        document.body.style.backgroundColor = colors[i];
                        i++;
                        if (i === colors.length) {
                            i = 0;
                        }
                    }, 100);
                });

                //Keep replacing
                if (time > 0) {
                    setTimeout(function () { self.handleImages(lstImgs, time); }, time);
                }
            },
            //Replace one image
            handleImg: function (item, lstImgs) {
                $(item).error(function () {
                    //Handle broken imgs
                    self.handleBrokenImg(item, lstImgs);
                });

                self.setRandomImg(item, lstImgs);
            },
            //Set a random image from lstImgs to item 
            setRandomImg: function (item, lstImgs) {
                var h = $(item).height();
                var w = $(item).width();
                $(item).css('width', w + 'px').css('height', h + 'px');
                $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
            },
            //Removed broken image from lstImgs, run handleImg on item
            handleBrokenImg: function (item, lstImgs) {

                var brokenImg = $(item).attr('src');
                var index = lstImgs.indexOf(brokenImg);
                if (index > -1) {
                    lstImgs.splice(index, 1);
                }
                self.setRandomImg(item, lstImgs);
            },
        };

        //Run on jQuery ready
        $(function () {

            self.handleImages(self.rNetImgs, 3000);

        });

        //Set global variable
        $.rNet = self;



    })(jQuery);
    //end rNet
}