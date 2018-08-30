/**
 * Created by JeanRemiDelteil on 01/06/2018.
 */
/**/

// noinspection ThisExpressionReferencesGlobalObjectJS
var Plugins = this.Plugins || {_list: {}};

(function () {
  
  // noinspection JSClosureCompilerSyntax
  /**
   * Create a new plugin instance for Slides
   *
   * @param {SlidesApp.Presentation} file
   *
   * @class
   * @implements {App}
   */
  var Slide = function (file) {
    // noinspection JSUnusedGlobalSymbols
    this.env = {};
    
    this._activeFile = file || null;
    this.type = Plugins.FileType.SLIDE;
    
    // noinspection JSUnusedGlobalSymbols
    this.sidebarConfig = {
      themeColor: '#f3b32a',
      maximumInsertSize: 512
    };
  };
  
  
  //<editor-fold desc="Interface">
  
  // noinspection JSUnusedLocalSymbols, JSUnusedGlobalSymbols
  /**
   * Insert the image in Slide
   *
   * @param {Blob} imageBlob
   * @param {string} [title]
   */
  Slide.prototype.addImageToFile = function (imageBlob, title) {
    var presentation = this.getActiveFile();
    var currentPage = presentation.getSelection().getCurrentPage()
                      || presentation.getSlides()[0]
                      || presentation.appendSlide();
    
    if (!currentPage) throw "No pages in current presentation";
    
    var insertedImage = currentPage.insertImage(imageBlob);
    // No option to set a title on an Image in Slide
    
    // Limit inserted image size to 300px max at insertion time
    var maxSize = 300,
      width = insertedImage.getWidth(),
      height = insertedImage.getHeight(),
      ratio = width / height;
    
    if (ratio > 1) {
      width = maxSize;
      height = maxSize / ratio;
    }
    else {
      width = maxSize * ratio;
      height = maxSize;
    }
    
    insertedImage.setWidth(width);
    insertedImage.setHeight(height);
    
    presentation.saveAndClose();
  };
  
  // noinspection JSUnusedGlobalSymbols
  /**
   * Return the current slide background solid color if it exists
   *
   * @return {string} color
   */
  Slide.prototype.getBackgroundColor = function () {
    var presentation = this.getActiveFile();
    
    var currentSlide = presentation.getSelection().getCurrentPage()
                       || presentation.getSlides()[0]
                       || null;
    
    return getSlideBackgroundColor(currentSlide);
  };
  
  
  // noinspection JSUnusedGlobalSymbols
  /**
   * Get Ui
   *
   * @return {Ui}
   */
  Slide.prototype.getUi = function () {
    this._ui = this._ui || SlidesApp.getUi();
    
    return this._ui;
  };
  
  //</editor-fold>
  
  
  //<editor-fold desc="Helpers">
  
  /**
   * Get the active Google Slide
   *
   * @return {SlidesApp.Presentation}
   */
  Slide.prototype.getActiveFile = function () {
    var activeFile = this._activeFile || SlidesApp.getActivePresentation();
    this._activeFile = activeFile;
    
    return activeFile;
  };
  
  //</editor-fold>
  
  //<editor-fold desc="# Private">
  
  /**
   * Return the current slide background solid color
   *
   * @param {SlidesApp.Slide} slide
   *
   * @return {string} color
   */
  function getSlideBackgroundColor(slide) {
    if (!slide) return '';
    
    var background = slide.getBackground();
    
    // Can we get a color ?
    if (background.getType() !== SlidesApp.PageBackgroundType.SOLID) return '';
    
    var color = background.getSolidFill().getColor();
    if (color.getColorType() === SlidesApp.ColorType.UNSUPPORTED) return '';
    
    // If it's a theme color, retrieve the color used
    color.getColorType() === SlidesApp.ColorType.THEME && (color = slide.getColorScheme().getConcreteColor(color.asThemeColor().getThemeColorType()));
    
    return color.asRgbColor().asHexString();
  }
  
  //</editor-fold>
  
  
  // Export plugin
  Plugins._list['Slide'] = Slide;
  
})();
