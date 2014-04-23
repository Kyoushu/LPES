// ==UserScript==
// @name       LPES
// @namespace  https://github.com/Kyoushu/LPES
// @version    0.4
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

                    console.log('LPES: Updating project table');

                    stopObserver();
                    
                    var defaultCss = {
                        'background': '#FFFFFF',
                        'font-weight': 'normal',
                        'color': '#000000'
                    };

                    var cssGenerators = {
                        'td.custom_field_8302': function(value) {
                            if (value === 'Pending')
                                return $.extend(defaultCss, {'background': 'rgb(100, 100, 255)'});
                            if (value === 'Incorrect')
                                return $.extend(defaultCss, {'background': 'rgb(200, 0, 0)', 'font-weight': 'bold'});
                            if (value === 'Question' || value === 'Comment')
                                return $.extend(defaultCss, {'background': 'rgb(255, 100, 255)'});
                            if (value === 'Fixed')
                                return $.extend(defaultCss, {'background': 'rgb(0, 200, 0)'});
                            if (value === 'WTGL')
                                return $.extend(defaultCss, {'background': 'rgb(0, 200, 0)'});
                            else
                                return defaultCss;
                            
                        },
                        'td.custom_field_1774': function(value) {
                            if (value.match(/Critical/))
                                return $.extend(defaultCss, {'background': 'rgb(200, 0, 0)'});
                            if (value === 'High')
                                return $.extend(defaultCss, {'background': 'rgb(200, 80, 80)'});
                            if (value === 'Medium')
                                return $.extend(defaultCss, {'background': 'rgb(200, 150, 150)'});
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