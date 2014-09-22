LostAndFound = {};
LostAndFound.Views = {};
LostAndFound.Controllers = {};
LostAndFound.Model = {};
LostAndFound.Model.Dummy = {};

LostAndFound.App = (function () {

    var that = {},

        isRelease = false,

        init = function () {
            $.ajaxSetup({
                cache: true
            });
            initPresenter();
        },

        initPresenter = function() {

            var frame = document.getElementById("frame");
            var context = document.getElementById("content");
            var root = window.location.origin;

            var loaders = [];
            var viewLoaderSettings = Presenting.ViewLoader.getDefaultSettings(root);
            var viewLoader = new Presenting.ViewLoader(viewLoaderSettings);
            loaders.push(viewLoader);

            var modelParameters = createModelParameters();
            console.log("model parameters", modelParameters);
            var controllerInstanceLoader = new Helpers.InitInstanceLoader(LostAndFound.Controllers, modelParameters);

            var controllerLoaderSettings = Presenting.ControllerLoader.getDefaultSettings(root);
            var controllerLoader = new Presenting.ControllerLoader(controllerLoaderSettings, controllerInstanceLoader);
            loaders.push(controllerLoader);

            var htmlLoaderSettings = Presenting.HtmlLoader.getDefaultSettings(root);
            var htmlLoader = new Presenting.ViewLoader(htmlLoaderSettings);

            var settings = {
                origin: root,
                frame: frame,
                htmlLoader: htmlLoader,
                loaders: loaders
            };

            LostAndFound.Presenter = new Presenting.MainPresenter(settings, context);
            var routing = LostAndFound.Presenter.routing;

            var modal = new Presenting.FoundationModal(document.getElementById("modal"), document.getElementById("modal-frame"));
            var modalPresenter = new Presenting.ModalPresenter(modal, settings, routing);
            routing.addRoute("report/{0}", function (id) {
                modalPresenter.show("report", id);
            });

            LostAndFound.Presenter.show("main");
        },
        
    //        document.getElementById('modal-frame');
    //document.getElementById('modal');
        createModelParameters = function() {            
            if (isRelease) {
                return LostAndFound.Model;

            } else {
                return LostAndFound.Model.Dummy;
            }
        };

    that.init = init;

    return that;

}());