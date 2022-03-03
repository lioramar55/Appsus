import { mailService } from '../services/mail-service.js'

export default {
  template: `
    <section v-if="email" class="mail-details main-layout">
      <h1>Subject: {{email.subject}}</h1>
      <h2>Sent from: {{email.from}}</h2>
      <p>{{email.body}}</p>
      <router-link :to="'/mail'">Back to mails</router-link>
      <button @click="onDeleteMail">Delete</button>
    </section>
  `,
  data() {
    return {
      email: null,
    }
  },
  created() {
    var mailId = this.$route.params.mailId
    mailService.getMailById(mailId).then((email) => (this.email = email))
  },

  methods: {
    //TODO
    // add event bus
    onDeleteMail() {
      mailService.deleteMail({ ...this.email }).then(this.$router.push('/mail'))
    },
  },
}
