﻿LostAndFound.Views.ControlsView = (function () {
    var that = {},
        $foundButton,
        $lostButton,
        $itemTypesList,
        type = "lost",
        itemTypeTemplate,

        init = function (context) {
            $itemTypesList = $("#item-types", context);
            $foundButton = $("#found-button", context);
            $lostButton = $("#lost-button", context);
            toggle($lostButton, $foundButton);
            $foundButton.on('click', function () {
                type = "found";
                toggle($foundButton, $lostButton);
            });
            $lostButton.on('click', function () {
                type = "lost";
                toggle($lostButton, $foundButton);
            });

            $itemTypesList.on('click', '.item-type', function (evt) {
                var $entry = $(evt.currentTarget);
                toggleItemType($entry);
            });

            itemTypeTemplate = $("#item-type-template").html();
            Mustache.parse(itemTypeTemplate);

            return that;
        },

        toggleItemType =  function($typeEl) {
            var isInactive = $typeEl.hasClass("inactive");
            if (isInactive) {
                $typeEl.removeClass("inactive");
            } else {
                $typeEl.addClass("inactive");
            }
            $(that).trigger("item-types-changed");
        },

        toggle = function ($activeButton, $inactiveButton) {
            $activeButton.removeClass("inactive");
            $inactiveButton.addClass("inactive");
            $(that).trigger("type-changed");
        },

        displayItemTypes = function(types) {
            $itemTypesList.empty();
            for (var index in types) {
                var t = types[index];
                addItemType(t, index);
            }
        },

        addItemType = function(t) {
            var entry = Mustache.render(itemTypeTemplate, t);
            
            $itemTypesList.append(entry);
        },

        getSelectedItemTypes = function () {
            var selectedTypes = [];
            $itemTypesList.children('.item-type').each(function(i) {
                var $entry = $(this);
                if (!$entry.hasClass("inactive")) {
                    selectedTypes.push($entry.attr("data-id"));
                }
            });
            return selectedTypes;
        },

        setSelectedItemTypes = function (selectedCategoriesIds) {
            $itemTypesList.children('.item-type').each(function(i) {
                var $entry = $(this);
                var entryId = $entry.attr("data-id");
                if (selectedCategoriesIds.indexOf(entryId) >= 0) {
                    $entry.removeClass('inactive');
                } else {
                    $entry.addClass('inactive');
                }
            });
        },

        getSelectedType = function() {
            return type;
        };

    that.setSelectedItemTypes = setSelectedItemTypes;
    that.getSelectedItemTypes = getSelectedItemTypes;
    that.displayItemTypes = displayItemTypes;
    that.getSelectedType = getSelectedType;
    that.init = init;
    return that;
}());