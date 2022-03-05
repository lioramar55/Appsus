'use strict'

import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'

export const mailService = {
  query,
  getMailById,
  deleteMail,
  updateMail,
  postMail,
}

const emailsKey = 'emailsDB'
const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

_createEmails()

function query(criteria) {
  if (!criteria) return storageService.query(emailsKey)
  return storageService.query(emailsKey).then((emails) => _filterByCriteria(emails, criteria))
}

function _filterByCriteria(emails, criteria) {
  let filteredEmails = emails
  if (criteria.status !== 'trash') {
    filteredEmails = emails.filter((email) => !email.removedAt)
  }
  if (criteria.status === 'inbox') {
    filteredEmails = filteredEmails.filter(
      (email) => email.to === loggedinUser.email && !email.removedAt
    )
  } else if (criteria.status === 'sent') {
    filteredEmails = filteredEmails.filter((email) => email.from === loggedinUser.fullname)
  } else if (criteria.status === 'trash') {
    filteredEmails = emails.filter((email) => email.removedAt)
  } else if (criteria.status === 'starred') {
    filteredEmails = emails.filter((email) => email.isStarred)
  }
  if (criteria.isRead) {
    if (criteria.isRead.toLowerCase() === 'read') {
      filteredEmails = emails.filter((email) => email.isRead)
    } else if (criteria.isRead.toLowerCase() === 'unread') {
      filteredEmails = emails.filter((email) => !email.isRead)
    }
  }

  if (criteria.txt) {
    const regex = new RegExp(criteria.txt, 'i')
    filteredEmails = filteredEmails.filter(
      (email) => regex.test(email.subject) || regex.test(email.from) || regex.test(email.body)
    )
  }

  return Promise.resolve(filteredEmails)
}

function updateMail(email) {
  return storageService.put(emailsKey, email)
}

function getMailById(id) {
  return storageService.get(emailsKey, id)
}

function deleteMail(mail) {
  mail.removedAt = Date.now()
  return storageService.put(emailsKey, mail)
}

function postMail(mail) {
  return storageService.post(emailsKey, mail)
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
      isStarred: false,
    },
    {
      id: utilService.makeId(),
      from: 'IB Trading Assistant ',
      subject: 'IWM down more than 2%!',
      body: 'Message Reference Number: 2-1645112188456-467197, Sent Date: 2022.02.17 10:37:02 -0500MRN:GE3DINJRGEZDCOBYGQ3TIMBZGE2HY3DJN5ZGC3LBOI2TKQDHNVQWS3BOMNXW27BSPQYTMNBVGEYTEMJYHA2DKNRNGQ3DOMJZG4%3D%3D%3D%3D%3D%3D:',
      isRead: false,
      sentAt: 165157810994,
      to: 'user@appsus.com',
      isStarred: false,
    },
    // {
    //   id: utilService.makeId(),
    //   from: 'Mahatma Appsus',
    //   subject: 'Hello javascript!',
    //   body: 'Hello Hello Hello',
    //   isRead: false,
    //   sentAt: 165157810994,
    //   to: 'puki@walla.com',
    //   isStarred: false,
    // },
    {
      id: utilService.makeId(),
      from: 'Weird guy',
      subject: 'Miss you!',
      body: 'Would love to catch up sometimes',
      isRead: false,
      sentAt: 1551133930594,
      to: 'user@appsus.com',
      isStarred: false,
    },
    {
      id: utilService.makeId(),
      from: 'Dropbox',
      subject: 'Matan and 66 others made changes in your shared folders',
      body: "Activity in Shared FoldersHere's what happened in your shared folders last week",
      isRead: true,
      sentAt: 150133936594,
      to: 'user@appsus.com',
      isStarred: false,
    },
    

    {
      id: utilService.makeId(),
      from: 'Ninja Trader!',
      subject: 'NinjaTrader Monthly Statement 02/28/2022',
      body: 'Hi Mahatma Your monthly confirmation statement is now available for online viewing. For questions on information contained on your statement, please contact NinjaTrader Support.',
      isRead: true,
      sentAt: 155120930594,
      to: 'user@appsus.com',
      isStarred: false,
    },

    {
      id: utilService.makeId(),
      from: ' Quora לקט ',
      subject: 'למה משמשת ספירה בבסיס הקסדצימלי?',
      body: "ייצוג מספרים הקסדצימלי (בסיס 16) בשימוש בעיקר במצבים כאשר עובדים עם כתובת בזיכרון האופרטיבי של המחשב (RAM). אפשר לייצג כתובות זיכרון גם בינארית (בסיס 2) אבל זה ארוך מידי ולא נוח.    והסיבה היא שזיכרון מחשב מנוהל בדרך כלל ביחידות גדולות יותר כמו עמודים או סגמנטים. בדרך גדלים של יחידות זיכרון אלו הם בחזקה של 2, טווח המספרים הבסיס ההקסדצימלים הוא 16 שזה גם חזקה של 2. ולכן קל מאוד לבצע פעולות אריכמטיות בבסיס הזה, וזאת הסיבה שתמצא ייצוג זה בהרבה שפות תיכנות.  בנוסף, המחשב יודע לקורא רק ייצוג בינארי, שזה גם חזקה של 2, וקל להפוך ייצוג הקסדצימלי לבינארי.",
      isRead: false,
      sentAt: 150133936594,
      to: 'user@appsus.com',
      isStarred: false,
    },
    {
      id: utilService.makeId(),
      from: 'KETO CHEF - עודד תלמור',
      subject: 'הערב ב-20:00 שידור חי מיוחד שיכול לשים סוף לבעיית הקילוגרמים העודפים (פרסומת תזכורת לשידור הערב)',
      body: 'קפצתי לתזכר אותך שהערב בשעה 20:00 אני עולה לשידור חי מיוחד בזום בנושא:   המסלול המהיר, הבריא (והטעים) להשלת הקילוגרמים העודפים   הנה הקישור לשידור בזום: https://ketochef.ravpage.co.il/zoom בשידור אני הולך לספר את הסיפור האישי שלי, איך הפכתי מחולה במחלה חשוכת מרפא בשם קרוהן, לאדם בריא לחלוטין וכיצד השיטה הזו יכולה:לעזור לך להשיל מהגוף את הקילוגרמים העודפים להיפטר מהמחשבות והשאלות על אוכל ליצור אורח חיים חדש ותפיסה חדשה לגבי מזון מבלי להיאבק בעצמך ולהמשיך ליהנות מאוכל משובח אז ממליץ בחום:  - להגיע בזמן ועם כלי כתיבה  - לשריין שעה וחצי ללא הפרעות (ככל שניתן)  - לצפות בשידור בלפטופ או במחשב נייח (ניתן גם מהנייד, אבל פחות נוח)  נתראה בשידור, עודד טלמור',
      isRead: false,
      sentAt: 1551133930594,
      to: 'user@appsus.com',
      isStarred: false,
    },

    {
      id: utilService.makeId(),
      from: 'Cult Beauty',
      subject: 'Ends tomorrow: don’t miss your FREE £15 gift card',
      body: 'Achieve next-level luminosity with the new Light Reflecting Foundation that marries a hydrating, skin-smoothing formula with blur-effect coverage that\'s got everyone talking — pass it on!',
      isRead: false,
      sentAt: 155120930594,
      to: 'user@appsus.com',
      isStarred: false,
    },
    {
      id: utilService.makeId(),
      from: 'Z Sport',
      subject: 'סופ״ש ארוך מתחיל עכשיו! משלוח עד הבית בחינם בכל הזמנה מעל ₪69 📦 | (פרסומת)',
     
      body: 'LONG WEEKEND MADNESS - עד יום שני (כולל)  פריטים נוספים עכשיו בסייל באתר ובסניפים!  ובנוסף משלוח עד הבית בחינם בכל הזמנה מעל ₪69',
      isRead: false,
      sentAt: Date.now(),
      to: 'user@appsus.com',
      isStarred: false,
    },

    {
      id: utilService.makeId(),
      from: 'BEAUTY BAY',
      subject: 'Green is trending 💚📈',
      body: "Make a statement with the trending tones of the season. Whether you’re adding a slick of graphic liner or revamping your look with a hair change, we have everything you need.",
      isRead: true,
      sentAt: 150133936594,
      to: 'user@appsus.com',
      isStarred: false,
    },
    {
      id: utilService.makeId(),
      from: 'ALDO',
      subject: 'סניקרס, עכשיו: קולקצייה כזאת עוד לא הייתה כאן! 👟❤️💫💜| פרסומת',
      body: 'נכון שהתגעגעתן? IT’S SNEAKERS TIME בימים המבלבלים האלה של שבין חורף לאביב, הבחירה היא בסניקרס!   וקולקצייה כזאת עוד לא הייתה כאן:  דגמים צבעוניים, טרנדים ונועזים, ואיך אפשר בלי סניקרס לבנות קלאסיות שכיף לחרוש עליהן. ',
      isRead: false,
      sentAt: 165157810994,
      to: 'user@appsus.com',
      isStarred: false,
    },
    {
      id: utilService.makeId(),
      from: 'boohoo',
      subject: 'Influencer Approved✔️',
      body: '*Up to 70% off everything excluding sale, is automatically applied and applicable to selected lines only. Limited time only.**Add next day delivery to your basket at checkout and use code: TWOSDAY to reduce the price to 22p. Available exclusively on the boohoo app.',
      isRead: false,
      sentAt: 1551133930594,
      to: 'user@appsus.com',
      isStarred: false,
    },
    
  ]
  let emails = utilService.loadFromStorage(emailsKey) || baseEmails
  utilService.saveToStorage(emailsKey, emails)
}
