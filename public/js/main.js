document.addEventListener('DOMContentLoaded', function () {
  const viewSnippetsButton = document.querySelector('#viewSnippets')
  viewSnippetsButton.addEventListener('click', function () {
    window.location.href = './snippets/snippets_list'
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const viewSnippetsButton = document.querySelector('#CreateSnippets')
  // Kontrollera om knappen finns innan vi lägger till event listener
  if (viewSnippetsButton) {
    viewSnippetsButton.addEventListener('click', function () {
      window.location.href = './snippets/create'
    })
  }
})
