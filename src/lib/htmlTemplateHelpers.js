
// noinspection JSUnusedGlobalSymbols
/**
 * Insert the given client script in the HTML template
 *
 * @param {string} fileName
 * @private
 */
function _insertScript_(fileName) {
  var content = HtmlService
    .createTemplateFromFile(fileName)
    .getRawContent()
    .replace(/^\/\/<script>/, '');
  
  return HtmlService
    .createTemplate('<script>'+ content +'</script>')
    .evaluate()
    .getContent();
}

// noinspection JSUnusedGlobalSymbols
/**
 * Insert the given client styleSheet in the HTML template
 *
 * @param {string} fileName
 * @private
 */
function _insertStyle_(fileName) {
  var content = HtmlService
    .createTemplateFromFile(fileName)
    .getRawContent()
    .replace(/^\/\*<style>\*\/\/\*\*\//, '');
  
  return HtmlService
    .createTemplate('<style>'+ content +'</style>')
    .evaluate()
    .getContent();
}
