export default {
  props: ['email'],
  template: `
    <tr class="mail-preview">
      <td class="from">{{email.from}}</td>
      <td class="content">
        <span class="subj">{{email.subject}}</span>
        <span class="desc">{{formmatedBody}}</span>
      </td>
      <td class="time-sent">{{email.sentAt}}</td> 
    </tr>
  `,
  data() {
    return {}
  },
  created() {},
  computed: {
    formmatedBody() {
      const text =
        this.email.body.length > 50 ? this.email.body.slice(0, 48) + '...' : this.email.body
      return text
    },
  },
}
