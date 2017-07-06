'use babel';

import CopyLineView from './copy-line-view';
import { CompositeDisposable } from 'atom';

export default {

  copyLineView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.copyLineView = new CopyLineView(state.copyLineViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.copyLineView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'copy-line:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.copyLineView.destroy();
  },

  serialize() {
    return {
      copyLineViewState: this.copyLineView.serialize()
    };
  },

  toggle() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let row = editor.getCursorBufferPosition().row - 1;
      if (row >= 0) {
        let text = editor.lineTextForBufferRow(row);
        editor.insertText(text);
      }
    }
  }

};
