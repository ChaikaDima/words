const body = document.querySelector('body')
const navPanel = document.querySelector('.navigation_panel')
const navList = document.querySelector('.nav_list')
const arrBtn = document.querySelectorAll('.li_nav')
const [bt1, bt2, bt3] = arrBtn
const section1 = document.querySelector('.section1')
const section2 = document.querySelector('.section2')
const section3 = document.querySelector('.section3')
const sections = document.querySelector('.sections')
const input = document.querySelector('.input')
const btnAdd = document.querySelector('.btn_add')
const btnDel = document.querySelector('.btn_delete_last')
const form = document.querySelector('.form')
const list = document.querySelector('.wrapper_lists_of_array')
const close = document.querySelector('.close')

const incomingWord = document.querySelector('.inc_word')
const translationWord = document.querySelector('.trln_word')
const btnNext = document.querySelector('.btn_next')
const btnTranslate = document.querySelector('.btn_trln')

const btnClose = document.querySelector('.close')

const words = []
const wordsOfBoth = []
let res = null

function navigation(event) {
  event.preventDefault()
  if (event.target.innerHTML === 'Add words') {
    arrBtn.forEach((el) => el.classList.remove('active'))
    event.target.classList.add('active')
    section2.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
    removeClasesWithAdaptive()
  } else if (event.target.innerHTML === 'Home') {
    arrBtn.forEach((el) => el.classList.remove('active'))
    event.target.classList.add('active')
    section1.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
    removeClasesWithAdaptive()
  } else if (event.target.innerHTML === 'Rules') {
    arrBtn.forEach((el) => el.classList.remove('active'))
    event.target.classList.add('active')
    section3.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
    removeClasesWithAdaptive()
  }
}

function removeClasesWithAdaptive() {
  navList.classList.remove('navListActiv')
  navPanel.classList.remove('navActive')
  close.classList.remove('activeClose')
}

function getToArray() {
  words.push(input.value)
  wordsOfBoth.push(input.value.split('-'))
  input.value = ''
  list.innerHTML += `${words.at(-1)}<br/>`
}

function delLastOfArray() {
  words.pop()
  wordsOfBoth.pop()
  list.innerHTML = `${words.join('<br/>')}`
}

function showRandomWord() {
  getRandomNumb()
  if (words.length === 0) {
    incomingWord.innerHTML = `list is empty!`
  } else {
    incomingWord.innerHTML = `${wordsOfBoth[res - 1][0]}`
    translationWord.innerHTML = `Translation word`
  }
}

function showTranslateWord() {
  if (words.length === 0) {
    translationWord.innerHTML = `Translation word`
  } else {
    translationWord.innerHTML = `${wordsOfBoth[res - 1][1]}`
  }
}

function getRandomNumb() {
  res = Math.floor(Math.random() * words.length + 1)
}
//----------------------------------------------------------------------обработчики для 2-х вариантов адаптива
if (document.documentElement.clientWidth > '600') {
  navPanel.addEventListener('click', navigation)
  btnAdd.addEventListener('click', getToArray)
  btnDel.addEventListener('click', delLastOfArray)
  form.addEventListener('change', getToArray)
  btnNext.addEventListener('click', showRandomWord)
  btnTranslate.addEventListener('click', showTranslateWord)
} else if (document.documentElement.clientWidth <= '600') {
  navPanel.addEventListener('touchstart', navigation)

  btnAdd.addEventListener('touchstart', getToArray)
  btnDel.addEventListener('touchstart', delLastOfArray)

  btnNext.addEventListener('touchstart', showRandomWord)
  btnTranslate.addEventListener('touchstart', showTranslateWord)

  body.addEventListener('touchstart', function (event) {
    if (
      event.target.className === 'close_box' ||
      event.target.className === 'close'
    ) {
      navList.classList.toggle('navListActiv')
      navPanel.classList.toggle('navActive')
      close.classList.toggle('activeClose')
    }
  })

  sections.addEventListener('touchstart', function (event) {
    if (navList.classList.contains('navListActiv')) {
      navList.classList.remove('navListActiv')
      navPanel.classList.remove('navActive')
    }
  })
}
