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
  const notes = [
    {
      id: 'n101',
      type: 'note-txt',
      isPinned: true,
      info: {
        txt: 'Fullstack Me Baby!',
      },
    },
    {
      id: 'n102',
      type: 'note-img',
      info: {
        url: 'http://some-img/me',
        title: 'Bobi and Me',
      },
      style: {
        backgroundColor: '#00d',
      },
    },
    {
      id: 'n103',
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
}
