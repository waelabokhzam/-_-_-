document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const togglePassword = document.getElementById('togglePassword');
  const passwordField = document.getElementById('password');
  
  // Toggle password visibility
  togglePassword.addEventListener('click', function() {
      const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordField.setAttribute('type', type);
      
      // Change button text
      const iconText = type === 'password' ? 'عرض' : 'إخفاء';
      this.querySelector('i').textContent = iconText;
  });
  
  // Form submission handling
  loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const username = document.getElementById('username').value.trim();
      const password = passwordField.value;
      
      // Validate form
      if (username === '' || password === '') {
          showError('الرجاء إدخال اسم المستخدم وكلمة المرور');
          return;
      }
      
      // Here you would typically send data to your server
      console.log('Login attempt with:', { username, password });
      
      // Simulate successful login for demo purposes
      showSuccess('تم تسجيل الدخول بنجاح!');
      
      // Mock redirect after successful login
      setTimeout(() => {
          alert('سيتم توجيهك إلى الصفحة الرئيسية');
      }, 1500);
  });
  
  // Helper functions for displaying messages
  function showError(message) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      errorDiv.style.color = '#e74c3c';
      errorDiv.style.padding = '10px 0';
      errorDiv.style.textAlign = 'center';
      errorDiv.style.fontSize = '14px';
      
      // Remove any existing error messages
      const existingError = document.querySelector('.error-message');
      if (existingError) {
          existingError.remove();
      }
      
      loginForm.insertBefore(errorDiv, loginForm.firstChild);
      
      // Auto-remove after 3 seconds
      setTimeout(() => {
          errorDiv.remove();
      }, 3000);
  }
  
  function showSuccess(message) {
      const successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      successDiv.textContent = message;
      successDiv.style.color = '#2ecc71';
      successDiv.style.padding = '10px 0';
      successDiv.style.textAlign = 'center';
      successDiv.style.fontSize = '14px';
      
      // Remove any existing messages
      const existingError = document.querySelector('.error-message');
      if (existingError) {
          existingError.remove();
      }
      const existingSuccess = document.querySelector('.success-message');
      if (existingSuccess) {
          existingSuccess.remove();
      }
      
      loginForm.insertBefore(successDiv, loginForm.firstChild);
  }
  
  // Add focus/blur effects for better UX
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
      input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
          this.parentElement.classList.remove('focused');
      });
  });
});