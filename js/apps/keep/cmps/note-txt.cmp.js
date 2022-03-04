export default {
  props: ['note'],
  template: `
    <div @click="$emit('inform','open-edit-note', note)" class="note-txt">
      <h2>{{noteTitle}}</h2>
      <p>{{note.info.txt}}</p>
    </div>
  `,
  computed: {
    noteTitle() {
      if (!this.note.info.title) return 'No Title'
      return this.note.info.title
    },
  },
}
