document.addEventListener('DOMContentLoaded', function () {
  const deleteButton = document.getElementById('deleteBtn')
  const confirmPopup = document.getElementById('confirmPopup')
  const cancelButton = document.getElementById('cancelBtn')

  if (deleteButton) {
    deleteButton.addEventListener('click', function () {
      confirmPopup.style.display = 'flex'
    })
  }

  if (cancelButton) {
    cancelButton.addEventList2ener('click', function () {
      confirmPopup.style.display = 'none'
    })
  }
})

document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleSnippetsBtn')
  const snippetsPopup = document.getElementById('snippetsPopup')

  toggleButton.addEventListener('click', function (event) {
    event.stopPropagation() // Stoppar klick från att nå document.body direkt
    if (snippetsPopup.style.display === 'block') {
      snippetsPopup.style.opacity = '0'
      snippetsPopup.style.transform = 'translateY(-10px)'
      setTimeout(() => {
        snippetsPopup.style.display = 'none'
      }, 200)
    } else {
      snippetsPopup.style.display = 'block'
      setTimeout(() => {
        snippetsPopup.style.opacity = '1'
        snippetsPopup.style.transform = 'translateY(0)'
      }, 10)
    }
  })

  document.body.addEventListener('click', function (event) {
    if (!snippetsPopup.contains(event.target) && event.target !== toggleButton) {
      snippetsPopup.style.opacity = '0'
      snippetsPopup.style.transform = 'translateY(-10px)'
      setTimeout(() => {
        snippetsPopup.style.display = 'none'
      }, 200)
    }
  })
})
