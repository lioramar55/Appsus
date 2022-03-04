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
      :note="note"  
      @edit-note="onEditNote"
      @open-edit-note="openNoteModal"></note-preview>
    </div>
    <h2>Your notes:</h2>
    <div class="notes">
      <note-preview v-if="notes" v-for="note in notes"
      :note="note"
      @open-edit-note="openNoteModal"  
      @edit-note="onEditNote"></note-preview>
    </div>
    <note-modal v-if="isModalOpen" 
     @save-and-close='saveNote' :note="selectedNote"></note-modal>
  </section>
  `,
  data() {
    return {
      isModalOpen: false,
      selectedNote: null,
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
    openNoteModal(note) {
      this.isModalOpen = true
      this.selectedNote = JSON.parse(JSON.stringify(note))
    },
    addNewNote(newNote) {
      noteService.postNote({ ...newNote }).then(this.updateNotes)
    },
    updateNotes() {
      noteService.query().then((notes) => {
        this.pinnedNotes = notes.filter((note) => note.isPinned)
        this.notes = notes.filter((note) => !note.isPinned)
      })
    },
    saveNote(newNote, oldNote) {
      this.isModalOpen = !this.isModalOpen
      let savedNote = JSON.parse(JSON.stringify(oldNote))
      savedNote.info.txt = newNote.txt
      savedNote.info.title = newNote.title
      noteService.updateNote(savedNote).then(this.updateNotes)
    },
    onEditNote(action, value, oldNote) {
      let noteToUpdate = JSON.parse(JSON.stringify(oldNote))
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
          noteService
            .updateNote(noteToUpdate)
            .then(() => noteService.query().then(this.updateNotes))
          break
        case 'delete':
          noteService.removeTodo(noteToUpdate.id).then(this.updateNotes)
          break
        case 'toggle-todo':
          let todos = noteToUpdate.info.todos
          let idx = todos.findIndex((todo) => todo.txt === value)
          todos[idx].doneAt = todos[idx].doneAt ? null : Date.now()
          noteService.updateNote(noteToUpdate).then(this.updateNotes)
          break
        case 'duplicate':
          noteToUpdate.isPinned = false
          noteService.postNote(noteToUpdate).then(this.updateNotes)
          break
        case 'export':
          console.log('onExport')
          break
        case 'edit':
          this.selectedNote = noteToUpdate
          this.isModalOpen = true
          break
      }
    },
  },
}
