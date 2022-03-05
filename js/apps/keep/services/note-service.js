'use strict'

import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'

export const noteService = {
  query,
  updateNote,
  postNote,
  removeTodo,
  getNoteById,
  saveNotes,
}
const notesKey = 'notesDB'
_createNotes()

function query() {
  return storageService.query(notesKey)
}

function removeTodo(id) {
  return storageService.remove(notesKey, id)
}

function saveNotes(notes) {
  utilService.saveToStorage(notesKey, notes)
}

function getNoteById(id) {
  return storageService.query(notesKey).then((notes) => notes.find((note) => note.id === id))
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
      style: {
        backgroundColor: 'orange',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: true,
      info: {
        title: 'It seems like',
        txt: "We're really going to make it! Like always hard at first but then it becomes easier!",
      },
      style: {
        backgroundColor: 'skyblue',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-img',
      info: {
        url: 'https://images.unsplash.com/photo-1646225717344-765484703a03?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
        title: 'Stonehenge',
      },
      style: {
        backgroundColor: '#635D19',
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
        backgroundColor: 'limegreen',
      },
    },

    {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: false,
      info: {
        title: 'This is Appsus',
        txt: 'A single page application which allows you to track your emails with our mail app, to jot down some ideas with our Keep app, and find great books to expand your knowledge!',
      },
      style: {
        backgroundColor: 'skyblue',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-img',
      info: {
        url: 'https://images.unsplash.com/photo-1645930916050-523c86d40078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        title: 'Some crazy background',
      },
      style: {
        backgroundColor: 'tomato',
      },
    },
    {
      id: utilService.makeId(),
      type: 'note-todos',
      isPinned: true,
      info: {
        label: 'Get my stuff together',
        todos: [
          { txt: 'Finish Appsus', doneAt: null },
          { txt: 'Make it look great', doneAt: null },
          { txt: 'Add all extra features', doneAt: null },
          { txt: 'Get better every hour', doneAt: 187111111 },
          { txt: 'Work on the project with a partner', doneAt: null },
        ],
      },
      style: {
        backgroundColor: '#bbb',
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
        title: 'Trading rules',
        txt: `1. Track every trade in the trades log 2. Don't chase loser trades... 3.Don't trade outside the zone`,
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
      style: {
        backgroundColor: '#888',
      },
    },
  ]
  let notes = utilService.loadFromStorage(notesKey) || []
  if (notes) {
    notes = notes.length > 0 ? notes : baseNotes
  }
  utilService.saveToStorage(notesKey, notes)
}
