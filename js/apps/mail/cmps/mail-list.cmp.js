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
          @click="onSelectEmail(email)"
          :email="email"></mail-preview>
      </tbody>
    </table>`,

  components: {
    mailPreview,
  },

  methods: {
    onSelectEmail(email) {
      this.$emit('email-selected', { ...email })
    },
  },
  computed: {},
}
