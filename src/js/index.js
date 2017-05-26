(function() {

    function initCarousel(index, carousel) {
        const $thisCarousel = $(this)
        const $carouselItems = $thisCarousel.find('.carousel-item')
        const $dots = $thisCarousel.find('.dot')
        const quant = $carouselItems.length
        let waitTime = 5000
        let activeIndex = 0
        let nextIndex = null

        if($(window).width() >= 768) {
            // hide all carousel items except the first one
            $carouselItems.addClass('fade-out')
            $carouselItems[0].classList.remove('fade-out')
        }

        let autoSlider = setInterval(() => slideCarousel(null, 'right'), waitTime)

        function restartAutoSlide() {
            if(autoSlider) clearTimeout(autoSlider)
            autoSlider = setInterval(() => slideCarousel(null, 'right'), waitTime)
        }

        this.waitTime = function(time) {
            waitTime = +time
            restartAutoSlide()
        }

        this.stopAutoSlide = function() {
            clearTimeout(autoSlider)
        }

        function slideCarousel(e, direction) {
            // hide current carousel-item
            const opposite = (direction === 'left') ? 'right' : 'left'
            $carouselItems[activeIndex].classList.remove('appear-from-left', 'appear-from-right', 'fade-in')
            $carouselItems[activeIndex].classList.add(`hide-to-${opposite}`)

            // calculate the index of the next carousel-item to show
            if(direction === 'left') {
                nextIndex = (activeIndex - 1 + quant) % quant
            }
            else {
                nextIndex = (activeIndex + 1 + quant) % quant
            }

            // show next carousel-item
            $carouselItems[nextIndex].classList.remove('hide-to-left', 'hide-to-right', 'fade-out')
            $carouselItems[nextIndex].classList.add(`appear-from-${direction}`)

            // update dots' UI
            $dots.removeClass('active')
            $dots[nextIndex].classList.add('active')

            activeIndex = nextIndex

            restartAutoSlide()
        }

        $thisCarousel.find('.left-btn').click(e => slideCarousel(e, 'left'))
        $thisCarousel.find('.right-btn').click(e => slideCarousel(e, 'right'))

        function onDotClick(e) {
            const nextIndex = this.dataset.index

            if(+nextIndex === +activeIndex) return;

            // fade out active carousel-item
            $carouselItems[activeIndex].classList.remove('appear-from-left', 'appear-from-right', 'fade-in')
            $carouselItems[activeIndex].classList.add('fade-out')

            // fade in next carousel-item
            $carouselItems[nextIndex].classList.remove('hide-to-left', 'hide-to-right', 'fade-out')
            $carouselItems[nextIndex].classList.add('fade-in')

            // update dots' UI
            $dots.removeClass('active')
            $dots[nextIndex].classList.add('active')

            activeIndex = +nextIndex

            restartAutoSlide()
        }

        $dots.click(onDotClick)
    }

    $('.carousel').each(initCarousel)

})()
