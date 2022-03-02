import mailList from '../cmps/mail-list.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'
import { mailService } from '../services/mail-service.js'

export default {
  template: `
    <section class="mail-app">
      <h1>mail app</h1>
      <mail-list  @email-selected="onOpenEmail" :emails="emails"></mail-list>
    </section>
  `,
  data() {
    return {
      emails: [],
      selectedEmail: null,
    }
  },
  created() {
    mailService.query().then((emails) => (this.emails = [...emails]))
  },
  components: {
    mailList,
    mailDetails,
  },
  methods: {
    onOpenEmail(email) {
      this.selectedEmail = email
      this.$router.push(`/mail/details/${email.id}`)
    },
  },
}
