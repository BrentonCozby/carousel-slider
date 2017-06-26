'use strict';

(function () {

    function stackSlides() {
        this.stacked = true;
        var $thisCarousel = $(this

        // set padding-bottom for each carousel-item that has a
        // background-image
        );if ($thisCarousel.children('.carousel-item').children().length > 0) {
            var slideHeight = $($thisCarousel).css('padding-bottom');
            var slideWidth = $($thisCarousel).css('width');

            var paddingBottom = +slideHeight.substring(0, slideHeight.length - 2) / +slideWidth.substring(0, slideWidth.length - 2);

            paddingBottom = paddingBottom * 100 + '%' || '0';

            $thisCarousel.children('.carousel-item').each(function (index, item) {
                if ($(item).css('background-image') !== 'none') {
                    $(item).css('padding-bottom', paddingBottom);
                }
            });
        }

        // replace carousel styles and functionality with stacked ones
        this.stopAutoSlide();
        $thisCarousel.find('.dot').removeClass('active');
        $thisCarousel.children().addClass('stacked').removeClass('appear-from-left\n                appear-from-right\n                hide-to-left\n                hide-to-right\n                fade-out\n                fade-in');
        $thisCarousel.addClass('stacked');
    }

    function initCarousel(index, carousel) {
        if (this.stacked === false) return false;

        this.stacked = false;
        var $thisCarousel = $(this);
        var $carouselItems = $thisCarousel.find('.carousel-item');
        var quant = $carouselItems.length;
        var waitTime = 5000;
        var activeIndex = 0;
        var nextIndex = 1;
        var isAutoSlideOn = true;

        // remove stacked styles
        $thisCarousel.removeClass('stacked');
        $thisCarousel.children().removeClass('stacked');
        $thisCarousel.children('.carousel-item').css('padding-bottom', '0'

        // hide all carousel items except the first one
        );$carouselItems.addClass('fade-out');
        $carouselItems.removeClass('active');
        $carouselItems[0].classList.remove('fade-out');
        $carouselItems[0].classList.add('active'

        // create the dots
        );$('.dots').html(function () {
            var dotElements = '';
            $carouselItems.each(function (index) {
                var active = index === 0 ? 'active' : '';
                dotElements += '<span data-index="' + index + '" class="dot ' + active + '"></span>';
            });
            return dotElements;
        });

        function slideCarousel(e, direction) {
            var $dots = $thisCarousel.find('.dot'

            // hide current carousel-item
            );var opposite = direction === 'left' ? 'right' : 'left';
            $carouselItems[activeIndex].classList.remove('appear-from-left', 'appear-from-right', 'fade-in');
            $carouselItems[activeIndex].classList.add('hide-to-' + opposite

            // calculate the index of the next carousel-item to show
            );if (direction === 'left') {
                nextIndex = (activeIndex - 1 + quant) % quant;
            } else {
                nextIndex = (activeIndex + 1 + quant) % quant;
            }

            // show next carousel-item
            $carouselItems[nextIndex].classList.remove('hide-to-left', 'hide-to-right', 'fade-out');
            $carouselItems[nextIndex].classList.add('appear-from-' + direction

            // update dots' UI
            );$dots.removeClass('active');
            $dots[nextIndex].classList.add('active');

            activeIndex = nextIndex;

            if (isAutoSlideOn === true) {
                restartAutoSlide();
            }
        }

        $thisCarousel.find('.left-btn').click(function (e) {
            return slideCarousel(e, 'left');
        });
        $thisCarousel.find('.right-btn').click(function (e) {
            return slideCarousel(e, 'right');
        });

        function onDotClick(thisDot) {
            var nextIndex = thisDot.dataset.index;
            var $dots = $thisCarousel.find('.dot');

            if (+nextIndex === +activeIndex) return;

            // fade out active carousel-item
            $carouselItems[activeIndex].classList.remove('appear-from-left', 'appear-from-right', 'fade-in');
            $carouselItems[activeIndex].classList.add('fade-out'

            // fade in next carousel-item
            );$carouselItems[nextIndex].classList.remove('hide-to-left', 'hide-to-right', 'fade-out');
            $carouselItems[nextIndex].classList.add('fade-in'

            // update dots' UI
            );$dots.removeClass('active');
            $dots[nextIndex].classList.add('active');

            activeIndex = +nextIndex;

            if (isAutoSlideOn === true) {
                restartAutoSlide();
            }
        }

        $thisCarousel.find('.dots').click(function (e) {
            if (e.target.classList.contains('dot')) {
                onDotClick(e.target);
            }
        }

        // isAutoSlideOn functionality
        );var autoSlider = setInterval(function () {
            return slideCarousel(null, 'right');
        }, waitTime);
        function restartAutoSlide() {
            if (autoSlider) clearTimeout(autoSlider);
            autoSlider = setInterval(function () {
                return slideCarousel(null, 'right');
            }, waitTime);
        }

        // functions avaible to the user
        this.waitTime = function (time) {
            waitTime = +time;
            restartAutoSlide();
            isAutoSlideOn = true;
        };

        this.stopAutoSlide = function () {
            clearTimeout(autoSlider);
            isAutoSlideOn = false;
        };

        this.stackSlides = stackSlides;
        this.initCarousel = initCarousel;
    }

    if ($('.carousel').length) {
        $('.carousel').each(initCarousel);
    }
})();
