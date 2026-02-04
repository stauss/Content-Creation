// Check flexbox support
(function($) {
	"use strict";
	var $document = $(document);
    $document.ready(function() {
        if (!Modernizr.flexbox && !Modernizr.flexboxlegacy && !Modernizr.flexboxtweener) {
            document.body.innerHTML = '<div class="support-alert">Flexbox not supported. <br>Please update your browser.</div>'
        }
    });
})(jQuery);

// Loader
(function($) {
	"use strict";
    var page = $(".animsition")

    page.animsition({
        inClass: 'page--in',
        outClass: 'page--out',
        linkElement: '.mnm__link',
        loadingClass: 'cssload-container',
        loadingInner: '<div class="cssload-speeding-wheel"></div>'
    })
    .on({
        'animsition.inStart': function() {
            var $this = $(this);

            $this
                .addClass('page--loaded');
        },
        'animsition.inEnd': function() {
            scrollAnimate(); // scroll animation when load animation is END
        },
        'animsition.outStart': function() {
            var $this = $(this);

            $this
                .removeClass('page--loaded')
                .addClass('page--unloaded');
        }
    });
})(jQuery);

// Animations when you scroll
function scrollAnimate() {
    var $anmBlock = $('.anm');

    $anmBlock.each(function() {
        var $this = $(this);

        $this.imagesLoaded(function() {
            var $item = $this.find('.anm__item');
            // general animation options
            var offset = $this.data('offset') ? $this.data('offset') : '90%';
            var duration = $this.data('duration') ? $this.data('duration') : '1s';
            var delay = $this.data('delay') ? $this.data('delay') : 0;

            $this.waypoint(function(direction) {

                if (direction === "down" && !$this.hasClass('anm--done')) {
                    $item.each(function() {
                        var $item = $(this);
                        // individual animation options
                        itemDuration = $item.data('duration') ? $item.data('duration') : duration;
                        itemDelay = $item.data('delay') ? $item.data('delay') : 0;

                            $item
                                .css({
                                    'visibility': 'visible',
                                    'animation-duration': itemDuration || duration,
                                    'animation-delay': itemDelay || delay

                                })
                                .addClass($item.data('effect-in'))
                    });

                    $this.addClass('anm--done');
                }

            }, {
                offset: offset
            });
        });
    });
};

// Mobile menu
(function($){
	"use strict";
    var $menu = $('.js-dl-menu');

    $menu.dlmenu({
        animationClasses: {
            classin: 'dl-animate-in-3',
            classout: 'dl-animate-out-3'
        },
        onLevelClick: function(el, name) {
            var $this = el.parents('.js-dl-menu');
            var $sub = el.find('.dl-submenu');
            var $back = $this.find('.dl-back');
            var $thisHeight = $this.find('.dl-menu').outerHeight(true);

            $this.css('height', $sub.outerHeight(true));

            $back.on('click', function() {
                $this.css('height', $thisHeight);
            });
        }
    });
})(jQuery);

// Contacts button
(function($){
    var $btn = $('.js-mn__btn');

    $btn.on('click', function() {
        var $this = $(this);

        $this.toggleClass('mn-btn--open');
    });
})(jQuery);

// Popups
(function($){
	"use strict";
    var popupsBtn = $('.js-popups');
	var $html = $('html');
    popupsBtn.each(function() {
        var $this = $(this);
        var mainMode = $this.data('popup-mode') ? $this.data('popup-mode') : 'inline';
        var mainClass = $this.data('popup-type') ? $this.data('popup-type') : 'mfp-default';
        var prependTo = $this.data('prependto') ? $this.data('prependto') : 'body';
        var closebtn = $this.data('closebtn') ? $this.data('closebtn') : '<span class="mfp-close"></span>';
        var alignTop = $this.data('aligntop') ? $this.data('aligntop') : false;

        $this.magnificPopup({
            alignTop: alignTop,
            type: mainMode,
            midClick: true,
            overflowY: 'scroll',
            fixedBgPos: false,
            prependTo: $(prependTo),
            closeMarkup: closebtn,
            removalDelay: 500,
            mainClass: mainClass,
            callbacks: {
                open: function() {
                    var stickyTopBar = $('.js-mn-top.mn-top--sticky');
                    var scrollBarWidth = window.innerWidth - $('body').width();

                    $html.addClass('open-mfp');
                    // initMap('update');

                    if(scrollBarWidth !== 0) {
                        stickyTopBar.css('right', scrollBarWidth);
                    }
                },
                close: function() {
                    var stickyTopBar = $('.js-mn-top.mn-top--sticky');

                    stickyTopBar.css('right', '');
                    $html.removeClass('open-mfp');
                    $this.removeClass('-open');
                }
            }
        });

        $this.on('click', function() {
            if($this.hasClass('-open')) {
                $.magnificPopup.close();
            }

            $this.toggleClass('-open');
        });
    });
})(jQuery);

// Lightbox gallery
(function($){
	"use strict";
    var gallery = $('.js-gallery');

    gallery.each(function() {
        var $this = $(this);
        var mainClass = $this.data('popup-class') ? $this.data('popup-class') : 'mfp-fadeup';
        var closebtn = $this.data('closebtn') ? $this.data('closebtn') : '<span class="mfp-close"></span>';

        $this.magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: mainClass,
            closeMarkup: closebtn,
            gallery: {
                enabled: true,
                arrowMarkup: '<span class="mfp-arrow-1 mfp-arrow-1-%dir%"></span>',
                preload: [0,2],
                navigateByImgClick: true
            },
            zoom: {
                enabled: true,
                duration: 600,
                opener: function(element) {
                    return element.find('img');
                }
            },
            callbacks: {
                buildControls: function() {
                    this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
                }
            }
        });
    });
})(jQuery);

// Sticky menu
(function($){
	"use strict";
	var $window = $(window);
    var $menu = $('.js-mn-top');
    var scrollTop;
    var offset = $menu.data('scroll-offset') ? $menu.data('scroll-offset') : 35; // offset of sticky menu (default 35px)

    $window.on('scroll', function() {
        scrollTop = $window.scrollTop();
        if(scrollTop >= offset) {
            $menu.addClass('mn-top--sticky');
        } else {
            $menu.removeClass('mn-top--sticky');
        }
    });
})(jQuery);

// Sticky sticky
(function($){
	"use strict";
    var stick = $(".js-stick-in-parent");

     $(document).ready(function() {
        $(document).imagesLoaded(function() {
            stick.each(function () {
                var $this = $(this);
                var offTop = $('.js-mn-top');

                $this.stick_in_parent({
                    parent: $this.data('parent') ? $this.data('parent') : $this.parent(),
                    offset_top: offTop ? offTop.outerHeight() + 30 : 30
                });
            });
        });
    });
})(jQuery);

// Type text
(function($){
	"use strict";
    var el = $('.js-typed');
    var count = 1;

    el.each(function() {
        var $this = $(this);
        var strings = $this.data('typed-text').split(',');
        var loop = $this.data('loop') || false;
        var cursor = $this.data('cursor') || "_";

        $this.waypoint(function(direction) {
            if(direction==="down") {
                $this.typed({
                    strings: strings,
                    startDelay: 2200,
                    typeSpeed: 100,
                    loop: loop,
                    cursorChar: cursor
                });
            }
        }, {
            offset: '100%'
        });
    });
})(jQuery);

// Isotope pane
(function($){
	"use strict";
	var $document = $(document);
    $document.ready(function() {
        $document.imagesLoaded(function() {
            var $isotope = $('.js-isotope');
            var $filters = $('.js-isotope-filters');

            var $grid = $isotope.isotope({
                itemSelector: '.isotope__item',
                masonry: {
                    columnWidth: '.isotope__sizer'
                },
                percentPosition: true,
                transitionDuration: '0.8s',
                hiddenStyle: {
                    opacity: 0,
                    transform: 'scale(0.001)'
                },
                visibleStyle: {
                    opacity: 1,
                    transform: 'scale(1)'
                }
            });



            $filters.on('click', 'li', function(e) {
                e.preventDefault();

                var $this = $(this);
                var filter = $this.attr('data-filter');

                $grid.isotope({
                    filter: function() {
                        var $this = $(this);
                        var category = $this.data('category');
                        return category === filter || filter === '*';
                    }
                });
            });

            $filters.each(function(i, btns) {
                var $btns = $(btns);

                $btns.on('click', 'li', function() {
                    var $this = $(this);

                    $btns.find('.active').removeClass('active');
                    $this.addClass('active');
                });
            });
        });
    });
})(jQuery);

// Carousel
(function($) {
	"use strict";
    $(document).ready(function() {
        var carousel = $('.js-carousel');

        carousel.each(function() {
            var $this = $(this);

            $this.slick({
                arrows:         $this.data('arrows') ? $this.data('arrows') : false,
                dots:           $this.data('dots') ? $this.data('dots') : false,
                slidesToShow:   $this.data('slides') ? $this.data('slides') : 1,
                infinite:       $this.data('infinite') ? $this.data('infinite') : false,
                fade:           $this.data('fade') ? $this.data('fade') : false,
                speed:          $this.data('speed') ? $this.data('speed') : 800,
                centerMode:     $this.data('centermode') ? $this.data('centermode') : false,
                centerPadding:  $this.data('centerpadding') ? $this.data('centerpadding') : "10%",
                dotsClass:      $this.data('dotsclass') ? $this.data('dotsclass') : 'default-dots',
                focusOnSelect:  $this.data('focusonselect') ? $this.data('focusonselect') : false,
                autoplay: true,
                autoplaySpeed: 1500,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: $this.data('slides') < 3 ? $this.data('slides') : 3
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: $this.data('slides') < 2 ? $this.data('slides') : 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: 0
                    }
                }],
                customPaging: function(slider, i) {
                    return '<span></span>';
                }
            });
        });
        
    });
})(jQuery);

// Scroll down
(function($){
	"use strict";
	var $window = $(window);
    var butt = $('.js-scroll-down');
    var wHeight = $window.height();
    var customHeight = $('.' + butt.data('el-height')).height();

    butt.on('click', function(e) {
        e.preventDefault();

        var body = $("html, body");
        body.animate({
            scrollTop: customHeight ? customHeight : wHeight
        }, 800);
    });
})(jQuery);

// Go top button
(function($){
	"use strict";
    var butt = $('.js-go-top');
    butt.on('click', function(e) {
        e.preventDefault();
        var body = $("html, body");
        body.animate({
            scrollTop: 0
        }, 1500);
    });
})(jQuery);

// Anchor scroll
(function($) {
	"use strict";
    var offTop = $('.js-mn-top');
    var anchor = $('a.js-anchor[href*="#"]:not([href="#"]');

    anchor.click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - (offTop ? offTop.outerHeight() : 0)
                }, 1000);
                return false;
            }
        }
    });
})(jQuery);

// Fixed buttons
(function($) {
	"use strict";
    var butt = $('.js-fixed-btns');
    var main = $('.js-mn-header');

    main.waypoint(function(direction) {
        if(direction==="down") {
            butt.addClass('fixed-btns--sticky');
        } else if(direction==="up") {
            butt.removeClass('fixed-btns--sticky');
        }
    }, {
        offset: '-100%'
    });
})(jQuery);

// Fixed breadcrumbs
(function($) {
	"use strict";
    var butt = $('.js-fixed-breadcrumbs');
    var main = $('.js-mn-header');
    var mainHeight = main.outerHeight();

    if(main.length) {
        butt.css({
            'top': mainHeight,
            'position': 'absolute'
        });

        main.waypoint(function(direction) {
            if(direction==="down") {
                butt.addClass('fixed-breadcrumbs--sticky');
            } else if(direction==="up") {
                butt.removeClass('fixed-breadcrumbs--sticky');
            }
        }, {
            offset: '-' + mainHeight + 'px'
        });
    }
})(jQuery);
