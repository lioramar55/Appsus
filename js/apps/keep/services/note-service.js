'use strict'

import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'

export const noteService = {
  query,
}
const notesKey = 'notesDB'
_createNotes()

function query() {
  return storageService.query(notesKey)
}

function _createNotes() {
  const baseNotes = [
    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: true,
      info: {
        txt: 'Fullstack Me Baby!',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: true,
      info: {
        txt: "We're gonna make it!",
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
        backgroundColor: '#00d',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-video',
      info: {
        src: 'https://www.youtube.com/embed/w8HdOHrc3OQ',
        title: 'Bobi and Me',
      },
      style: {
        backgroundColor: '#00d',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-todos',
      info: {
        label: 'Get my stuff together',
        todos: [
          { txt: 'Driving liscence', doneAt: null },
          { txt: 'Coding power', doneAt: 187111111 },
        ],
      },
    },
  ]
  const notes = utilService.loadFromStorage(notesKey) || baseNotes
  utilService.saveToStorage(notesKey, notes)
}
