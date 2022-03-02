export default {
  props: ['info'],
  template: `
    <iframe width="300" height="168.9" :src="info.src" :title="info.title" frameborder="0" allowfullscreen></iframe>
  `,
}
