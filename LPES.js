// ==UserScript==
// @name       LPES
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description Liquid Planner Enhancement Suite
// @match      https://app.liquidplanner.com/*
// @copyright  2013, James Willans
// ==/UserScript==

(function($){
    
    $(function(){
        
        var projectsContainer = $('#projects_body');
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
       
        // Project Table Updater
            (function(){
            
                  var _timeout;
            var _timeoutDuration = 100;
            
            function update(){
                    
                clearTimeout(_timeout);
                _timeout = setTimeout(function(){
                        
                    console.log('LPES: Updating project table');
                    
                    stopObserver();
                        
                    var cssGenerators = {
                        'td.custom_field_8302': function(value){
                            if(value === 'Pending') return {'background': 'rgb(100, 100, 255)'}
                            if(value === 'Incorrect') return {'background': 'rgb(200, 0, 0)', 'font-weight': 'bold'}
                            if(value === 'Question') return {'background': 'rgb(255, 100, 255)'}
                            if(value === 'Fixed') return {'background': 'rgb(0, 200, 0)'}
                                    },
                        'td.custom_field_1774': function(value){
                            if(value.match(/Critical/)) return {'background': 'rgb(200, 0, 0)'}
                            if(value === 'High') return {'background': 'rgb(200, 80, 80)'}
                            if(value === 'Medium') return {'background': 'rgb(200, 150, 150)'}
                                    }
                              };
                        
                              $.each(cssGenerators, function(selector, cssGenerator){
                                    projectsContainer.find(selector).each(function(){
                                          var element = $(this);
                                          var css = cssGenerator(element.text());
                                          if(css) element.css(css);
                                    });
                              });
                    
                    startObserver();
                        
                        }, _timeoutDuration);    
                    
                  }
            
            function startObserver(){
                //console.log('LPES: Starting mutation observer');
                _observer.observe(projectsContainer[0], _observerConfig);
            }
            
            function stopObserver(){
                //console.log('LPES: Stopping mutation observer');
                _observer.disconnect();
            }
            
            var _observer = new MutationObserver(update)
            var _observerConfig = { childList: true, subtree: true };
            
            update();
                                  
        })();
        
    });
    
})(jQuery);