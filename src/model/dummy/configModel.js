LostAndFound.Model.Dummy.ConfigModel = (function () {
    var that = {},

        init = function() {

            return that;
        },

        getItemTypes = function(callback) {
            setTimeout(function () {
                var types = [];
                var config = LostAndFound.Model.Dummy.Config;
                for (var i = 0; i < config.itemTypeLength; i++) {
                    var type = new LostAndFound.Model.ItemType(i, config.itemTypes[i]);
                    types.push(type);
                }
                callback(types);
            }, LostAndFound.Model.Dummy.Config.delay);
        };

    that.getItemTypes = getItemTypes;
    that.init = init;
    return that;

}());