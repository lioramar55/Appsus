import mailList from '../cmps/mail-list.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import { mailService } from '../services/mail-service.js'

export default {
  template: `
    <section class="mail-app">
      <mail-filter @filtered="setFilter"></mail-filter>
      <h1>mail app</h1>
      <mail-list  @email-selected="onOpenEmail" :emails="emailsToShow"></mail-list>
    </section>
  `,
  data() {
    return {
      emails: [],
      selectedEmail: null,
      filterBy: null,
    }
  },
  created() {
    mailService.query().then((emails) => (this.emails = [...emails]))
  },
  components: {
    mailList,
    mailDetails,
    mailFilter
  },
  methods: {
    onOpenEmail(email) {
      this.selectedEmail = email
      this.$router.push(`/mail/details/${email.id}`)
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
      console.log(this.filterBy)
      
  },
  },
  computed: {
    emailsToShow() {
      if (!this.filterBy) return this.emails;
      const regex = new RegExp(this.filterBy.byTxt, 'i')
      return this.emails.filter(email => regex.test(email.subject)
       || regex.test(email.from) || regex.test(email.body))
    }
  }
}
