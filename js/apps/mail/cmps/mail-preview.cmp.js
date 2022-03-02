export default {
  props: ['email'],
  template: `
    <tr class="mail-preview">
      <td class="from">{{email.from}}</td>
      <td class="content">
        <span class="subj">{{email.subject}}</span>
        <span class="desc">{{email.body}}</span>
      </td>
      <td class="time-sent">{{email.sentAt}}</td>
    </tr>
  `,
  created() {
    console.log('this.email', this.email)
  },
}
