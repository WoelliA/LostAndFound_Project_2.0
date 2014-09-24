LostAndFound.Views.CommentsView = (function () {
    var that = {},
        $list,
        template,

        init = function (context) {
            console.log("LoginView init");
            // obsolete with facebook comments
            // initList(context);
            // initInput(context);
            return that;
        },

        initList = function (context) {
            $list = $(".comments-list", context);
            template = $('#comment-template').html();
            Mustache.parse(template);
        },

        initInput = function (context) {
            var $input = $("#comment-input");
            $("#submit-comment", context).on('click', function () {
                var text = $input.val();
                $(that).trigger("comment-submit", text);
            });
        },

        addDisplayComments = function (comments) {
            if (!comments)
                return;

            for (var key in comments) {
                var comment = comments[key];
                addDisplayComment(comment);
            }
        },

        addDisplayComment = function (comment) {
            /// <param name="comment" type="LostAndFound.Model.Comment"></param>
            var entry = Mustache.render(template, comment);
            $list.append(entry);
        };

    that.addDisplayComments = addDisplayComments;
    that.init = init;
    return that;
}());