'use strict';

(function () {
    // if(!window.$) {
    //     window.$ = require('jquery')
    // }

    $('.carousel').each(function (index, carousel) {
        var $thisCarousel = $(this);
        var $carouselItems = $thisCarousel.find('.carousel-item');
        var $dots = $thisCarousel.find('.dot');
        var quant = $carouselItems.length;
        var activeIndex = 0;

        if ($(window).width() >= 768) {
            // hide all carousel items except the first one
            $carouselItems.addClass('fade-out');
            $carouselItems[0].classList.remove('fade-out');
        }

        function onArrowClick(e, direction) {
            // hide current carousel-item
            var opposite = direction === 'left' ? 'right' : 'left';
            $carouselItems[activeIndex].classList.remove('appear-from-left', 'appear-from-right', 'fade-in');
            $carouselItems[activeIndex].classList.add('hide-to-' + opposite);

            // calculate the index of the next carousel-item to show
            var nextIndex = void 0;
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
        }

        $thisCarousel.find('.left-btn').click(function (e) {
            return onArrowClick(e, 'left');
        });
        $thisCarousel.find('.right-btn').click(function (e) {
            return onArrowClick(e, 'right');
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
        }

        $dots.click(onDotClick);
    });
})();
