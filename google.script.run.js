/**
 * This file exist to provide auto-completion and linking between Server side code and Client side code in Apps Script
 * 
 * Add all functions callable from client side to the google.script.run prototype
 */


let google = {
	script: {
		run: function () {}
	}
};

// NEVER DO THAT in normal code
// this overwrite the prototype, here we do this of auto-completion only
google.script.run.prototype = {
  onInstall: onInstall,
  onOpen: onOpen,
	
  addImageInCurrentPage: addImageInCurrentPage,
};


/**
 * @param {function} successHandler
 * @return {google.script.run}
 */
google.script.run.withSuccessHandler = function (successHandler) {};
/**
 * @param {function} failureHandler
 * @return {google.script.run}
 */
google.script.run.withFailureHandler = function (failureHandler) {};

google.script.run.prototype.withSuccessHandler = google.script.run.withSuccessHandler;
google.script.run.prototype.withFailureHandler = google.script.run.withFailureHandler;



//<editor-fold desc="# Stubs for Google API">

//<editor-fold desc="# PICKER API">

/**
 * @function google.picker.PickerBuilder
 * @constructor
 *
 * NOTE: API is not completely described
 * see here for full list (https://developers.google.com/picker/docs/reference#PickerBuilder)
 *
 * @return PickerBuilder
 */
/**
 * @function PickerBuilder.prototype.setDeveloperKey
 *
 * @param {string} developerKey
 * @return PickerBuilder
 */
/**
 * @function PickerBuilder.prototype.setOAuthToken
 *
 * @param {string} token
 * @return PickerBuilder
 */
/**
 * @function PickerBuilder.prototype.setOrigin
 *
 * @param {string} origin
 * @return PickerBuilder
 */
/**
 * @function PickerBuilder.prototype.setCallback
 *
 * @param {function} callBack
 * @return PickerBuilder
 */
/**
 * @function PickerBuilder.prototype.setTitle
 *
 * @param {string} title
 * @return PickerBuilder
 */
/**
 * @function PickerBuilder.prototype.setSize
 *
 * @param {number} width
 * @param {number} height
 * @return PickerBuilder
 */
/**
 * @function PickerBuilder.prototype.addView
 *
 * @param {google.picker.View || google.picker.ViewId} view
 * @return PickerBuilder
 */
/**
 * @function PickerBuilder.prototype.enableFeature
 *
 * @param {google.picker.Feature} feature
 * @return PickerBuilder
 */
/**
 * @function PickerBuilder.prototype.hideTitleBar
 *
 * @return {PickerBuilder}
 */
/**
 * @function PickerBuilder.prototype.build
 *
 * @return {Picker}
 */

/**
 * @function google.picker.View
 * @constructor
 *
 * @param {google.picker.ViewId} viewId
 *
 * @return google.picker.View
 */
/**
 * @function google.picker.View.prototype.getId
 * Returns the ViewId for this view.
 *
 * @return {string}
 */
/**
 * @function google.picker.View.prototype.setMimeTypes
 *
 * @param {string} mimeTypes
 */
/**
 * @function google.picker.View.prototype.setQuery
 *
 * @param {string} query
 */


/**
 * @typedef {{}} Picker
 */
/**
 * @function Picker.prototype.setVisible
 *
 * @param {boolean} isVisible
 */
/**
 * @function Picker.prototype.dispose
 */

/**
 * @function google.picker.DocsView
 * @constructor
 *
 * @param {google.picker.ViewId} [viewId]
 *
 * @return DocsView
 */
/**
 * @function DocsView.prototype.setIncludeFolders
 *
 * @param {boolean} includeFolders
 * @return DocsView
 */
/**
 * @function DocsView.prototype.setEnableTeamDrives
 *
 * @param {boolean} enableTeamDrives
 * @return DocsView
 */
/**
 * @function DocsView.prototype.setSelectFolderEnabled
 *
 * @param {boolean} enableSelectFolder
 * @return DocsView
 */
/**
 * @function DocsView.prototype.setMode
 *
 * @param {google.picker.DocsViewMode} mode
 * @return DocsView
 */
/**
 * @function DocsView.prototype.setOwnedByMe
 *
 * @param {boolean} ownedByMe
 * @return DocsView
 */
/**
 * @function DocsView.prototype.setParent
 *
 * @param {string} parent
 * @return DocsView
 */
/**
 * @function DocsView.prototype.setStarred
 *
 * @param {boolean} starred
 * @return DocsView
 */

/**
 * google.picker
 *
 * @typedef {{
 *   Action: {
 *     PICKED,
 *     CANCEL,
 *     LOADED,
 *   },
 *   DocsViewMode: {
 *     GRID,
 *     LIST,
 *   },
 *   ViewId: {
 *     DOCS,
 *     DOCS_IMAGES,
 *     DOCS_IMAGES_AND_VIDEOS,
 *     DOCS_VIDEOS,
 *     DOCUMENTS,
 *     DRAWINGS,
 *     FOLDERS,
 *     FORMS,
 *     IMAGE_SEARCH,
 *     PDFS,
 *     PHOTO_ALBUMS,
 *     PHOTO_UPLOAD,
 *     PHOTOS,
 *     PRESENTATIONS,
 *     RECENTLY_PICKED,
 *     SPREADSHEETS,
 *     VIDEO_SEARCH,
 *     WEBCAM,
 *     YOUTUBE,
 *   },
 *   Feature: {
 *     NAV_HIDDEN,
 *     MINE_ONLY,
 *     MULTISELECT_ENABLED,
 *     SIMPLE_UPLOAD_ENABLED,
 *     SUPPORT_TEAM_DRIVES,
 *   },
 *   Document: {
 *     ADDRESS_LINES,
 *     AUDIENCE,
 *     DESCRIPTION,
 *     DURATION,
 *     EMBEDDABLE_URL,
 *     ICON_URL,
 *     ID,
 *     IS_NEW,
 *     LAST_EDITED_UTC,
 *     LATITUDE,
 *     LONGITUDE,
 *     MIME_TYPE,
 *     NAME,
 *     NUM_CHILDREN,
 *     PARENT_ID,
 *     PHONE_NUMBERS,
 *     SERVICE_ID,
 *     THUMBNAILS,
 *     TYPE,
 *     URL,
 *   },
 *   Response: {
 *     ACTION,
 *     DOCUMENTS,
 *     PARENTS,
 *     VIEW,
 *   }
 * }} google.picker
 */

//</editor-fold>

//</editor-fold>

