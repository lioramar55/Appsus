export default {
  props: ['note'],
  template: `
  <div class="note-video">
    <h2>
      {{note.info.title}}
    </h2>
    <iframe  :src="note.info.url" :title="note.info.title" frameborder="0" allowfullscreen></iframe>
  </div>
  `,
}
