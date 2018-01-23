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
 * Create menu item.
 *
 * @param event
 */
function onOpen(event) {
  getUi().createAddonMenu()
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
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSidebar() {
  var template = HtmlService.createTemplateFromFile("Sidebar");
  
  // Retrieve list of icons from Material Design website
  // template.iconList = UrlFetchApp.fetch("https://material.io/icons/data/grid.json").getContentText();
  template.iconList_FA = JSON.stringify(icon_list_fa);
  template.iconList_MD = JSON.stringify(icon_list_md);
  
  // Configuration depending on doc type
  var config = ({
    slide: {
      themeColor: '#f3b32a',
      maximumInsertSize: 512
    },
    doc: {
      themeColor: '#4285f4',
      maximumInsertSize: 256
    }
  })[getDocType()];
  
  // Apply config to template
  for (var key in config){
    template[key] = config[key];
  }
  
  // Display sidebar
  var ui = template.evaluate().setTitle('Insert icons');
  getUi().showSidebar(ui);
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
  
  switch (getDocType()){
    case 'slide':
      addImageToSlide(imageBlob);
      break;
      
    case 'doc':
      addImageToDoc(imageBlob);
      break;
  }
}

/**
 * Insert the image in Slide
 * 
 * @param {Blob} imageBlob
 */
function addImageToSlide(imageBlob) {
  var presentation = SlidesApp.getActivePresentation();
  var currentPage = presentation.getSelection().getCurrentPage();
  
  currentPage.insertImage(imageBlob);
  presentation.saveAndClose();
}

/**
 * Insert the image in Doc
 * 
 * @param {Blob | BlobSource} imageBlob
 */
function addImageToDoc(imageBlob) {
  var doc = DocumentApp.getActiveDocument();
  
  var cursor = doc.getCursor();
  
  // Maybe user is currently selecting another images, and there is no valid cursor
  if (cursor){
    var res = cursor.insertInlineImage(imageBlob);
    
    // res === null if we don't have insertion right here
    if (res) return;
  }
  
  // Fallback to append to the body
  doc.getBody().appendImage(imageBlob);
}



/**
 * Get Ui independent of container being a Slide or a Doc
 * 
 * @return {Ui}
 */
function getUi(){
  var ui;
  
  // Are we on Slide?
  try{ ui = SlidesApp.getUi() }
  catch(e){}
  
  if (!ui){
    // Are we on Doc?
    try{ ui = DocumentApp.getUi() }
    catch(e){}
  }
  
  return ui;
}

/**
 * Get the current Google Document type ('doc' or 'slide')
 * 
 * @return {'doc' | 'slide'}
 */
function getDocType(){
  // Are we on Slide?
  try{
    if (SlidesApp.getActivePresentation()) return 'slide';
  }
  catch(e){}
  
  // Are we on Doc?
  try{
    if (DocumentApp.getActiveDocument()) return 'doc';
  }
  catch(e){}
  
  return '';
}