export default {
  props: ['folder'],
  template: `
        <aside class="aside-filter">
            <button @click="$emit('compose-mail')" class="compose-btn">Compose</button>
            <ul class="clean-list">
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
    },

    sendInboxEmit(statusVal) {
      this.activeFolder = statusVal
      this.$emit('status-filter', 'status', statusVal)
    },
  },
}
