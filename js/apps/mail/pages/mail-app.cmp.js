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
        <mail-list  @email-selected="onOpenEmail" :emails="emails"></mail-list>
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
      mailService.query({ ...this.criteria }).then((emails) => (this.emails = emails))
    },
  },
}
