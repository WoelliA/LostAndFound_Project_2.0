dummyreportscreated = 0;
LostAndFound.Model.Dummy.DummyUser = function (num) {
    /// <param name="num" type="Number"></param>
    /// <param name="request" type="LostAndFound.Model.ReportsRequest"></param>
    LostAndFound.Model.User.call(this);

    this.id = num;
    this.name = "Dummy User " + this.id;
    this.info = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit";
    this.imageURL = "http://bikechicago.info/securebike.jpg";
}