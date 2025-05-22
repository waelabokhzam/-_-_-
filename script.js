document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const usernameField = document.getElementById('usernameField');
  const phoneField = document.getElementById('phoneField');
  const emailField = document.getElementById('emailField');
  const passwordField = document.getElementById('passwordField');
  const confirmPasswordField = document.getElementById('confirmPasswordField');
  const username = document.getElementById('username');
  const numberPhone = document.getElementById('number');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const submitBtn = document.querySelector('.submit-btn');
  const btnLoader = document.querySelector('.btn-loader');
  const btnText = document.querySelector('.submit-btn span');
  const modal = document.getElementById('success-modal');
  const continueBtn = document.getElementById('continue-btn');
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  const strengthBar = document.querySelector('.strength-bar');
  const passwordStrength = document.querySelector('.password-strength');

  // Toggle password visibility
  togglePasswordButtons.forEach(button => {
      button.addEventListener('click', () => {
          const input = button.previousElementSibling.previousElementSibling;
          if (input.type === 'password') {
              input.type = 'text';
              button.classList.remove('fa-eye-slash');
              button.classList.add('fa-eye');
          } else {
              input.type = 'password';
              button.classList.remove('fa-eye');
              button.classList.add('fa-eye-slash');
          }
      });
  });

  // Show password strength meter on focus
  password.addEventListener('focus', () => {
      passwordStrength.style.display = 'block';
  });

  // Hide password strength meter on blur (if empty)
  password.addEventListener('blur', () => {
      if (!password.value) {
          passwordStrength.style.display = 'none';
      }
  });

  // Check password strength
  password.addEventListener('input', checkPasswordStrength);

  function checkPasswordStrength() {
      const val = password.value;
      const strength = calculatePasswordStrength(val);
      
      // Update strength bar
      strengthBar.style.width = `${strength}%`;
      
      // Update color based on strength
      if (strength < 30) {
          strengthBar.style.backgroundColor = '#f44336'; // Red
      } else if (strength < 60) {
          strengthBar.style.backgroundColor = '#ff9800'; // Orange
      } else {
          strengthBar.style.backgroundColor = '#4caf50'; // Green
      }
  }

  function calculatePasswordStrength(password) {
      if (!password) return 0;
      
      let strength = 0;
      
      // Length contribution
      if (password.length >= 8) {
          strength += 25;
      } else {
          strength += (password.length / 8) * 25;
      }
      
      // Complexity contribution
      if (/[A-Z]/.test(password)) strength += 15; // Uppercase
      if (/[a-z]/.test(password)) strength += 15; // Lowercase
      if (/[0-9]/.test(password)) strength += 15; // Numbers
      if (/[^A-Za-z0-9]/.test(password)) strength += 20; // Special characters
      
      // Variety contribution
      const uniqueChars = new Set(password).size;
      strength += (uniqueChars / password.length) * 10;
      
      return Math.min(100, strength);
  }

  // Validate fields on input
  username.addEventListener('input', () => validateField(usernameField, username, validateUsername));
  numberPhone.addEventListener('input', () => validateField(phoneField, numberPhone, validatePhoneNumber));
  email.addEventListener('input', () => validateField(emailField, email, validateEmail));
  confirmPassword.addEventListener('input', () => validateField(confirmPasswordField, confirmPassword, validateConfirmPassword));

  function validateField(fieldElement, inputElement, validationFunction) {
      const errorMessage = fieldElement.querySelector('.error-message');
      const result = validationFunction(inputElement.value);
      
      if (!result.valid) {
          fieldElement.classList.add('error');
          fieldElement.classList.remove('success');
          errorMessage.textContent = result.message;
      } else {
          fieldElement.classList.remove('error');
          fieldElement.classList.add('success');
          errorMessage.textContent = '';
      }
  }

  function validateUsername(value) {
      if (!value) {
          return { valid: false, message: 'الرجاء إدخال اسم المستخدم' };
      }
      
      if (value.length < 3) {
          return { valid: false, message: 'يجب أن يحتوي اسم المستخدم على 3 أحرف على الأقل' };
      }
      
      if (!/^[a-zA-Z0-9\u0600-\u06FF_\-]*$/.test(value)) {
          return { valid: false, message: 'يجب أن يحتوي اسم المستخدم على أحرف وأرقام وشرطة سفلية فقط' };
      }
      
      return { valid: true };
  }

  function validateEmail(value) {
      if (!value) {
          return { valid: false, message: 'الرجاء إدخال البريد الإلكتروني' };
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
          return { valid: false, message: 'الرجاء إدخال بريد إلكتروني صالح' };
      }
      
      return { valid: true };
  }

  function validatePhoneNumber(value) {
      if (!/^\d+$/.test(value)) {
          return { valid: false, message: 'الرجاء إدخال ارقام فقط' };
      }
      
      return { valid: true };
  }

  function validatePassword(value) {
      if (!value) {
          return { valid: false, message: 'الرجاء إدخال كلمة المرور' };
      }
      
      if (value.length < 8) {
          return { valid: false, message: 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل' };
      }
      
      const strength = calculatePasswordStrength(value);
      if (strength < 50) {
          return { valid: false, message: 'كلمة المرور ضعيفة جداً. أضف أحرف كبيرة وصغيرة وأرقام ورموز.' };
      }
      
      return { valid: true };
  }

  function validateConfirmPassword(value) {
      if (!value) {
          return { valid: false, message: 'الرجاء تأكيد كلمة المرور' };
      }
      
      if (value !== password.value) {
          return { valid: false, message: 'كلمات المرور غير متطابقة' };
      }
      
      return { valid: true };
  }

  // Form submission
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate all fields
      const isUsernameValid = validateUsername(username.value).valid;
      const isPhoneValid = validatePhoneNumber(numberPhone.value).valid;
      const isEmailValid = validateEmail(email.value).valid;
      const isPasswordValid = validatePassword(password.value).valid;
      const isConfirmPasswordValid = validateConfirmPassword(confirmPassword.value).valid;
      
      // Update UI for each field
      validateField(usernameField, username, validateUsername);
      validateField(phoneField, numberPhone, validatePhoneNumber);
      validateField(emailField, email, validateEmail);
      validateField(passwordField, password, validatePassword);
      validateField(confirmPasswordField, confirmPassword, validateConfirmPassword);
      
      // If all fields are valid, proceed with form submission
      if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isPhoneValid) {
          // Show loading state
          btnText.style.opacity = '0';
          btnLoader.style.display = 'block';
          submitBtn.disabled = true;
          
          // Simulate API call
          setTimeout(() => {
              // Hide loading state
              btnText.style.opacity = '1';
              btnLoader.style.display = 'none';
              submitBtn.disabled = false;
              
              // Show success modal
              modal.classList.add('show');
          }, 2000);
      }
  });

  // Continue button in success modal
  continueBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      form.reset();
      
      // Reset UI state
      document.querySelectorAll('.input-field').forEach(field => {
          field.classList.remove('success', 'error');
      });
      
      strengthBar.style.width = '0';
      passwordStrength.style.display = 'none';
  });

  // Add animation to form fields on load
  const inputGroups = document.querySelectorAll('.input-group');
  inputGroups.forEach((group, index) => {
      group.style.opacity = '0';
      group.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
          group.style.transition = 'all 0.3s ease';
          group.style.opacity = '1';
          group.style.transform = 'translateY(0)';
      }, 100 + (index * 100));
  });

  // Social media buttons hover animation
  const socialButtons = document.querySelectorAll('.social-icon');
  socialButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
          button.style.transform = 'scale(1.1) translateY(-3px)';
          button.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
      });
      
      button.addEventListener('mouseleave', () => {
          button.style.transform = '';
          button.style.boxShadow = '';
      });
  });

  // Add floating effect to social buttons
  socialButtons.forEach((button, index) => {
      setInterval(() => {
          button.style.transform = 'translateY(-3px)';
          setTimeout(() => {
              button.style.transform = 'translateY(0)';
          }, 500);
      }, 2000 + (index * 400));
  });
});

let input_image= document.getElementById('image');
let text_image= document.getElementById('text-image');


text_image.addEventListener('click',()=>{
  input_image.click();
});

input_image.addEventListener('change',()=>{
  console.log(input_image.value);
  text_image.value=input_image.value;
})