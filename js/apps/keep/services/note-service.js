'use strict'

import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'

export const noteService = {
  query,
  updateNote,
  postNote,
  removeTodo,
}
const notesKey = 'notesDB'
_createNotes()

function query() {
  return storageService.query(notesKey)
}

function removeTodo(id) {
  return storageService.remove(notesKey, id)
}

function updateNote(updatedNote) {
  return storageService.put(notesKey, updatedNote)
}

function postNote(newNote) {
  return storageService.post(notesKey, newNote)
}

function _createNotes() {
  const baseNotes = [
    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: true,
      info: {
        title: 'Hello Vue!',
        txt: 'Fullstack Me Baby! ',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: true,
      info: {
        title: 'It seems like',
        txt: "We're really going to make it!\nHard at first but then it becomes easier!",
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-img',
      info: {
        url: 'https://images.unsplash.com/photo-1646225717344-765484703a03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
        title: 'The megalithic structure Stonehenge',
      },
      style: {
        backgroundColor: '#00d',
      },
    },

    {
      id: utilService.makeId(),
      type: 'note-video',
      info: {
        url: 'https://www.youtube.com/embed/nFjDqwtXdKw',
        title: 'Samurai',
      },
      style: {
        backgroundColor: '',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-img',
      info: {
        url: 'https://images.unsplash.com/photo-1645930916050-523c86d40078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        title: 'Bobi and Me',
      },
      style: {
        backgroundColor: 'tomato',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-img',
      info: {
        url: 'https://images.unsplash.com/photo-1592610687683-41d676fcda72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        title: 'Mount Rushmore',
      },
      style: {
        backgroundColor: 'salmon',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-txt',
      info: {
        title: 'כללי מסחר',
        txt: `1. כל טרייד יתועד ביומן טריידים לאחר הכניסה לטרייד.
              2. לא לסכן יותר מ3 אחוז חשבון בטרייד
              3. בTrading Range - לזכור Buy Low Sell High, להיות מוכן גם בניסיונות פריצה תמיד לחכות לFollow Through
              4. לא להכנס לטרייד בעבודה או אצל חברים, להכנס רק במצב ריכוז מלא`,
      },
      style: {
        backgroundColor: '#555',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-todos',
      info: {
        label: 'Get my stuff together',
        todos: [
          { txt: 'Master Vue', doneAt: Date.now() },
          { txt: 'Driving license', doneAt: null },
          { txt: 'Haircut', doneAt: null },
          { txt: 'Coding power', doneAt: 187111111 },
          { txt: 'Take the dog to the vet', doneAt: null },
        ],
      },
    },
  ]
  let notes = utilService.loadFromStorage(notesKey) || []
  if (notes) {
    notes = notes.length > 0 ? notes : baseNotes
  }
  utilService.saveToStorage(notesKey, notes)
}
