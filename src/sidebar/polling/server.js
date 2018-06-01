/**
 * Created by JeanRemiDelteil on 31/05/2018.
 */


/**
 * Called on sidebar polling
 * 
 * @return {ServerValue.PollRes}
 */
function onPollSidebar() {
  // Init App state
  var app = {};
  
  app.presentation = SlidesApp.getActivePresentation();
  app.currentSlide = app.presentation.getSelection().getCurrentPage()
                    || app.presentation.getSlides()[0]
                    || null;
  
  
  // Poll results
  return {
    backgroundColor: getSlideBackgroundColor(app.currentSlide)
  }
}

/**
 * @typedef {{}} ServerValue.PollRes
 * 
 * @property {string} backgroundColor
 */




/**
 * Return the current slide background solid color
 * 
 * @param {SlidesApp.Slide} slide
 * 
 * @return {string} color
 */
function getSlideBackgroundColor(slide) {
  var background = slide.getBackground();
  
  // Can we get a color ?
  if (background.getType() !== SlidesApp.PageBackgroundType.SOLID) return '';
  
  var color = background.getSolidFill().getColor();
  if (color.getColorType() === SlidesApp.ColorType.UNSUPPORTED) return '';
  
  // If it's a theme color, retrieve the color used
  color.getColorType() === SlidesApp.ColorType.THEME && (color = slide.getColorScheme().getConcreteColor(color.asThemeColor().getThemeColorType()));
  
  return color.asRgbColor().asHexString();
}




