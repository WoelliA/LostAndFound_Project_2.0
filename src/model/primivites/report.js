LostAndFound.Model.Report = function() {
    this.lng;
    this.lat;
    this.id;
    this.imageURL;
    this.description;
    this.title ;
    this.type ;
    this.category;
    this.reward ;
    this.when ;
    this.email ;
    this.phoneNumber;

    this.getCategoryName = function () {
        if (this.category) {
            return this.category.shortname;
        }
        return undefined;
    }

    this.getType = function() {
        return this.type;
    }
}