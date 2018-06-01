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
  app = Plugins.get();
  
  
  // Poll results
  return {
    backgroundColor: app.getBackgroundColor()
  }
}

/**
 * @typedef {{}} ServerValue.PollRes
 * 
 * @property {string} backgroundColor
 */
