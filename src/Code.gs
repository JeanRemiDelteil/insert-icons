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
 * @OnlyCurrentDoc Limits the script to only accessing the current presentation.
 */

/**
 * Create menu item.
 *
 * @param event
 */
function onOpen(event) {
  SlidesApp.getUi().createAddonMenu()
    .addItem('Open sidebar to select icons', 'showSidebar')
    .addToUi();
}

/**
 * Open the Add-on upon install.
 *
 * @param event
 */
function onInstall(event) {
  onOpen(event);
}

/**
 * Insert png image in slide
 *
 * @param {string} blob
 */
function addImageInCurrentPage(blob) {
  /**
   * @type {Blob}
   */
  var imageBlob;
  
  if (!blob){
    imageBlob = UrlFetchApp.fetch("http://fa2png.io/media/icons/font-awesome/4-7-0/rocket/256/0/007dff_none.png").getBlob();
  }
  else {
    blob = blob.replace('data:image/png;base64,', '');
    
    var decodedBlob = Utilities.base64Decode(blob);
    imageBlob = Utilities.newBlob(decodedBlob, "image/png");
  }
  
  var presentation = SlidesApp.getActivePresentation();
  var currentPage = presentation.getSelection().getCurrentPage();
  
  currentPage.insertImage(imageBlob);
  presentation.saveAndClose();
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSidebar() {
  var template = HtmlService.createTemplateFromFile("Sidebar");
  
  // Retrieve list of icons from Material Design website
  // template.iconList = UrlFetchApp.fetch("https://material.io/icons/data/grid.json").getContentText();
  template.iconList = JSON.stringify(fa_icon_list);
  
  var ui = template.evaluate().setTitle('Insert icons');
  SlidesApp.getUi().showSidebar(ui);
}

