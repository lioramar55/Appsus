import mailPreview from './mail-preview.cmp.js'

export default {
  props: ['emails'],
  template: `
    <table>
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <mail-preview v-for="email in emails"
          @click="$emit('email-selected',email)" :email="email"></mail-preview>
      </tbody>
    </table>`,

  components: {
    mailPreview,
  },
}
