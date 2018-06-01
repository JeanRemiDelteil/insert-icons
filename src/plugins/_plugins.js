
// noinspection ThisExpressionReferencesGlobalObjectJS
var Plugins = this.Plugins || {_list: {}};


/**
 * get relevant plugin instance
 *
 * @param {*} [env]
 *
 * @return {App}
 */
Plugins.get = function (env) {
  if (!this._current){
    var info = this.getFileType(true);
    
    this._current = new Plugins._list[info.type || Plugins.FileType.SLIDE](info.activeFile);
  }
  
  this._current.env = env;
  return this._current;
};

/**
 * Get the current Google File type
 *
 * @param {boolean} [getActiveFile]
 *
 * @return {Plugins.FileType || {type: Plugins.FileType, activeFile: *}}
 */
Plugins.getFileType = function(getActiveFile){
  if (this._current) {
    return getActiveFile
           ? { type: this._current.type, activeFile: this._current.getActiveFile()}
           : this._current.type
  }
  
  var filesDetection = [
    {
      type: Plugins.FileType.SLIDE,
      getActive: SlidesApp.getActivePresentation
    },
    {
      type: Plugins.FileType.DOC,
      getActive: DocumentApp.getActiveDocument
    },
    {
      type: Plugins.FileType.SHEET,
      getActive: SpreadsheetApp.getActiveSpreadsheet
    },
    {
      type: Plugins.FileType.FORM,
      getActive: FormApp.getActiveForm
    }
  ];
  
  for (var i = 0; i < filesDetection.length; i++) {
    if (filesDetection[i].type !== Plugins.FileType.current) continue;
    
    try {
      var file = filesDetection[i].getActive();
      if (!file) continue;
      
      return getActiveFile
             ? { type: filesDetection[i].type, activeFile: file}
             : filesDetection[i].type
    }
    catch (e) {}
  }
  
  return getActiveFile
         ? { type: Plugins.FileType.UNKNOWN, activeFile: null}
         : Plugins.FileType.UNKNOWN;
};


/**
 * @enum {string} Plugins.FileType
 */
Plugins.FileType = {
  DOC: 'Doc',
  SHEET: 'Sheet',
  SLIDE: 'Slide',
  FORM: 'Form',
  
  UNKNOWN: '',
  current: '/* @echo fileType */'
};


/**
 * @interface App
 *
 * Define App common interface for all file type
 */

/**
 * @function App#addImageToFile
 *
 * Insert the image in file
 *
 * @param {Blob} imageBlob
 * @param {string} [title]
 */
/**
 * @function App#getUi
 *
 * Return an instance of the file user interface
 *
 * @return {Ui}
 */
/**
 * @function App#getBackgroundColor
 * 
 * Return a background color relevant to currently selected element in file
 *
 * @return {string} color
 */

/**
 * @property {{}} App#sidebarConfig
 *
 * @property {string} themeColor
 */
/**
 * @property {string} App#sidebarConfig.themeColor
 */
/**
 * @property {number} App#sidebarConfig.maximumInsertSize
 */

/**
 * @property {Plugins.FileType} App#type
 */
