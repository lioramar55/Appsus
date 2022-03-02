'use strict'

import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'

export const mailService = {
  query,
  getMailById,
  deleteMail,
  updateMail,
}

const emailsKey = 'emailsDB'
const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

_createEmails()

function query() {
  return storageService.query(emailsKey)
}

function updateMail(email) {
  email.isRead = true
  return storageService.put(emailsKey, email)
}

function getMailById(id) {
  return storageService.get(emailsKey, id)
}

function _createEmails() {
  const baseEmails = [
    {
      id: utilService.makeId(),
      from: 'מכבי שירותי בריאות',
      subject: 'התחדשנו!',
      body: 'התחדשנו בשבילך! כדי שיהיה לך פשוט ונוח יותר, חידשנו את אפליקציית מכבי, מהיום מסך הבית עם אפשרות להתאמה אישית!',
      isRead: false,
      sentAt: Date.now(),
      to: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      from: 'IB Trading Assistant ',
      subject: 'IWM down more than 2%!',
      body: 'Message Reference Number: 2-1645112188456-467197, Sent Date: 2022.02.17 10:37:02 -0500MRN:GE3DINJRGEZDCOBYGQ3TIMBZGE2HY3DJN5ZGC3LBOI2TKQDHNVQWS3BOMNXW27BSPQYTMNBVGEYTEMJYHA2DKNRNGQ3DOMJZG4%3D%3D%3D%3D%3D%3D:',
      isRead: false,
      sentAt: 165157810994,
      to: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      from: 'Mahatma Appsus',
      subject: 'Hello javascript!',
      body: 'Hello Hello Hello',
      isRead: false,
      sentAt: 165157810994,
      to: 'puki@walla.com',
    },
    {
      id: utilService.makeId(),
      from: 'Weird guy',
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isRead: false,
      sentAt: 1551133930594,
      to: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      from: 'Dropbox',
      subject: 'Matan and 66 others made changes in your shared folders',
      body: "Activity in Shared FoldersHere's what happened in your shared folders last week",
      isRead: true,
      sentAt: 150133936594,
      to: 'user@appsus.com',
    },
    {
      id: utilService.makeId(),
      from: 'Ninja Trader!',
      subject: 'NinjaTrader Monthly Statement 02/28/2022',
      body: 'Hi Mahatma Your monthly confirmation statement is now available for online viewing. For questions on information contained on your statement, please contact NinjaTrader Support.',
      isRead: true,
      sentAt: 155120930594,
      to: 'user@appsus.com',
    },
  ]
  let emails = utilService.loadFromStorage(emailsKey) || baseEmails
  utilService.saveToStorage(emailsKey, emails)
}

function deleteMail(mailId) {
  return storageService.remove(emailsKey, mailId)
}
