import notePreview from '../cmps/note-preview.cmp.js'
import noteModal from '../cmps/note-modal.cmp.js'
import { noteService } from '../services/note-service.js'
import noteAdd from '../cmps/note-add.cmp.js'

export default {
  template: `
  <section class="note-app main-layout">
    <note-add @add-note="addNewNote"></note-add>
    <h2>Pinned notes:</h2>
    <div v-if="pinnedNotes" class="pinned-notes">
      <note-preview  v-for="note in pinnedNotes"
      :note="note"  @edit-note="onEditNote"></note-preview>
    </div>
    <h2>Your notes:</h2>
    <div class="notes">
      <note-preview v-if="notes" v-for="note in notes"
      :note="note"  @edit-note="onEditNote"></note-preview>
    </div>
    <note-modal v-if="isModalOpen"></note-modal>
  </section>
  `,
  data() {
    return {
      isModalOpen: false,
      notes: null,
      pinnedNotes: null,
    }
  },
  created() {
    noteService.query().then((notes) => {
      this.pinnedNotes = notes.filter((note) => note.isPinned)
      this.notes = notes.filter((note) => !note.isPinned)
    })
  },
  components: {
    notePreview,
    noteAdd,
    noteModal,
  },
  methods: {
    addNewNote(newNote) {
      noteService.postNote({ ...newNote }).then(
        noteService.query().then((notes) => {
          this.notes = notes
        })
      )
    },
    onEditNote(action, value, oldNote) {
      let noteToUpdate = JSON.parse(JSON.stringify({ ...oldNote }))
      switch (action) {
        case 'paint':
          noteToUpdate.style = { backgroundColor: value }
          noteService.updateNote(noteToUpdate).then((updatedNote) => {
            let idx = this.notes.findIndex((note) => note.id === updatedNote.id)
            if (idx === -1) {
              idx = this.pinnedNotes.findIndex((note) => note.id === updatedNote.id)
              this.pinnedNotes.splice(idx, 1, updatedNote)
            } else this.notes.splice(idx, 1, updatedNote)
          })
          break
        case 'pinned':
          noteToUpdate.isPinned = !noteToUpdate.isPinned
          noteService.updateNote(noteToUpdate).then(() =>
            noteService.query().then((notes) => {
              this.pinnedNotes = notes.filter((note) => note.isPinned)
              this.notes = notes.filter((note) => !note.isPinned)
            })
          )
          break
        case 'delete':
          noteService.removeTodo(noteToUpdate.id).then(() => {
            noteService.query().then((notes) => {
              this.pinnedNotes = notes.filter((note) => note.isPinned)
              this.notes = notes.filter((note) => !note.isPinned)
            })
          })
      }
    },
  },
  computed: {},
}
