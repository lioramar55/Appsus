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
        <div class="pallete">
          <button @click="onPaint">
            <img  src="assets/icons/paint.png">
          </button>
          <div v-if="colorPalleteOpen" class="color-picker">
            <div v-for="color in colors" :style="{'background-color': color}" class="color"></div>
          </div>
        </div>
        <button @click="$emit('edit-action','edit')">
          <img  src="assets/icons/edit.png">
        </button>
        <button @click="$emit('edit-action','export')">
          <img  src="assets/icons/export.png">
        </button>
      </div>
      
    </section>
  `,
  data() {
    return {
      colorPalleteOpen: false,
      colors: ['#333', '#A6F', 'aaa', 'lightcyan'],
    }
  },
  methods: {
    onPaint() {
      this.colorPalleteOpen = true
      // this.$emit('edit-action', 'paint')
    },
  },
}
