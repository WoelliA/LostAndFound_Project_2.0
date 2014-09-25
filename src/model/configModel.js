LostAndFound.Model.ConfigModel = (function () {
    var that = {},
        Category = Parse.Object.extend('category'),
        categoriesHashMap = {},

        init = function () {
            return that;
        },

        createCategories = function (parseCategories) {
            return LostAndFound.Model.ParseHelper.copyArray(parseCategories);
        },

        getItemTypeForId = function (id) {
            return categoriesHashMap[id];
        },

        getItemTypes = function (callback) {
            if (LostAndFound.Model.Categories && LostAndFound.Model.Categories.length >0) {
                callback(LostAndFound.Model.Categories);
                return;
            }

            var types = LostAndFound.Model.Categories = [];

            var query = new Parse.Query(Category);
            query.find({
                success: function (results) {
                    var categories = createCategories(results);
                    categories.forEach(function (category) {
                        categoriesHashMap[category.id] = category;
                        types.push(category);
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