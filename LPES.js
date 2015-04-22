// ==UserScript==
// @name       LPES
// @namespace  https://github.com/Kyoushu/LPES
// @version    dev
// @description Liquid Planner Enhancement Suite
// @match      https://app.liquidplanner.com/*
// @copyright  2013, James Willans
// ==/UserScript==

(function($) {

    $(function() {

        var projectsContainer = $('#projects_body');
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

        // Project Table Updater
        (function() {

            var _timeout;
            var _timeoutDuration = 100;

            function update() {

                clearTimeout(_timeout);
                _timeout = setTimeout(function() {

                    stopObserver();
                    
                    var defaultCss = {
                        'background': '#FFFFFF',
                        'font-weight': 'normal',
                        'color': '#000000'
                    };

                    var cssGenerators = {
                        'td.custom_field_8302': function(value) {
			    if (value === 'Scheduled')
                                return $.extend({}, defaultCss, {'background': 'rgb(253,153,102)'});
                            if (value == 'In progress')
                                return $.extend({}, defaultCss, {'background': 'rgb(170,170,255)'});
                            if (value === 'Delivered for testing')
                                return $.extend({}, defaultCss, {'background': 'rgb(185, 240, 185)'});
                            if (value === 'Awaiting feedback - Client/AM' || value === 'Awaiting feedback - Studio')
                                return $.extend({}, defaultCss, {'background': 'rgb(255,224,185)'});
                            if (value === 'Approved to go live')
                                return $.extend({}, defaultCss, {'background': 'rgb(198,224,198)'});
                            if (value === 'Complete')
                                return $.extend({}, defaultCss, {'background': 'rgb(0, 200, 0)'});
                            else
                                return defaultCss;
                            
                        },
                        'td.custom_field_1774': function(value) {
                            if (value.match(/Critical/))
                                return $.extend({}, defaultCss, {'background': 'rgb(200, 0, 0)', 'font-weight': 'bold'});
                            if (value === 'High')
                                return $.extend({}, defaultCss, {'background': 'rgb(200, 80, 80)'});
                            if (value === 'Medium')
                                return $.extend({}, defaultCss, {'background': 'rgb(200, 150, 150)'});
                            else
                                return defaultCss;
                            
                        }
                    };

                    $.each(cssGenerators, function(selector, cssGenerator) {
                        projectsContainer.find(selector).each(function() {
                            var element = $(this);
                            var css = cssGenerator(element.text());
                            if (css)
                                element.css(css);
                        });
                    });

                    startObserver();

                }, _timeoutDuration);

            }

            function startObserver() {
                _observer.observe(projectsContainer[0], _observerConfig);
            }

            function stopObserver() {
                _observer.disconnect();
            }

            var _observer = new MutationObserver(update)
            var _observerConfig = {childList: true, subtree: true};

            update();

        })();

    });

})(jQuery);
