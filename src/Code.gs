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
  
  // Retrieve list of icons
  template.iconList_FA = JSON.stringify(icon_list_fa);
  template.iconList_MD = JSON.stringify(icon_list_md);
  
  // Configuration depending on doc type, default to 'slide', in case document type determination failed (maybe when just created ?)
  var config = ({
    slide: {
      themeColor: '#f3b32a',
      maximumInsertSize: 512
    },
    doc: {
      themeColor: '#4285f4',
      maximumInsertSize: 256
    }
  })[getDocType() || 'slide'];
  
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
 * @param {string} [title]
 */
function addImageInCurrentPage(blob, title) {
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
      addImageToSlide(imageBlob, title);
      break;
      
    case 'doc':
      addImageToDoc(imageBlob, title);
      break;
      
    default:
      // Document type can not be determined for whatever reasons, for now the error text is not displayed to the users
      throw 'A server error occured, please reload the sidebar and try again.'
      
  }
}

/**
 * Insert the image in Slide
 * 
 * @param {Blob} imageBlob
 * @param {string} [title]
 */
function addImageToSlide(imageBlob, title) {
  var presentation = SlidesApp.getActivePresentation();
  var currentPage = presentation.getSelection().getCurrentPage();
  
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
}

/**
 * Insert the image in Doc
 *
 * @param {Blob | BlobSource} imageBlob
 * @param {string} [title]
 */
function addImageToDoc(imageBlob, title) {
  var doc = DocumentApp.getActiveDocument();
  
  var cursor = doc.getCursor();
  
  /**
   * @type {DocumentApp.InlineImage}
   */
  var insertedImage;
  
  // Maybe user is currently selecting another images, and there is no valid cursor
  if (cursor){
    insertedImage = cursor.insertInlineImage(imageBlob);
  }
  
  // insertedImage === null if we don't have insertion right here
  if (!insertedImage){
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
