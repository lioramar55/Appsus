export default {
  props: ['note'],
  template: `
  <div class="note-img" @click="$emit('inform')">
    <h1>{{note.info.title}}</h1>
    <img  :src="note.info.url">
  </div>
  `,
}
