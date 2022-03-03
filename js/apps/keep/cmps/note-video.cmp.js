export default {
  props: ['note'],
  template: `
    <iframe height="168.9" :src="note.info.src" :title="note.info.title" frameborder="0" allowfullscreen></iframe>
  `,
}
