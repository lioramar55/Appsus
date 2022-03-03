import notePreview from '../cmps/note-preview.cmp.js'
import noteModal from '../cmps/note-modal.cmp.js'
import { noteService } from '../services/note-service.js'
// import noteAdd from './apps/keep/cmps/note-add.cmp.js'

export default {
  template: `
  <section class="note-app main-layout">
    <!-- <note-add></note-add> -->
    <div v-if="pinnedNotes" class="pinned-notes">
      <h2>Pinned notes:</h2>
      <note-preview  v-for="note in pinnedNotes"
      :note="note"  @edit-note="onEditNote"></note-preview>
    </div>
    <div class="notes">
      <h2>Your notes:</h2>
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
    // noteAdd,
    noteModal,
  },
  methods: {
    onEditNote(action, value, oldNote) {
      let noteToUpdate = JSON.parse(JSON.stringify({ ...oldNote }))
      switch (action) {
        case 'paint':
          noteToUpdate.style = { backgroundColor: value }
          noteService.updateNote(note).then((updatedNote) => {
            let idx = this.notes.findIndex((note) => note.id === updatedNote.id)
            this.notes.splice(idx, 1, updatedNote)
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
      }
    },
  },
  computed: {},
}
