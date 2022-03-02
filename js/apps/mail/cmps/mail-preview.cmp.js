export default {
  props: ['email'],
  template: `
    <tr class="mail-preview">
      <td class="from">{{email.from}}</td>
      <td class="content">
        <span class="subj">{{email.subject}}</span>
        <span class="desc">{{email.description}}</span>
      </td>
      <td class="time-sent">{{email.timeSent}}</td>
    </tr>
  `,
}
