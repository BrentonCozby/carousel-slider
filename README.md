# carousel-slider

### Supported Features
- Multiple carousels on the same page
- AutoSlide, with ability to change the time interval
- Looks good on all screen sizes
  * Option to break slides out of carousel-slider and stack them on top of each other (useful for small screens)

### Install options
- ```bower install carousel-slider```
- ```npm install --save carousel-slider```
- CDN: place the ```link``` tag in the Head and the ```script``` tag at the bottom of the body:
  * ```<link rel="stylesheet" href="https://cdn.rawgit.com/BrentonCozby/carousel-slider/4052c74e/dist/carousel.min.css">```
  * ```<script src="https://cdn.rawgit.com/BrentonCozby/carousel-slider/4052c74e/dist/carousel.js"></script>```

### Requirements
- jQuery

### Easy setup
1. Link ```carousel.min.css``` in the Head
2. Place ```carousel.js``` in a script tag at the bottom of the body
3. Copy the HTML code below and insert your content in the carousel-items

### Usage
Copy following HTML and insert your content into each carousel-item.
```html
<div class="carousel">
    <div id="left-btn" class="left-btn">‹</div>
    <div id="right-btn" class="right-btn">›</div>
    <div class="dots">
        <!-- EDIT: the number of dots must match the number of testimonials -->
        <span data-index="0" class="dot"></span>
        <span data-index="1" class="dot"></span>
        <span data-index="2" class="dot"></span>
        <span data-index="3" class="dot"></span>
    </div>
    <div class="carousel-item">
        <!-- Your content goes here -->
    </div>
    <div class="carousel-item">
        <!-- Your content goes here -->
    </div>
    <div class="carousel-item">
        <!-- Your content goes here -->
    </div>
    <div class="carousel-item">
        <!-- Your content goes here -->
    </div>
</div>
```

### Example: background image with content
```html
<!-- Add your background image in the style tag -->
<div class="carousel-item" style="background-image: url('some-image.jpg')">
    <h1>Click this button</h1>
    <button>Button</button>
</div>
```
```css
#myCarousel {
    padding-bottom: 40%: /* sets carousel height */
}
```

### JavaScript Options
Each carousel automatically slides to its next carousl-item every 5 seconds. To change this time, use the ```waitTime()``` function and pass it a number in milliseconds.
```javascript
$('#myCarousel')[0].waitTime(5000)
```
To stop a carousel from automatically sliding:
```javascript
$('#myCarousel')[0].stopAutoSlide()
```
Stack each slide on top of each other (good for phone screens):
```javascript
if($(window).width() < 768) {
    $('#myCarousel').stackSlides()
}
