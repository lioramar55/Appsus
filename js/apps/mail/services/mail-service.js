'use strict'

import storageService from '../../../services/async-storage-service.js'
import utilService from '../../../services/util-service.js'


const emails = [
   {
    id: utilService.makeId(),
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    to: 'momo@momo.com'
    },
    {
      id: utilService.makeId(),
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isRead: false,
      sentAt : 1551133930594,
      to: 'momo@momo.com'
      },
        {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        to: 'momo@momo.com'
        }
    
]



export const mailService = {
  getMails,
}

function getMails() {
  return
}
