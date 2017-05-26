# carousel-slider

### Supported Features
- Multiple carousels on the same page
- AutoSlide, with ability to change the time interval

### Install options
- ```bower install carousel-slider```
- ```npm install --save carousel-slider```
- ```yarn add carousel-slider```
- Place the ```link``` tag in the Head and the ```script``` tag at the bottom of the body:
  * 

### Easy setup
1. Link ```carousel.min.css``` in the Head
2. Place ```carousel.js``` in a script tag at the bottom of the body
3. Copy the HTML code below and insert your content in the carousel-items

### Requirements
- jQuery

### Usage
All of the following HTML is required for each carousel:
```html
<div class="carousel" id="myCarousel">
    <div id="left-btn" class="left-btn">‹</div>
    <div id="right-btn" class="right-btn">›</div>
    <div class="dots">
        <!-- EDIT: the number of dots must match the number of carousel-items -->
        <span data-index="0" class="dot active"></span>
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

### JavaScript Options
Each carousel automatically slides to its next carousl-item every 5 seconds. To change this time, use the ```waitTime()``` function and pass it a number in milliseconds.
```javascript
$('#myCarousel')[0].waitTime(5000)
```
To stop a carousel from automatically sliding, use the following code:
```javascript
$('#myCarousel')[0].stopAutoSlide()
```
