/**
 * Created by JeanRemiDelteil on 01/06/2018.
 */
/**/

// noinspection ThisExpressionReferencesGlobalObjectJS
var Plugins = this.Plugins || {_list: {}};

(function () {
  
  // noinspection JSClosureCompilerSyntax
  /**
   * Create a new plugin instance for Docs
   *
   * @param {DocumentApp.Document} file
   *
   * @class
   * @implements {App}
   */
  var Doc = function (file) {
    // noinspection JSUnusedGlobalSymbols
    this.env = {};
    
    this._activeFile = file || null;
    this.type = Plugins.FileType.DOC;
    
    // noinspection JSUnusedGlobalSymbols
    this.sidebarConfig = {
      themeColor: '#4285f4',
      maximumInsertSize: 256
    };
  };
  
  
  //<editor-fold desc="Interface">
  
  // noinspection JSUnusedGlobalSymbols
  /**
   * Insert the image in Doc
   *
   * @param {Blob | BlobSource} imageBlob
   * @param {string} [title]
   */
  Doc.prototype.addImageToFile = function (imageBlob, title) {
    var doc = this.getActiveFile();
    
    var cursor = doc.getCursor();
    
    /**
     * @type {DocumentApp.InlineImage}
     */
    var insertedImage;
    
    // Maybe user is currently selecting another images, and there is no valid cursor
    if (cursor) {
      insertedImage = cursor.insertInlineImage(imageBlob);
    }
    
    // insertedImage === null if we don't have insertion right here
    if (!insertedImage) {
      // Fallback to append to the body
      insertedImage = doc.getBody().appendImage(imageBlob);
    }
    
    // Limit inserted image size to 100px max at insertion time
    var maxSize = 100,
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
    
    // Set title if provided
    title && insertedImage.setAltTitle(title);
  };
  
  // noinspection JSUnusedGlobalSymbols
  /**
   * Return the color of the current Doc surrounding text
   * TODO: improve color detection by taking table cells in account
   *
   * @return {string} color
   */
  Doc.prototype.getBackgroundColor = function () {
    var cursor = this.getActiveFile().getCursor();
    if (cursor) {
      var color = cursor.getSurroundingText().getBackgroundColor();
      if (color === '#ffffff') color = '';
    }
    
    return color || '';
  };
  
  
  // noinspection JSUnusedGlobalSymbols
  /**
   * Get Ui
   *
   * @return {Ui}
   */
  Doc.prototype.getUi = function () {
    return DocumentApp.getUi();
  };
  
  //</editor-fold>
  
  
  //<editor-fold desc="Helpers">
  
  /**
   * Get the active Google Document
   *
   * @return {DocumentApp.Document}
   */
  Doc.prototype.getActiveFile = function () {
    var activeFile = this._activeFile || DocumentApp.getActiveDocument();
    this._activeFile = activeFile;
    
    return activeFile;
  };
  
  //</editor-fold>
  
  
  // Export plugin
  Plugins._list['Doc'] = Doc;
  
})();
