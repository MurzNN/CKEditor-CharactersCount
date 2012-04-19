/**
* CKEditor Characters Counter Plugin
*
* Adds a characters count button (total and selected text), also can show dynamic count in the bottom right corner
*
* @package characterscounter
* @author Alexey Murz Korepov
* @version 1
* @copyright Qseo.ru 2012
*/
(function() {
    CKEDITOR.plugins.characterscounter = {
    };
    
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
    */
    function GetCharactersCount(htmlData) {
        return htmlData.replace(/<(?:.|\s)*?>/g, '').length;    
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
                    alert('Characters total: '+GetCharactersCount(editor.getData())+"\nSelected: "+GetCharactersCount(editor.getSelection().getSelectedText()));
                },
                canUndo : false    // No support for undo/redo
            });
          }
    });
    
})();

// Plugin options
CKEDITOR.config.characterscounter_autocount = false; 