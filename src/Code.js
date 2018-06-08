/**
 * We can use either web fonts or svg
 * The new version of Font Awesome is based on svg
 * fa2png.io lets you download old Font Awesome web fonts in png
 * You can define size, color,...
 * eg: http://fa2png.io/media/icons/font-awesome/4-7-0/rocket/256/0/007dff_none.png
 * https://image.flaticon.com/icons/png/512/60/60993.png
 * List of Material icons: https://material.io/icons/data/grid.json
 */

/**
 * @OnlyCurrentDoc Limits the script to only accessing the current Presentation or Document.
 */

/**
 * Globally define 'app' to be able to use it everywhere once populated
 *
 * @type {App}
 */
var app;


/**
 * Create menu item.
 *
 * @param event
 *
 * @entryPoint
 */
function onOpen(event) {
  app = Plugins.get();
  
  app.getUi()
    .createAddonMenu()
    .addItem('Open sidebar to select icons', 'showSidebar')
    .addToUi();
}

/**
 * Open the Add-on upon install.
 *
 * @param event
 *
 * @entryPoint
 */
function onInstall(event) {
  onOpen(event);
}


/**
 * Opens a sidebar in the document containing the add-on's user interface.
 * 
 * @entryPoint
 */
function showSidebar() {
  app = Plugins.get();
  
  var template = HtmlService.createTemplateFromFile('sidebar/index');
  
  // Print list of icons
  template.iconList = JSON.stringify(IconLists);
  
  // Apply config to template
  for (var key in app.sidebarConfig){
    template[key] = app.sidebarConfig[key];
  }
  
  // Display sidebar
  var sidebarUi = template.evaluate().setTitle('Insert icons');
  app.getUi().showSidebar(sidebarUi);
}


/**
 * Insert png image in slide
 *
 * @param {string} blob
 * @param {string} [title]
 * 
 * @entryPoint
 */
function addImageInCurrentPage(blob, title) {
  app = Plugins.get();
  
  
  blob = blob.replace('data:image/png;base64,', '');
  var decodedBlob = Utilities.base64Decode(blob);
  
  /**
   * @type {Blob}
   * 
   * Note: Spreadsheet insert image fails if there are no title in the blob
   */
  var imageBlob = Utilities.newBlob(decodedBlob, 'image/png', title);
  
  
  app.addImageToFile(imageBlob, title);
}

/**
 * @namespace ServerValue
 *
 * Define namespace for all server returned values
 */

