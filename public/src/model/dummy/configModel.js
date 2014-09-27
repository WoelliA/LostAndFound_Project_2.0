LostAndFound.Model.Dummy.ConfigModel = (function () {
    var that = {},

         types,

        init = function () {
            return that;
        },

        getItemTypeForId = function (id) {
            return types[id];
        },

        getItemTypes = function (callback) {
            setTimeout(function () {
                var config = LostAndFound.Model.Dummy.Config;
                if (!types) {
                    types = [];

                    for (var i = 0; i < config.itemTypeLength; i++) {
                        var name = config.itemTypes[i];
                        var type = new LostAndFound.Model.ItemType(i, name,name);
                        types[i] = type;
                    }
                }
                callback(types);
            }, LostAndFound.Model.Dummy.Config.delay);
        };

    that.getItemTypeForId = getItemTypeForId;
    that.getItemTypes = getItemTypes;
    that.init = init;
    return that;

}());