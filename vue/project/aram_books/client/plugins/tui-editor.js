import Vue from 'vue'
import { Editor } from '@toast-ui/vue-editor'
import Viewer from '@toast-ui/vue-editor/src/Viewer.vue'
// import Viewer from '@toast-ui/vue-editor/src/Viewer.vue'

// for common
import 'tui-editor/dist/tui-editor-contents.css'
// for viewer
import 'highlight.js/styles/github.css'
// for editor
import 'tui-editor/dist/tui-editor.css'
import 'codemirror/lib/codemirror.css'

Vue.component(Editor.name, Editor) // <TuiEditor />
Vue.component(Viewer.name, Viewer) // <TuiEditorViewer />
