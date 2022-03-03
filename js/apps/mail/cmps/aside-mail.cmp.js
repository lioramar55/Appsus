export default {
  template: `
        <aside class="aside-filter">
            <button @click="$emit('compose-mail')" class="compose-btn">Compose</button>
            <ul class="clean-list">
                <li :class="{ activeInbox: isInboxActive }" @click="sendInboxEmit($event,'inbox')">
                    Inbox
                </li>
                <li :class="{ active: isSendActive }" @click="sendEmit($event,'sent')">
                    Sent
                </li>
                <li :class="{ active: isStarredActive }" @click="sendEmit($event,'starred')">
                    Starred
                </li>
                <li  :class="{ active: isDraftsActive }" @click="sendEmit($event,'drafts')">
                    Drafts
                </li>
                <li :class="{ active: isTrashActive }"  @click="sendEmit($event,'trash')">
                    Trash
                </li>
            </ul>
        </aside>
    `,
  data() {
    return {
      isInboxActive: false,
      isSendActive: false,
      isStarredActive: false,
      isDraftsActive: false,
      isTrashActive:false
    }
  },

  computed: {

  },
  methods: {
    sendEmit(event, statusVal) {
      event.target.classList.add('active')
      this.$emit('status-filter','status', statusVal)
    },

    sendInboxEmit(event, statusVal) {
      event.target.classList.add('activeInbox')
      this.$emit('status-filter','status', statusVal)
    }

  },
}
 