export default {
  props: ['note'],
  template: `
  <div  class="note-img" >
    <h1>{{note.info.title}}</h1>
    <img @click="$emit('inform', 'open-edit-note', note)" :src="note.info.url">
  </div>
  `,
}
