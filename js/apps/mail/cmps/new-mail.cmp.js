import { mailService } from '../services/mail-service.js'

export default {
    template: `
     <section class="new-mail">
     <form @submit.prevent="onPostMail">
            <label>To
            <input required type="email" v-model="mail.to" />
            </label>
            <label>Subject
            <input type="text" v-model="mail.subject"/>
            </label>
            <textarea v-model="mail.body" rows="10" cols="30">
                  
                </textarea> 
            <button>send</button>
              </form>


       
      </section>
    `,
    data() {
      return {
          mail: {
              from:'Mahatma Appsus',
              to:'',
              subject:'',
              body:'',
              isRead: false,
              sentAt: Date.now(),   
          }
        
      }
    },
    created() {
      
    },

    methods: {
        onPostMail() {
            mailService.postMail({...this.mail})
            .than(this.$emit('mail-sent'))  
        },
        },
  }
  