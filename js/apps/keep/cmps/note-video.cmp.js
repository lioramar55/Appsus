export default {
  props: ['note'],
  template: `
  <div class="note-video">
    <h2>
      {{note.info.title}}
    </h2>
    <iframe height="168.9" :src="note.info.url" :title="note.info.title" frameborder="0" allowfullscreen></iframe>
  </div>
  `,
}
