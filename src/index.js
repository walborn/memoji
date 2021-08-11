const animals = [
  128054, // пес
  128049, // кот
  128055, // свин
  128057, // хомяк
  128059, // медведь
  128053, // обезьяна
  128054, // пес
  128049, // кот
  128055, // свин
  128057, // хомяк
  128059, // медведь
  128053, // обезьяна
]

const cards = animals.sort(() => Math.random() - 0.5)

document.getElementById('app').innerHTML = `
<h1 class="header">Memoji</h1>
<div class="game">
${cards
  .map(
    (i, index) => `
<div class="card" data-value="${i}" data-position="${index}">
  <div class="front">&#${i};</div>
  <div class="back"></div>
</div>`,
  )
  .join('')}
</div>
`
let pivot,
  disabled = false

document.querySelectorAll('.card').forEach((el) =>
  el.addEventListener('click', function () {
    if (disabled) return
    /*
    A. Если карточка открыта, то
      1. Если нажали на опорную, то закрываем ее, а саму опорную обнуляем
      2. Иначе ничего не делаем

    B. Если карточка закрыта (иначе) - то открываем ее
      1. Если нет опорной, то делаем ее опорной и красим в зеленый
      2. Если картинки совпадают, то красим ее в зеленый, а через 1s обесцвечиваем, опорную обнуляем
      3. Если картинки не совпадают, то красим пару в красный, а через 1s обесцвечиваем и закрываем, опорную обнуляем
   
    С. Не забываем задизейблить клики, пока идет анимация
   */

    // A
    if (this.classList.contains('opened')) {
      if (pivot && pivot.dataset.position === this.dataset.position) {
        pivot.classList.remove('opened')
        pivot.classList.remove('success')
        pivot = null
      }
      return
    }

    // B
    this.classList.add('opened')
    if (!pivot) {
      pivot = this
      pivot.classList.add('success')
      return
    }

    if (this.dataset.value === pivot.dataset.value) {
      this.classList.add('success')
      disabled = true
      setTimeout(() => {
        this.classList.remove('success')
        pivot.classList.remove('success')
        pivot = null
        disabled = false
      }, 1000)
      return
    }

    pivot.classList.remove('success')
    pivot.classList.add('failure')
    this.classList.add('failure')
    disabled = true
    setTimeout(() => {
      this.classList.remove('failure', 'opened')
      pivot.classList.remove('failure', 'opened')
      pivot = null
      disabled = false
    }, 1000)
  }),
)
