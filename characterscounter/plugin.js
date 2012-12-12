/**
* CKEditor Characters Counter Plugin
*
* Adds a characters count button (total and selected text), also can show dynamic count in the bottom right corner
*
* @package characterscounter
* @author Alexey Murz Korepov
* @version 1.1
* @date 2012-12-12
* @copyright Qseo.ru 2012
*/

/* Changelog 
 * v 1.1
 *  - Added: counting special characters as one symbol
 *  - Added: counting length with and without spaces
 *  - Added: converting several spaces to one
 *  - Added: removing start and end spaces
 *
 * v 1.0 
 *  - initial version
 *
 */


(function() {
    CKEDITOR.plugins.characterscounter = {
    };
//     alert('xxx');
    var plugin = CKEDITOR.plugins.characterscounter;
    
    /**
    * Shows count in the DIV element created via setTimeout()
    * 
    * @param obj CKEditor Editor Object
    */
    function ShowCharactersCount(evt) {
        var editor = evt.editor;
        if ($('div#cke_characterscount_'+editor.name).length > 0) { // Check element exists
            // Because CKEditor uses Javascript to load parts of the editor, some of its elements are not immediately available in the DOM
            // Therefore, I use setTimeout.  There may be a better way of doing this.
            setTimeout(function() {
                $('div#cke_characterscount_'+editor.name).html('Characters count: '+GetCharactersCount(editor.getData())); 
            }, 100);
        }
    }
    
    /**
    * Takes the given HTML data, replaces all its HTML tags with nothing, splits the result by spaces, 
    * and outputs the array length i.e. number of words.
    * 
    * @param string htmlData HTML Data
    * @return int Count
    * 
    * $type:
    *  all - count all symbols
    *  text - count all characters without html tags
    *  cleantext - count all characters without html tags and several continious spaces joined to one
    *  char - count only characters without spaces and html tags
    */
    function GetCharactersCount(text,type='all') {
      switch (type) {
        case 'char':
          text=text.replace(/<(?:.|\s)*?>/g, '');   // removing html tags
          text=text.replace(/\&[\w\#]+;/g, '&');     // converting special characters to one symbol
          text=text.replace(/[\s\n]/g,'');          // removing all spaces
          break;
        case 'text':
          text=text.replace(/<(?:.|\s)*?>/g, '');   // removing html tags
          text=text.replace(/\&[\w\#]+;/g, '&');     // converting special characters to one symbol
          text=text.replace(/^\s+/g,'');            // removing start spaces
          text=text.replace(/\s+$/g,'');            // removing end spaces
          break;
        case 'cleantext':
          text=text.replace(/<(?:.|\s)*?>/g, '');   // removing html tags
          text=text.replace(/\&nbsp\;/g, ' ');      // converting &nbsp; to one symbol
          text=text.replace(/\&[\w\#]+;/g, '&');     // converting special characters to one symbol
          text=text.replace(/\s+/g,' ');            // converting several spaces to one
          text=text.replace(/^\s+/g,'');            // removing start spaces
          text=text.replace(/\s+$/g,'');            // removing end spaces
          break;
        case 'all':
        default: 
          break;
      }
      return text.length;    
    }
   
    /**
    * Adds the plugin to CKEditor
    */
    CKEDITOR.plugins.add('characterscounter', {
        init: function(editor) {
            if(CKEDITOR.config.characterscounter_autocount) {
              setTimeout(function() {
                $('td#cke_bottom_'+editor.name).append('<div id="cke_characterscount_'+editor.name+'" style="display: inline-block; float: right; text-align: right; margin-top: 5px; white-space:nowrap; width:auto;">Characters count: '+GetCharactersCount(editor.getData())+'</div>');
              }, 4000);
                                                                                                                          
              editor.on('key', ShowCharactersCount);
            }
//             editor.on('insertText', ShowCharactersCount);
            editor.ui.addButton( 'CountSelection',
              {
                label : 'Count selection',
                command : 'countselection',
                icon : this.path + 'images/button.png'
            });
            editor.addCommand( 'countselection',
            {
                exec : function( editor )
                {
                    alert("Total length:\ntext "+GetCharactersCount(editor.getData(),'cleantext')+"\nchar "+GetCharactersCount(editor.getData(),'char')+"\n\nSelected length:\ntext "+GetCharactersCount(editor.getSelection().getSelectedText(),'cleantext')+" \nchar "+GetCharactersCount(editor.getSelection().getSelectedText()),'char');
                },
                canUndo : false    // No support for undo/redo
            });
          }
    });
    
})();

// Plugin options
CKEDITOR.config.characterscounter_autocount = true; 