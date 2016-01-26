/* Copyright (C) YOOtheme GmbH, YOOtheme Proprietary Use License (http://www.yootheme.com/license) */

jQuery(function($) {

    var config = $('html').data('config') || {};

    // Social buttons
    //$('article[data-permalink]').socialButtons(config);

    // Vertical Dropdown menu
    $('.tm-sidebar-nav').verticalDropdown();

    // Overlay
    var speed     = 250,
        //easing    = mina.easeinout,
        pathStart = 'm 0,0 0,171.14385 c 24.580441,15.47138 55.897012,24.75772 90,24.75772 34.10299,0 65.41956,-9.28634 90,-24.75772 L 180,0 0,0 z',
        pathHover = 'M0,0v56.777c23,3.473,50.5-7.199,90-7.199c39,0,69.75,10.422,90,7.199V0H0z';

    var template = [
        '<svg class="uk-hidden-small" viewBox="0 0 180 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">',
            '<path d="'+pathStart+'"/>',
        '</svg>'
    ].join("");

    $('.tm-overlay').each(function() {

        var ele        = $(this),
            $svg       = $(template),
            s          = Snap($svg[0]),
            path       = s.select('path'),
            pathStart  = path.attr('d');

        if ($('html').hasClass('uk-notouch')) {
            ele.find('img').after($svg);
        }

        ele.on('mouseenter', function() {
           // path.animate( { 'path' : pathHover }, speed, easing );
        });

        ele.on('mouseleave', function() {
           // path.animate( { 'path' : pathStart }, speed, easing );
        });

    });

    // Fixed Sidebar
    var sidebar   = $('.tm-sidebar'),
        page      = $('.tm-page'),
        win       = $(window),
        ddmax     = -1;

        if(!$('body > div').hasClass('tm-sidebar-open')) {

            var mode;

            page.on("transitionend animationend webkitTransitionEnd webkitAnimationEnd", function() {
                sidebar[mode ? 'addClass':'removeClass']('uk-open');
            });

            sidebar.on({

                "mouseenter": function(){
                    mode = 1;

                    if(!$.UIkit.support.transition) {
                        sidebar.addClass('uk-open');
                    }
                },

                "mouseleave": function(){
                    mode = 0;

                    if(!$.UIkit.support.transition) {
                        sidebar.removeClass('uk-open');
                    }
                }
            });

        } else {
            sidebar.addClass('uk-open');
        }

        sidebar.find('.uk-dropdown').each(function(){

            var dd = $(this);

            dd.css({ display: 'block', opacity: 0 });
            ddmax = Math.max(ddmax, dd.height() + dd.offset().top);
            dd.css({ display: '', opacity: '' });

        });

    if ($.UIkit.support.touch) {
        $.UIkit.offcanvasTrigger(sidebar, {
            "target": "#offcanvas"
        });
    }

    var fn = function(){

            if (sidebar.outerHeight() > win.height() || ddmax > win.height()) {
                sidebar.css({'position':'absolute'});
            } else {
                sidebar.css({'position':''});
            }

        };

    win.on("resize", function(){

        fn();

        return fn;

    }()).on("message", $.UIkit.Utils.debounce(function(e) {

        if (e.originalEvent.data == "customizer-update")  fn();

    }, 150));

    // Hide main menu position if empty (WP)
    var navbar = $('.tm-navbar');

    if(!navbar.children().length){ navbar.hide(); }


});