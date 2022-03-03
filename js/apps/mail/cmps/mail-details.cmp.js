import { mailService } from '../services/mail-service.js'

export default {
  template: `
    <section v-if="email" class="mail-details main-layout">
      <router-link :to="'/mail'">Back to mails</router-link>
      <div class="mail-header">
        <h1>Subject: {{email.subject}}</h1>
      </div>
      <div class="sent-from">
        <img src="" alt="">
        <h3>Sent from: {{email.from}}</h3>
      </div>
      <div class="email-body">
        <p>{{email.body}}</p>
      </div>
      <button @click="onDeleteMail"><img src="assets/icons/trash.png" alt=""></button>
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
