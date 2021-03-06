import mailPreview from './mail-preview.cmp.js'

export default {
  props: ['emails'],
  template: `
  <section class="mail-list">
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
        :email="email"
        @delete-email="$emit('delete-email', email)"
        @read-email="$emit('read-email', email)"
        @unread-email="$emit('unread-email', email)"
         >
        </mail-preview>
      </tbody>
    </table>
</section>
    `,

  components: {
    mailPreview,
  },
}
