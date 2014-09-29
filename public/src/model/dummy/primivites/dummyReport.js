dummyreportscreated = 0;
LostAndFound.Model.Dummy.DummyReport = function (num, request) {
    /// <param name="num" type="Number"></param>
    /// <param name="request" type="LostAndFound.Model.ReportsRequest"></param>
    LostAndFound.Model.Report.call(this);

    dummyreportscreated++;

    this.getRandomCoords =  function () {
        /// <param name="sector" type="LostAndFound.Model.ReportsRequest"></param>   
        var lat = 49.0167;
        var lng = 12.0833;

        if (request && request.sector) {
            var sector = request.sector;


            var longfactor = Math.random();
            var latFactor = Math.random();
            lng = sector.longMin + ((sector.longMax - sector.longMin) * longfactor);
            lat = sector.latMin + ((sector.latMax - sector.latMin) * latFactor);
        }


        return { lng: lng, lat: lat };
    };

    this.getRandomType = function () {
        var items = request.itemTypes;
        var item = items[Math.floor(Math.random() * items.length)];
        return LostAndFound.Model.Dummy.Config.itemTypes[item];
    }

    var coords = this.getRandomCoords();

    this.category = this.getRandomType();
    this.type = request.type;
    this.id = dummyreportscreated;
    this.lng = coords.lng;
    this.lat = coords.lat;
    this.title = "Dummy Title " + this.id;
    this.description = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit";
    this.imageURL = "http://bikechicago.info/securebike.jpg";

    this.getCategoryName = function getCategoryName() {
        return this.category;
    };

    this.getType = function getType() {
        if (this.type)
            return this.type;
        return "lost";
    };
}