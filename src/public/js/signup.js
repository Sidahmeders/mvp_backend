document.querySelector('#boyButton').onclick = function () {
  document
    .querySelector('#boyButton')
    .querySelector('.invisibleText').style.color = 'black'
  document
    .querySelector('#girlButton')
    .querySelector('.invisibleText').style.color = 'white'
}

document.querySelector('#girlButton').onclick = function () {
  document
    .querySelector('#boyButton')
    .querySelector('.invisibleText').style.color = 'white'
  document
    .querySelector('#girlButton')
    .querySelector('.invisibleText').style.color = 'black'
}

window.onload = function () {
  document.querySelector('#loginToggle').click()
}

document.querySelector('#loginToggle').addEventListener('click', function () {
  document.querySelector('#loginForm').style.display = 'block'
  document.querySelector('#signUpForm').style.display = 'none'
  document.querySelector('#forgotPasswordForm1').style.display = 'none'
  document.querySelector('#forgotPasswordForm2').style.display = 'none'
  document.querySelector('#forgotPasswordForm3').style.display = 'none'
})

document.querySelector('#signUpToggle').addEventListener('click', function () {
  document.querySelector('#loginForm').style.display = 'none'
  document.querySelector('#forgotPasswordForm1').style.display = 'none'
  document.querySelector('#forgotPasswordForm2').style.display = 'none'
  document.querySelector('#forgotPasswordForm3').style.display = 'none'
  document.querySelector('#signUpForm').style.display = 'block'
})

document
  .querySelector('#forgotPasswordToggle')
  .addEventListener('click', function () {
    document.querySelector('#loginForm').style.display = 'none'
    document.querySelector('#signUpForm').style.display = 'none'
    document.querySelector('#forgotPasswordForm1').style.display = 'block'
    document.querySelector('#forgotPasswordForm2').style.display = 'none'
    document.querySelector('#forgotPasswordForm3').style.display = 'none'
    document.querySelector('#loginOrSignUp').style.display = 'none'
  })

let function1 = function () {
  document.querySelector('#loginForm').style.display = 'none'
  document.querySelector('#signUpForm').style.display = 'none'
  document.querySelector('#forgotPasswordForm1').style.display = 'none'
  document.querySelector('#forgotPasswordForm2').style.display = 'block'
  document.querySelector('#forgotPasswordForm3').style.display = 'none'
  document.querySelector('#loginOrSignUp').style.display = 'none'
  return false
}

let function2 = function () {
  document.querySelector('#loginForm').style.display = 'none'
  document.querySelector('#signUpForm').style.display = 'none'
  document.querySelector('#forgotPasswordForm1').style.display = 'none'
  document.querySelector('#forgotPasswordForm2').style.display = 'none'
  document.querySelector('#forgotPasswordForm3').style.display = 'block'
  document.querySelector('#loginOrSignUp').style.display = 'none'
  return false
}
