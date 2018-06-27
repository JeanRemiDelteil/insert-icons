/**
 * Created by JeanRemiDelteil on 31/05/2018.
 */


/**
 * Called on sidebar polling
 * 
 * @return {ServerValue.PollRes}
 * @entryPoint
 */
function onPollSidebar() {
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
