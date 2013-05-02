// editor_plugin_src.js
//
// Copyright 2013, Loxa, http://www.loxa.edu.tw.
//
// Pops up a warning dialog whenever user leaves with modified content.

(function(tinymce) {
  // This plugin pops up a warning dialog whenever user leaves with non-empty
  // content.
  //
  // @class tinymce.plugins.LoxaMail
  tinymce.create('tinymce.plugins.LoxaMail', {
    // Initializes the plugin, this will be executed after the plugin has been
    // created. This call is done before the editor instance has finished it's
    // initialization so use the onInit event of the editor instance to
    // intercept that event.
    //
    // @method init
    // @param {tinymce.Editor} editor that the plugin is initialized in.
    // @param {string} url to where the plugin is located.
    init: function(editor, url) {
      // Add ask before unload dialog only add one unload handler.
      if (!this['static']._beforeUnloadHandlerAdded) {
        window.onbeforeunload = function(aEvent) {
          var msg = null;
          var _this = tinymce.plugins.LoxaMail;
          if (_this._beforeUnloadHandlerEnabled) {
            tinymce.each(tinyMCE.editors, function(editor) {
              // Never ask in fullscreen mode.
              if (editor.getParam('fullscreen_is_enabled'))
                return;
              // Setup a return message if the content is not empty.
              if (!msg && editor.getContent())
                msg = editor.getLang('loxamail.unload_msg');
            });
            _this._disableBeforeUnloadHandler();
          }
          return msg;
        };
        this['static']._beforeUnloadHandlerAdded = true;
      }
    },
    'static': {
      _beforeUnloadHandlerAdded: false,
      _beforeUnloadHandlerEnabled: true,
      _disableBeforeUnloadHandler: function() {
        this._beforeUnloadHandlerEnabled = false;
        setTimeout(this._enableBeforeUnloadHandler, 100);
      },
      _enableBeforeUnloadHandler: function() {
        this._beforeUnloadHandlerEnabled = true;
      }
    }
  });

  tinymce.PluginManager.add('loxamail', tinymce.plugins.LoxaMail);
})(tinymce);
