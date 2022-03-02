import { mailService } from '../services/mail-service.js'

export default {
  template: `
    <section class="mail-details">
      <h1>Subject: {{email.subject}}</h1>
      <h2>Sent from: {{email.from}}</h2>
    </section>
  `,
  data() {
    return {
      email: null,
    }
  },
  created() {
    var mailId = this.$route.params.mailId
    console.log('mailId', mailId)
    mailService.getMailById(mailId).then((email) => (this.email = email))
  },
}
