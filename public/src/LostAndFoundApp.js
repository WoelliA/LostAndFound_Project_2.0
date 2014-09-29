/// <reference path="../libs/parse_1.3.0.js" />
LostAndFound = {};
LostAndFound.Views = {};
LostAndFound.Controllers = {};
LostAndFound.Model = {};
LostAndFound.Model.Dummy = {};

LostAndFound.App = (function () {

    var that = {},

        isRelease = true,

        init = function () {
            $.ajaxSetup({
                cache: true
            });
            var isLocal = window.location.host.indexOf("localhost") >= 0;
            if (isRelease && !isLocal) {
                console.log = function () { };
            }
            initPresenter();
            if (isLocal) {
                History.pushState(null, null, "/");
            }
        },

        initPresenter = function () {
            var frame = document.getElementById("frame");
            var context = document.getElementById("content");
            if (!window.location.origin) {
                window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            }
            var root = window.location.origin;

            var loaders = [];

            //var viewLoaderSettings = Presenting.ViewLoader.getDefaultSettings(root);
            //var viewLoader = new Presenting.ViewLoader(viewLoaderSettings);
            //loaders.push(viewLoader);


            var modelParameters = createModelParameters();

            var controllerInstanceLoader = new Helpers.InitInstanceLoader(LostAndFound.Controllers, modelParameters);

            var controllerLoaderSettings = Presenting.ControllerLoader.getDefaultSettings(root);
            var controllerLoader = new Presenting.ControllerLoader(controllerLoaderSettings, controllerInstanceLoader);
            loaders.push(controllerLoader);

            var htmlLoaderSettings = Presenting.HtmlLoader.getDefaultSettings(root);
            var htmlLoader = new Presenting.ViewLoader(htmlLoaderSettings);

            var contentListeners = [];
            contentListeners.push(new Presenting.TitleSettingContentListener());
            var settings = {
                origin: root,
                frame: frame,
                htmlLoader: htmlLoader,
                loaders: loaders,
                contentListeners: contentListeners
            };

            var mainPresenter = LostAndFound.Presenter = new Presenting.MainPresenter(settings, context);
            var routing = LostAndFound.Presenter.routing;

            var modal = new Presenting.FoundationModal(document.getElementById("modal"), document.getElementById("modal-frame"));
            var modalPresenter = LostAndFound.ModalPresenter = new Presenting.ModalPresenter(modal, settings, routing);

            routing.addRoute("/", function () {
                LostAndFound.Presenter.show("main");
            });

            routing.addRoute("/report/{0}:?query:", function (id) {
                if (routing.hashBackStack.length == 0) {
                    mainPresenter.show('report', id);
                } else
                    modalPresenter.show("report", id);
            });

            var showCity = function() {
                if (window.city) {
                    mainPresenter.show("main");
                } else
                    mainPresenter.show("404");
            }
            routing.addRoute("/{section}/{subsection}", showCity);

            routing.onHashChange();
        },

        createModelParameters = function () {
            if (isRelease) {
                Parse.initialize("5JwuXWVknlw1PjJugdSbqDUcXncTeEyXOKpdRNgA", "VDnCiH0qZW94SGyBU4fHeVMKZDKaSOnvgMQD2Vpb");
                return LostAndFound.Model;

            } else {
                return LostAndFound.Model.Dummy;
            }
        };

    that.init = init;

    return that;

}());