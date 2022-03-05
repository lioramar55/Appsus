import { noteService } from '../services/note-service.js'
import { eventBus } from '../../../services/eventBus-service.js'
import notePreview from '../cmps/note-preview.cmp.js'
import noteModal from '../cmps/note-modal.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'

export default {
  template: `
  <section class="note-app main-layout">
    <note-add @add-note="addNewNote"></note-add>
    <note-filter @set-filter="onSetFilter"></note-filter>
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
      :key="note.id"
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
      filterBy: {
        type: 'all',
        txt: '',
      },
    }
  },
  created() {
    noteService.query().then((notes) => {
      this.pinnedNotes = notes.filter((note) => note.isPinned)
      this.notes = notes.filter((note) => !note.isPinned)
    })
  },
  mounted() {
    interact('.note-preview')
      .draggable({
        onmove: this.onMove,
      })
      .dropzone({
        accept: '.note-preview',
        overlap: 0.8,
        checker: (
          dragEvent, // related dragmove or dragend
          event, // Touch, Pointer or Mouse Event
          dropped, // bool default checker result
          dropzone, // dropzone Interactable
          dropzoneElement, // dropzone element
          draggable, // draggable Interactable
          draggableElement // draggable element
        ) => {
          let dragId = draggableElement.classList.value.split(' ')[1]
          let dropId = dropzoneElement.classList.value.split(' ')[1]
          if (dropzone && dropped) {
            this.swapElements(dragId, dropId)
          }
        },
      })
  },
  components: {
    notePreview,
    noteAdd,
    noteFilter,
    noteModal,
  },
  methods: {
    swapElements(firstId, secondId) {
      let firstNote = null
      let secondNote = null
      noteService
        .getNoteById(firstId)
        .then((note) => (firstNote = note))
        .then(noteService.getNoteById(secondId).then((note) => (secondNote = note)))
        .then(() => {
          let firstIdx = this.notes.findIndex((note) => note.id === firstId)
          let secondIdx = this.notes.findIndex((note) => note.id === secondId)
          this.notes.splice(firstIdx, 1, secondNote)
          this.notes.splice(secondIdx, 1, firstNote)
        })
    },
    onMove(event) {
      const target = event.target
      const pos = { x: target.getAttribute('data-x'), y: target.getAttribute('data-y') }
      const startPos = { x: parseFloat(pos.x) || 0, y: parseFloat(pos.y) || 0 }
      const deltaPos = { x: event.dx, y: event.dy }
      const newX = startPos.x + deltaPos.x
      const newY = startPos.y + deltaPos.y
      target.style.transform = `translate(${newX}px, ${newY}px)`

      target.setAttribute('data-x', newX)
      target.setAttribute('data-y', newY)
    },
    onSetFilter(filterBy, value) {
      if (filterBy === 'type') {
        if (value === 'all') {
          this.updateNotes()
        } else {
          noteService.query().then((notes) => {
            this.notes = notes.filter((note) => note.type === value && !note.isPinned)
            this.pinnedNotes = this.pinnedNotes.filter(
              (note) => (note.type === value) & note.isPinned
            )
          })
        }
      } else {
        if (value) {
          const regex = new RegExp(value, 'i')
          noteService.query().then((notes) => {
            this.notes = notes.filter(
              (note) =>
                (regex.test(note.info.txt) ||
                  regex.test(note.info.title) ||
                  regex.test(note.info.label)) &&
                !note.isPinned
            )
            this.pinnedNotes = notes.filter(
              (note) =>
                (regex.test(note.info.txt) ||
                  regex.test(note.info.title) ||
                  regex.test(note.info.label)) & note.isPinned
            )
          })
        } else {
          this.updateNotes()
        }
      }
    },
    openNoteModal(note) {
      this.isModalOpen = true
      this.selectedNote = JSON.parse(JSON.stringify(note))
    },
    addNewNote(newNote) {
      noteService
        .postNote({ ...newNote })
        .then(this.updateNotes)
        .then(eventBus.emit('show-msg', { txt: 'Note added', type: 'success' }))
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
      noteService
        .updateNote(savedNote)
        .then(this.updateNotes)
        .then(eventBus.emit('show-msg', { txt: 'Note saved', type: 'success' }))
    },
    onEditNote(action, value, oldNote) {
      let noteToUpdate = JSON.parse(JSON.stringify(oldNote))
      switch (action) {
        case 'paint':
          noteToUpdate.style = { backgroundColor: value }
          noteService
            .updateNote(noteToUpdate)
            .then((updatedNote) => {
              let idx = this.notes.findIndex((note) => note.id === updatedNote.id)
              if (idx === -1) {
                idx = this.pinnedNotes.findIndex((note) => note.id === updatedNote.id)
                this.pinnedNotes.splice(idx, 1, updatedNote)
              } else this.notes.splice(idx, 1, updatedNote)
            })
            .then(eventBus.emit('show-msg', { txt: 'Color changed', type: 'success' }))
          break
        case 'pinned':
          noteToUpdate.isPinned = !noteToUpdate.isPinned
          noteService
            .updateNote(noteToUpdate)
            .then(() => noteService.query().then(this.updateNotes))
            .then(eventBus.emit('show-msg', { txt: 'Note pinned', type: 'success' }))
          break
        case 'delete':
          noteService.removeTodo(noteToUpdate.id).then(this.updateNotes)
          eventBus.emit('show-msg', { txt: 'Note removed', type: 'remove' })
          break
        case 'toggle-todo':
          let todos = noteToUpdate.info.todos
          let idx = todos.findIndex((todo) => todo.txt === value)
          todos[idx].doneAt = todos[idx].doneAt ? null : Date.now()
          noteService.updateNote(noteToUpdate).then(this.updateNotes)
          break
        case 'duplicate':
          noteToUpdate.isPinned = false
          noteService
            .postNote(noteToUpdate)
            .then(this.updateNotes)
            .then(eventBus.emit('show-msg', { txt: 'Note duplicated', type: 'success' }))
          break
        case 'export':
          this.$router.push(
            `/mail/compose?title=${noteToUpdate.info.title}&body=${noteToUpdate.info.txt}`
          )
          break
        case 'edit':
          this.selectedNote = noteToUpdate
          this.isModalOpen = true
          break
      }
    },
  },
}
