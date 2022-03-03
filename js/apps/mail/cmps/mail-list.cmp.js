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
        @open-email="$emit('email-selected', email)"
        @email-starred="$emit('email-starred', email)"
        :email="email" >

        </mail-preview>
      </tbody>
    </table>`,

  components: {
    mailPreview,
  },
}
