LostAndFound.Model.ParseHelper = {
    copyAttributes: function (target, parseObject) {
        var attributes = parseObject.attributes;
        for (var key in attributes) {
            target[key] = attributes[key];
        }
        target.id = parseObject.id;
    },

    copyArray: function (parseObjects, creationDelegate) {
        var results = [];
        for (var index in parseObjects) {
            var parseObject = parseObjects[index];

            var object = creationDelegate ? creationDelegate() : {};
            this.copyAttributes(object, parseObject);
            results.push(object);
        }
        console.log(results);
        return results;
    }
}