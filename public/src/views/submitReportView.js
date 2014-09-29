LostAndFound.Views.SubmitReportView = (function () {
    var that = {},
        categoryOptionsTemplate,
        $categorySelect,
        categoryId,
        $title,
        $description,
        imageData,

        init = function (context) {
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
            var files = this.files;
            if (files || files.length > 0) {
                var file = files[0];
                var imageType = /image.*/;

                if (!file.type.match(imageType)) {
                    return;
                }

                var img = document.createElement("img");

                var $preview = $('#preview');

                var reader = new FileReader();
                reader.onload = function (e) {
                    var dataUrl = e.target.result;
                    img.src = dataUrl;
                    var canvas = drawImageCanvas(img, 300);
                    imageData = canvas.toDataURL();
                    img.src = imageData;
                    $preview.removeClass('hidden');
                    $preview.html(img);
                };
                reader.readAsDataURL(file);
            }
        },

        drawImageCanvas = function (img, maxWidth) {
            // QUELLE: https://github.com/josefrichter/resize/blob/master/public/preprocess.js

            var canvas = document.createElement('canvas');

            var width = img.width;
            var height = img.height;

            if (width > maxWidth) {
                //height *= maxWidth / width;
                height = Math.round(height *= maxWidth / width);
                width = maxWidth;
            }

            // resize the canvas and draw the image data into it
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            return canvas;
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
            var categories = categoriess.concat(); // don't add the extra category to the reference -> create a copy
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