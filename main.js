// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const init = ()=>{

  const hideModal = document.getElementById('modal');
  const likeGlyphs = document.getElementsByClassName('like-glyph')
  const errorMessage = document.getElementById('modal-message')


  function toggleHeartColor(likeGlyph) {
    if (likeGlyph.classList.contains('activated-heart')) {
      likeGlyph.textContent = EMPTY_HEART; // Change back to empty heart
      likeGlyph.classList.remove('activated-heart'); // Remove the class
    } else {
      likeGlyph.textContent = FULL_HEART; // Change to full heart
      likeGlyph.classList.add('activated-heart'); // Add the class to make it red
    }
  }

  Array.from(likeGlyphs).forEach(likeGlyph => {
    likeGlyph.addEventListener('click', () => {
      mimicServerCall()
        .then(() => {
          // Simulate a successful server response
          toggleHeartColor(likeGlyph);
        })
        .catch(error => {
          if (hideModal) {
            hideModal.classList.remove('hidden');
            errorMessage.textContent = error;
          }
          setTimeout(() => {
            hideModal.classList.add('hidden');
          }, 3000); // Hide the modal after 3 seconds
        });
    });
  })
};
  
document.addEventListener('DOMContentLoaded',init)


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
