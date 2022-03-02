import notePreview from '../cmps/note-preview.cmp.js'
import noteModal from '../cmps/note-modal.cmp.js'
import { noteService } from '../services/note-service.js'
// import noteAdd from './apps/keep/cmps/note-add.cmp.js'

export default {
  template: `
  <section class="note-app main-layout">
    <!-- <note-add></note-add> -->
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
    }
  },
  created() {
    noteService.query().then((notes) => (this.notes = notes))
  },
  components: {
    notePreview,
    // noteAdd,
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
