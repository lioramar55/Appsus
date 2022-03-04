export default {
    template: `
          <section class="mail-sort">
              <button @click="setSort('title')">Sort by title</button>
              <button @click="setSort('date')">Sort by date</button>
              <!-- <label for="title">Sort by title</label>
              <input @click="checkTitleSort" type="checkbox" id="title" value="title" v-model="title">
              <label for="date">Sort by date</label>
              <input @click="checkDateSort" type="checkbox" id="date" value="date" v-model="date"> -->
              
          </section>
      `,
    // data() {
    //   return {
    //     title:null,
    //     date:null
    //     }
    
    // },
    methods: {
      setSort(sortBy) {
        this.$emit('set-sort', sortBy)
      },

      checkTitleSort() {
          console.log(this.title)
      },

    //   checkDateSort() {
    //     console.log(this.date)
    //   }
   
    },

  }
  