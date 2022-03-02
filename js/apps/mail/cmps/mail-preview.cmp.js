export default {
  props: ['email'],
  template: `
    <tr :class="isRead" class="mail-preview">
      <td class="from">{{email.from}}</td>
      <td class="content">
        <span class="subj">{{email.subject}}</span>
        <span class="body">{{formmatedBody}}</span>
      </td>
      <td class="time-sent">{{sentAt}}</td> 
    </tr>
  `,
  data() {
    return {}
  },
  created() {},
  computed: {
    isRead() {
      return this.email.isRead ? 'read' : 'unread'
    },
    formmatedBody() {
      const text =
        this.email.body.length > 50 ? this.email.body.slice(0, 48) + '...' : this.email.body
      return text
    },
    sentAt() {
      let date = new Date(this.email.sentAt)
      return `${date.toLocaleString('default', { month: 'short', day: 'numeric' })}`
    },
  },
}
