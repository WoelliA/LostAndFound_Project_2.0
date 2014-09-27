
LostAndFound.Controllers.ShareController = (function () {
    var that = {},
        shareView,
        shareText,
        shareUrl,

        init = function (param) {
            shareUrl = param.parameters.url;
            shareText = param.parameters.text;
            shareView = LostAndFound.Views.ShareView.init();
            attachListeners();
            return that;
        },

        attachListeners = function () {
            $(shareView).on('share', onShare);
        },

        setShareText = function (text) {
            shareText = text;
        },

        setShareUrl = function (url) {
            shareUrl = url;
        },

        onShare = function (evt, service) {
            var url = shareUrl || window.location.href;
            switch (service) {
                case 'facebook':
                    shareFacebook(url);
                    break;
                case 'twitter':
                    shareTwitter(url);
                    break;
            }
        },

        shareFacebook = function (url) {
            FB.ui({
                method: 'share',
                href: url,
            }, function (response) {
            });
        },

        shareTwitter = function (url) {
            var width = 575,
                height = 400,
                left = ($(window).width() - width) / 2,
                top = ($(window).height() - height) / 2,
                opts = 'status=1' +
                ',width=' + width +
                ',height=' + height +
                ',top=' + top +
                ',left=' + left;
            var text = trimTwitterText(shareText, url);
            var twitterUrl = "https://twitter.com/share?text=" + text;
            window.open(twitterUrl, 'twitter', opts);
        },

        trimTwitterText = function (text, url) {
            var twitterMessageLength = 140;
            var availableSpace = twitterMessageLength - 1 - url.length;
            text = text.slice(0, availableSpace - 5);
            return text + " ...";
        };

    that.setShareUrl = setShareUrl;
    that.setShareText = setShareText;
    that.init = init;
    return that;
}());
