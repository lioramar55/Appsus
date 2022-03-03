export default {
  template: `
    <section class="note-edit">
      <div class="btns">
        <button @click="$emit('edit-action','pinned')">
          <img  src="assets/icons/pin.png">
        </button>
        <button @click="$emit('edit-action','duplicated')">
          <img  src="assets/icons/duplicate.png">
        </button>
        <button @click="$emit('edit-action','paint')">
          <img  src="assets/icons/paint.png">
        </button>
        <button @click="$emit('edit-action','edit')">
          <img  src="assets/icons/edit.png">
        </button>
        <button @click="$emit('edit-action','export')">
          <img  src="assets/icons/export.png">
        </button>
      </div>
    </section>
  `,
}
