/**
 * Created by JeanRemiDelteil on 31/05/2018.
 */


/**
 * Called on sidebar polling
 */
function onPollSidebar() {
  
  var delay = 15 * Math.random() * 1000;
  
  Utilities.sleep(delay);
  
  
  var presentation = SlidesApp.getActivePresentation();
  var currentSlide = presentation.getSelection().getCurrentPage()
                    || presentation.getSlides()[0]
                    || null;
  
  
  return {
    delayUsed: delay,
    slideBackgroundColor: getSlideBackgroundColor(currentSlide)
  }
}




/**
 * Return the current slide background solid color
 * 
 * @param {SlidesApp.Slide} slide
 * 
 * @return {string} color
 */
function getSlideBackgroundColor(slide) {
  return slide.getBackground().getSolidFill().getColor().asRgbColor().asHexString();
}




