import notePreview from '../cmps/note-preview.cmp.js'
import noteModal from '../cmps/note-modal.cmp.js'
import { noteService } from '../services/note-service.js'

export default {
  template: `
  <section class="note-app">
    <note-preview v-if="notes" v-for="note in notes"
      :note="note"  @edit-note="onEditNote"></note-preview>
    <note-modal v-if="isModalOpen"></note-modal>
  </section>
  `,
  data() {
    return {
      isModalOpen: false,
      notes: null,
    }
  },
  created() {
    noteService.query().then((notes) => (this.notes = notes))
  },
  components: {
    notePreview,
    noteModal,
  },
  methods: {
    onEditNote(action) {
      this.isModalOpen = true
    },
    // toggleModal() {
    //   this.isModalOpen = !this.isModalOpen
    // },
  },
  computed: {},
}
