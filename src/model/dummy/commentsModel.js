LostAndFound.Model.Dummy.CommentsModel = (function () {
    var that = {},
       
        init = function () {
            return that;
        },
        
        getReportsComments = function (request, callback) {
            /// <param name="request" type="LostAndFound.Model.CommentsRequest"></param>
            setTimeout(function() {
                var comments = [];
                for (var i = 0; i < request.count; i++) {
                    console.log(LostAndFound.Model.Dummy.DummyComment);
                    var id = request.offset + i;
                    var comment = new LostAndFound.Model.Dummy.DummyComment(id);
                    comments.push(comment);
                }
                callback(comments);
            }, LostAndFound.Model.Dummy.Config.delay);


        };

    that.getReportsComments = getReportsComments;
    that.init = init;
    return that;

}());