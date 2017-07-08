'use babel';

import {
    CompositeDisposable
} from 'atom';

export default {

    subscriptions: null,

    activate(state) {

      // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
      this.subscriptions = new CompositeDisposable();

      // Register command that toggles this view
      this.subscriptions.add(atom.commands.add('atom-workspace', {
          'copy-line:copy': () => this.copy()
        }));
    },

    deactivate() {
      this.subscriptions.dispose();
    },

    copy() {
      let editor;
      let text;
      if (editor = atom.workspace.getActiveTextEditor()) {
        let curRow = editor.getCursorBufferPosition().row;
        let preRow = curRow - 1;

        if (preRow >= 0) {
          let curLine = editor.lineTextForBufferRow(curRow);
          while ((text = editor.lineTextForBufferRow(preRow)).replace(/ /g, '') === '') {
            preRow--;
          }
          editor.moveToBeginningOfLine();
          editor.insertText(text);

          if (curLine != '' && curLine != undefined) {
            editor.insertText('\n');
          }
        }
      }
    }

  };
