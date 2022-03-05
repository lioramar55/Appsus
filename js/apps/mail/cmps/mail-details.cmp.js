import { mailService } from '../services/mail-service.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
  template: `
    <section v-if="email" class="mail-details main-layout">
      <nav>
      <router-link :to="'/mail'"><img title="Back to inbox" src="assets/icons/left-arrow.png" alt=""></router-link>
      <button @click="onDeleteMail"><img title="Delete" src="assets/icons/trash.png" alt=""></button>
      </nav>
     
      <div class="mail-header">
        <h1>Subject: {{email.subject}}</h1>
      </div>
      <div class="sent-from">
      
        <h3>Sent from: {{email.from}}</h3>
      </div>
      <div class="email-body">
        <p>{{email.body}}</p>
      </div>
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
      .then(eventBus.emit('show-msg', { txt: 'Mail deleted', type: 'success' }))
    },
  },
}
