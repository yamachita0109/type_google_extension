$(function() {
  const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  $(document).on('keydown', 'textarea', (e) => {
    const current = document.activeElement
    if (e.key === 'Backspace') {
      return true
    }
    if (current.type === 'textarea' || current.type === 'text' || current.type === 'search') {
      const isEnter = e.key === 'Enter'
      const size = isEnter ? rand(50, 80) : rand(30, 40)
      const caretPosition = Measurement.caretPos(current)
      const imgUrl = chrome.extension.getURL(isEnter ? 'img/tan.png' : 'img/kata.png')
      const $img = $('<img width="' + size + '">')
      $img.attr('src', imgUrl)
      $img.css({
        'position': 'absolute',
        'top': caretPosition.top + rand(-10, 10),
        'left': caretPosition.left + rand(-10, 10),
        'zIndex': 99999
      })
      $('body').append($img)
      $img.animate({
        'top': caretPosition.top + rand(-40, 40),
        'left': caretPosition.left + rand(-40, 40),
        'width': size + (isEnter ? rand(30, 50) : rand(10, 20)),
        'opacity': 0
      }, 500, () => {
        $img.remove()
      })
    }
  })
})