LostAndFound.Views.SubmitReportView = (function () {
    var that = {},
        categoryOptionsTemplate,
        $categorySelect,
        categoryId,
        $title,
        $description,
        imageData,

        init = function (context) {
            console.log("SubmitItem init");
            $('#report-form').submit(onSubmit);
            $('#file-input').on('change', imagePicked);
            $('#upload-image').on('click', function (e) {
                $('#file-input').click();
            });
            $categorySelect = $("#category-select");
            $categorySelect.on('change', onCategorySelected);
            categoryOptionsTemplate = $("#category-options-template").html();
            Mustache.parse(categoryOptionsTemplate);

            $description = $("#report-description");
            $title = $("#report-title");
            return that;
        },

        imagePicked = function () {
            console.log(this.files);
            var files = this.files;
            if (files || files.length > 0) {
                var file = files[0];
                var imageType = /image.*/;

                if (!file.type.match(imageType)) {
                    return;
                }

                var img = document.createElement("img");
                img.file = file;
                $("#preview").html(img);
                $("#preview").removeClass('hidden');
                console.log("loading file");
                var reader = new FileReader();
                reader.onload = (function (aImg) {
                    return function (e) {
                        aImg.src = e.target.result;
                        imageData = e.target.result;
                    };
                })(img);
                reader.readAsDataURL(file);
            }
        },

        onSubmit = function (e) {
            e.preventDefault();
            $(that).trigger("report-submit");
            e.preventDefault();
        },

        onCategorySelected = function (evt) {
            categoryId = $(evt.currentTarget).val();
            $(that).trigger('category-changed', categoryId);
        },

        adjustLabels = function (type) {
            $(".submit-hint").each(function (label) {
                var attribute = $(this).attr("data-" + type);
                if (attribute) {
                    $(this).text(attribute);
                }
            });
        },

        setCategories = function (categoriess) {
            var categories = categoriess.concat();
            console.log(categoriess);
            categories.unshift({ name_single: "Wähle die Kategorie des Gegendstands." });
            var select = Mustache.render(categoryOptionsTemplate, categories);
            $categorySelect.html(select);
        };

    that.getTitle = function () { return $title.val(); };
    that.getDescription = function () { return $description.val(); };
    that.getReward = function () { return $("#report-reward").val(); };
    that.getImageData = function () { return imageData; };
    that.getEmail = function () { return $("#contact-email").val(); };
    that.getPhoneNumber = function () { return $('#contact-phone').val(); }
    that.getDate = function () { return $("#date-input").val(); }

    that.adjustLabels = adjustLabels;
    that.getCategoryId = function () { return categoryId; };
    that.setCategories = setCategories;
    that.init = init;
    return that;
}());