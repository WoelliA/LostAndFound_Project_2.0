LostAndFound.Model.ConfigModel = (function () {
    var that = {},
        Category = Parse.Object.extend('category'),
        types = [],

        init = function () {

            return that;
        },

        createCategories = function (parseCategories) {
            return LostAndFound.Model.ParseHelper.copyArray(parseCategories);
        },
        getItemTypeForId = function (id) {
            return types[id];
        },

        getItemTypes = function (callback) {
            if (types) {
                callback(types);
            }
            console.log("getting item types!!");
            var query = new Parse.Query(Category);
            query.find({
                success: function (results) {
                    var categories = createCategories(results);
                    categories.forEach(function (category) {
                        types[category.id] = category;
                    });
                    callback(categories);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        };

    that.getItemTypeForId = getItemTypeForId;
    that.getItemTypes = getItemTypes;
    that.init = init;
    return that;

}());