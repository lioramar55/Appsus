import mailList from '../cmps/mail-list.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import asideMail from '../cmps/aside-mail.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'
import { mailService } from '../services/mail-service.js'

export default {
  template: `
    <section class="mail-app main-layout">

      <mail-filter @text-filter="setFilter"></mail-filter>
      <div class="mail-grid">
        <mail-list  @email-selected="onOpenEmail" :emails="emails"></mail-list>
        <aside-mail @compose-mail="toggleAddMail" @status-filter="setFilter"></aside-mail>
      </div>
    </section>
    <new-mail v-if="isComposeMail" @mail-sent="toggleAddMail"></new-mail>
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
      isComposeMail: false
    }
  },
  created() {
    mailService.query({ ...this.criteria }).then((emails) => (this.emails = emails))
  },
  components: {
    mailList,
    mailDetails,
    mailFilter,
    asideMail,
    newMail
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
  
    toggleAddMail() {
      this.isComposeMail = !this.isComposeMail
      if (!this.isComposeMail) {
        mailService.query({ ...this.criteria }).then((emails) => (this.emails = emails))
      }
    },

    setFilter(key, status) {
      this.criteria[key] = status
      mailService.query({ ...this.criteria }).then((emails) => (this.emails = emails))
    },
  },
}
