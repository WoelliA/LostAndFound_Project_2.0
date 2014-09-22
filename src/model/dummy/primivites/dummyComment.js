
LostAndFound.Model.Dummy.DummyComment = function (num) {
    /// <param name="num" type="Number"></param>
    /// <param name="request" type="LostAndFound.Model.ReportsRequest"></param>
    LostAndFound.Model.Comment.call(this);

    this.id = num;
    this.user = new LostAndFound.Model.Dummy.DummyUser(this.id);
    this.content = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam";
}