import mailList from '../cmps/mail-list.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import asideFilter from '../cmps/aside-filter.cmp.js'
import { mailService } from '../services/mail-service.js'

export default {
  template: `
    <section class="mail-app main-layout">
      <mail-filter @text-filter="setFilter"></mail-filter>
      <div class="mail-grid">
        <mail-list  @email-selected="onOpenEmail" :emails="emailsToShow"></mail-list>
        <aside-filter @status-filter="setFilter"></aside-filter>
      </div>
    </section>
  `,
  data() {
    return {
      emails: [],
      selectedEmail: null,
      criteria: {
        status: '',
        txt: '',
        // isRead: null,
        // isStared: true,
        // lables: ['important', 'romantic']
      },
    }
  },
  created() {
    mailService.query({ ...this.criteria }).then((emails) => (this.emails = emails))
  },
  components: {
    mailList,
    mailDetails,
    mailFilter,
    asideFilter,
  },
  methods: {
    onOpenEmail(email) {
      mailService.updateMail(email).then((email) => {
        this.selectedEmail = email
        mailService.query().then((emails) => {
          this.emails = emails
          this.$router.push(`/mail/details/${email.id}`)
        })
      })
    },

    setFilter(key, status) {
      this.criteria[key] = status
      console.log('status', status)
    },
  },
  computed: {
    emailsToShow() {
      let currEmails = { ...this.emails }
      if (this.criteria.txt) {
        const regex = new RegExp(this.criteria.txt, 'i')
        this.emails.filter(
          (email) => regex.test(email.subject) || regex.test(email.from) || regex.test(email.body)
        )
      }
      if (this.criteria.status !== 'trash') {
        currEmails = this.emails.filter((email) => !email.removedAt)
      } else if (this.criteria.status === 'sent') {
      } else if (this.criteria.status === 'inbox') {
      } else {
        currEmails = this.emails.filter((email) => email.removedAt)
      }
      return currEmails
    },
  },
}
