import notePreview from '../cmps/note-preview.cmp.js'
import noteModal from '../cmps/note-modal.cmp.js'
import { noteService } from '../services/note-service.js'

export default {
  template: `
  <section class="note-app">
    <h1>Note App</h1>
    <note-preview v-if="notes.length" v-for="note in notes"
    @edit-note="openNoteModal"></note-preview>
    <note-modal v-if="isModalOpen"></note-modal>
  </section>
  `,
  data() {
    return {
      isModalOpen: false,
      notes: [],
    }
  },
  created() {
    // noteService.query()
  },
  components: {
    notePreview,
    noteModal,
  },
  methods: {
    openNoteModal(note) {
      this.isModalOpen = true
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
  },
  computed: {},
}
