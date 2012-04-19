ckeditor-characterscount
========================

CKEditor characters counter plugin

This plugin counts number of characters in total and selected text via click on toolbar button.

You must copy this plugin folder 'characterscounter' to plugins folder (ckeditr/plugins), and enable it in ckeditor/config.js:

CKEDITOR.editorConfig = function( config )
{
  config.extraPlugins = 'characterscounter';
  config.toolbar_Full.push(['CountSelection']);  
};

For enable dynamic characters counter set at the bottom of plugin.js:

// Plugin options
CKEDITOR.config.characterscounter_autocount = true; 