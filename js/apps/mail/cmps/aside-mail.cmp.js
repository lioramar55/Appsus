export default {
  props: ['folder'],
  template: `
        <aside class="aside-filter">
            <ul class="main-aside-list clean-list">
              <li>
              <button @click="onComposeMail" class="compose-btn">Compose</button>
              </li>
                <li :class="{ activeInbox: activeFolder === 'inbox' }" @click="sendInboxEmit('inbox')">
                    Inbox
                </li>
                <li :class="{ active: activeFolder === 'sent' }" @click="sendEmit('sent')">
                    Sent
                </li>
                <li :class="{ active: activeFolder === 'starred' }" @click="sendEmit('starred')">
                    Starred
                </li>
                <li  :class="{ active: activeFolder === 'drafts' }" @click="sendEmit('drafts')">
                    Drafts
                </li>
                <li :class="{ active: activeFolder === 'trash' }"  @click="sendEmit('trash')">
                    Trash
                </li>
            </ul>
            <button @click="showMailMenu" class="nav-mail-burger"><img src="assets/icons/nav-burger.png"></button>
        </aside>
    `,
  data() {
    return {
      isInboxActive: false,
      activeFolder: 'inbox',
    }
  },

  computed: {},
  methods: {
    sendEmit(statusVal) {
      this.activeFolder = statusVal
      this.$emit('status-filter', 'status', statusVal)
      document.body.classList.toggle('show-mail-menu')
    },

    sendInboxEmit(statusVal) {
      this.activeFolder = statusVal
      this.$emit('status-filter', 'status', statusVal)
      document.body.classList.toggle('show-mail-menu')
    },

    showMailMenu() {
      document.body.classList.toggle('show-mail-menu')
    },

    onComposeMail() {
      this.$emit('compose-mail')
      document.body.classList.toggle('show-mail-menu')
    }
  },
}
