/**
 * Created by JeanRemiDelteil on 08/06/2018.
 *//**/

// noinspection ThisExpressionReferencesGlobalObjectJS
var Plugins = this.Plugins || {_list: {}};

(function() {
  
  // noinspection JSClosureCompilerSyntax
  /**
   * Create a new plugin instance for Sheets
   *
   * @param {SpreadsheetApp.Spreadsheet} file
   *
   * @class
   * @implements {App}
   */
  var Sheet = function (file) {
    // noinspection JSUnusedGlobalSymbols
    this.env = {};
    
    this._activeFile = file || null;
    this.type = Plugins.FileType.SHEET;
    
    // noinspection JSUnusedGlobalSymbols
    this.sidebarConfig = {
      themeColor: '#1ea362',
      maximumInsertSize: 256
    };
  };
  
  
  //<editor-fold desc="Interface">
  
  // noinspection JSUnusedGlobalSymbols
  /**
   * Insert the image in Sheet
   *
   * @param {Blob | BlobSource} imageBlob
   * @param {string} [title]
   */
  Sheet.prototype.addImageToFile = function(imageBlob, title) {
    var sheet = this.getActiveFile().getActiveSheet();
    var cell = sheet.getActiveCell();
    
    sheet.insertImage(imageBlob, cell.getColumn(), cell.getRow());
  };
  
  // noinspection JSUnusedGlobalSymbols
  /**
   * Return the color of the current Sheet cell
   *
   * @return {string} color
   */
  Sheet.prototype.getBackgroundColor = function() {
    var cell = this.getActiveFile()
      .getActiveSheet()
      .getActiveCell();
    
    var color = cell.getBackground();
    if (color === '#ffffff') color = '';
    
    return color || '';
  };
  
  
  // noinspection JSUnusedGlobalSymbols
  /**
   * Get Ui
   *
   * @return {Ui}
   */
  Sheet.prototype.getUi = function() {
    return SpreadsheetApp.getUi();
  };
  
  //</editor-fold>
  
  
  //<editor-fold desc="Helpers">
  
  /**
   * Get the active Google Document
   *
   * @return {SpreadsheetApp.Spreadsheet}
   */
  Sheet.prototype.getActiveFile = function() {
    var activeFile = this._activeFile || SpreadsheetApp.getActiveSpreadsheet();
    this._activeFile = activeFile;
    
    return activeFile;
  };
  
  //</editor-fold>
  
  
  
  // Export plugin
  Plugins._list['Sheet'] = Sheet;
  
})();
