import mailList from '../cmps/mail-list.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailSort from '../cmps/mail-sort.cmp.js'
import asideMail from '../cmps/aside-mail.cmp.js'
import newMail from '../cmps/new-mail.cmp.js'
import { mailService } from '../services/mail-service.js'

export default {
  template: `
    <section class="mail-app main-layout">
      <mail-sort @set-sort="setSort"></mail-sort>

      <mail-filter @set-filter="setFilter"></mail-filter>
      <div class="mail-layout">
        <mail-list  @email-starred="onEmailStar" @email-selected="onOpenEmail" :emails="emails"></mail-list>
        <aside-mail @compose-mail="isComposeMail = true" @status-filter="setFilter"></aside-mail>
      </div>
      <div>Unread {{unRead}}</div>
      <new-mail v-if="isComposeMail"
       @close-modal="isComposeMail = false" @mail-sent="sendNewMail"></new-mail>
       
    </section>
  `,
  data() {
    return {
      emails: [],
      selectedEmail: null,
      email: null,
      criteria: {
        status: 'inbox',
        txt: '',
        isRead: null,
        isStared: null,
        // lables: ['important', 'romantic']
      },
      isComposeMail: false,
      unRead: null,

      
    }
  },
  created() {
    mailService.query({ ...this.criteria }).then((emails) => (this.emails = emails))
    .then((emails) => emails.filter(email => !email.isRead))
    .then((unReadedEmails) => (this.unRead = unReadedEmails.length))
    
  },
  components: {
    mailList,
    mailDetails,
    mailFilter,
    mailSort,
    asideMail,
    newMail,
  },
  methods: {
    onOpenEmail(email) {
      email.isRead = true
      mailService.updateMail(email).then((email) => {
        this.selectedEmail = email
        mailService.query().then((emails) => {
          this.emails = emails
          this.$router.push(`/mail/details/${email.id}`)
        })
      })
    },

    onEmailStar(email) {
      email.isStarred = !email.isStarred
      mailService.updateMail(email).then((updatedEmail) => {
        let idx = this.emails.findIndex((email) => email.id === updatedEmail.id)
        this.emails.splice(idx, 1, updatedEmail)
      })
    },

    sendNewMail(newEmail) {
      this.isComposeMail = !this.isComposeMail
      mailService
        .postMail(newEmail)
        .then(mailService.query({ ...this.criteria }).then((emails) => (this.emails = emails)))
    },

    setFilter(key, status) {
      this.criteria[key] = status
      mailService.query({ ...this.criteria }).then((emails) => (this.emails = emails))
    },

    setSort(sortBy) {
    if (sortBy === 'title') {
      this.emails.sort(function (a, b) {
        return a.subject.localeCompare(b.subject);
      }); 
      console.log(this.emails) 
    }
    if (sortBy === 'date') {
      this.emails.sort((a, b) => b.sentAt - a.sentAt)

    }
  }

}
    
}


