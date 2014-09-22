LostAndFound.Views.PaginationView = (function () {
    var that = {},
        paginationTemplate,
        pageTemplate,
        $pagination,
        selectedPage,

        init = function (context) {
            console.log("LoginView init");
            initPagination(context);
            return that;
        },

        initPagination = function (context) {
            $pagination = $("#pagination-frame", context);
            $pagination.on('click', 'li', function (evt) {
                console.log("pagination click");
                $pagination.children().each(function (i) {
                    console.log("paginationframe");
                    $(this).removeClass('current');
                });
                var $target = $(evt.currentTarget);
                $target.addClass('current');
                selectedPage = $target.text();
                console.log(selectedPage);
                adjust();
            });
            pageTemplate = $('#page-template', context).html();
            paginationTemplate = $("#pagination-template", context).html();
            Mustache.parse(pageTemplate);
            Mustache.parse(paginationTemplate);
        },

        maxLeft,
        adjust = function() {
            if (selectedPage >= maxLeft -1) {
                maxLeft++;
                var page = {page: maxLeft};
                var pageEntry = Mustache.render(pageTemplate, page);
                $('#pag-ellips').before(pageEntry);
            }
        },

        reset = function() {
            maxLeft = 3;
        },

        setupPagination = function (resultCount) {
            reset();
            var pageCount = resultCount / getPageSize();
            var pages = [];
            for (var i = 0; i < pageCount; i++) {
                var page = { page: i + 1 };
                if (i >= maxLeft) {
                    if (pageCount > 8) {
                        if (i == maxLeft) {
                            page = { page: "...", 'class': 'unavailable', id: 'pag-ellips' }
                        } else if (i > pageCount - 3) {
                            page = { page: i + 1 };
                        } else {
                            continue;
                        }
                    }
                }
                
                if (page.page == 1) {
                    page.class = 'current';
                    selectedPage = 1;
                }
                pages.push(page);
            }
            var pagination = Mustache.render(paginationTemplate, pages);
            $pagination.html(pagination);
        },

        getPage = function () {
            return 1;
        },

        getPageSize = function () {
            return 10;
        };

    that.setupPagination = setupPagination;
    that.getPageSize = getPageSize;
    that.getPage = getPage;
    that.init = init;
    return that;
}());