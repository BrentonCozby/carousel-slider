'use strict';

(function () {

    function stackSlides() {
        this.stacked = true;
        var $thisCarousel = $(this);
        var slideHeight = $($thisCarousel).css('padding-bottom');
        var slideWidth = $($thisCarousel).css('width');

        var paddingBottom = +slideHeight.substring(0, slideHeight.length - 2) / +slideWidth.substring(0, slideWidth.length - 2);

        paddingBottom = paddingBottom * 100 + '%' || '0';

        // replace carousel styles and functionality with stacked ones
        this.stopAutoSlide();
        $thisCarousel.find('.dot').removeClass('active');
        $thisCarousel.children().addClass('stacked').removeClass('appear-from-left\n                appear-from-right\n                hide-to-left\n                hide-to-right\n                fade-out\n                fade-in');
        $thisCarousel.addClass('stacked');
        $thisCarousel.children('.carousel-item').css('padding-bottom', paddingBottom);
    }

    function initCarousel(index, carousel) {
        if (this.stacked === false) return false;

        this.stacked = false;
        var $thisCarousel = $(this);
        var $carouselItems = $thisCarousel.find('.carousel-item');
        var $dots = $thisCarousel.find('.dot');
        var quant = $carouselItems.length;
        var waitTime = 5000;
        var activeIndex = 0;
        var nextIndex = 1;

        // remove stacked styles
        $thisCarousel.removeClass('stacked');
        $thisCarousel.children().removeClass('stacked');
        $thisCarousel.children('.carousel-item').css('padding-bottom', '0');

        // hide all carousel items except the first one
        $carouselItems.addClass('fade-out');
        $carouselItems[0].classList.remove('fade-out');

        // set active dot
        $dots[0].classList.add('active');

        // AutoSlider
        var autoSlider = setInterval(function () {
            return slideCarousel(null, 'right');
        }, waitTime);

        function restartAutoSlide() {
            if (autoSlider) clearTimeout(autoSlider);
            autoSlider = setInterval(function () {
                return slideCarousel(null, 'right');
            }, waitTime);
        }

        function slideCarousel(e, direction) {
            // hide current carousel-item
            var opposite = direction === 'left' ? 'right' : 'left';
            $carouselItems[activeIndex].classList.remove('appear-from-left', 'appear-from-right', 'fade-in');
            $carouselItems[activeIndex].classList.add('hide-to-' + opposite);

            // calculate the index of the next carousel-item to show
            if (direction === 'left') {
                nextIndex = (activeIndex - 1 + quant) % quant;
            } else {
                nextIndex = (activeIndex + 1 + quant) % quant;
            }

            // show next carousel-item
            $carouselItems[nextIndex].classList.remove('hide-to-left', 'hide-to-right', 'fade-out');
            $carouselItems[nextIndex].classList.add('appear-from-' + direction);

            // update dots' UI
            $dots.removeClass('active');
            $dots[nextIndex].classList.add('active');

            activeIndex = nextIndex;

            restartAutoSlide();
        }

        $thisCarousel.find('.left-btn').click(function (e) {
            return slideCarousel(e, 'left');
        });
        $thisCarousel.find('.right-btn').click(function (e) {
            return slideCarousel(e, 'right');
        });

        function onDotClick(e) {
            var nextIndex = this.dataset.index;

            if (+nextIndex === +activeIndex) return;

            // fade out active carousel-item
            $carouselItems[activeIndex].classList.remove('appear-from-left', 'appear-from-right', 'fade-in');
            $carouselItems[activeIndex].classList.add('fade-out');

            // fade in next carousel-item
            $carouselItems[nextIndex].classList.remove('hide-to-left', 'hide-to-right', 'fade-out');
            $carouselItems[nextIndex].classList.add('fade-in');

            // update dots' UI
            $dots.removeClass('active');
            $dots[nextIndex].classList.add('active');

            activeIndex = +nextIndex;

            restartAutoSlide();
        }

        $dots.click(onDotClick);

        // functions avaible to the user
        this.waitTime = function (time) {
            waitTime = +time;
            restartAutoSlide();
        };

        this.stopAutoSlide = function () {
            clearTimeout(autoSlider);
        };

        this.stackSlides = stackSlides;
        this.initCarousel = initCarousel;
    }

    $('.carousel').each(initCarousel);
})();
