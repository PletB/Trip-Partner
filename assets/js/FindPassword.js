document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const emailLabel = document.getElementById('email-label');
    const emailError = document.getElementById('email-error');
    const findButton = document.getElementById('find-password-button');
  
    let isFindAttempted = false;
  
    function resetStyles(input, label, errorDiv) {
      input.style.borderColor = '#ccc';
      label.style.color = 'gray';
      errorDiv.textContent = '';
    }
  
    function applyValid(input, label) {
      input.style.borderColor = '#66c4ff';
      label.style.color = '#66c4ff';
    }
  
    function applyError(input, label, errorDiv, message) {
      input.style.borderColor = '#ff5c5c';
      label.style.color = '#ff5c5c';
      errorDiv.textContent = '* ' + message;
      errorDiv.style.color = '#ff5c5c';
      errorDiv.style.fontSize = '11px';
    }
  
    findButton.addEventListener('click', function (e) {
      e.preventDefault();
      isFindAttempted = true;
  
      const val = emailInput.value.trim();
      if (val === '' || !val.includes('@') || !val.includes('com')) {
        applyError(emailInput, emailLabel, emailError, '올바른 이메일을 입력해주세요.');
        emailInput.focus(); // 🔹 여기서 포커스
      } else {
        applyValid(emailInput, emailLabel);
        emailError.textContent = '';
        alert('입력된 이메일로 비밀번호 재설정 링크를 전송합니다.');
      }
    });
  
    emailInput.addEventListener('input', () => {
      const val = emailInput.value.trim();
  
      if (val.includes('@') && val.includes('com')) {
        applyValid(emailInput, emailLabel);
        emailError.textContent = '';
      } else if (isFindAttempted) {
        applyError(emailInput, emailLabel, emailError, '올바른 이메일을 입력해주세요.');
      } else {
        resetStyles(emailInput, emailLabel, emailError);
      }
    });
  
    emailInput.addEventListener('focus', () => {
      const val = emailInput.value.trim();
      if (isFindAttempted && (val === '' || !val.includes('@') || !val.includes('com'))) {
        emailInput.style.borderColor = '#ff5c5c';
        emailLabel.style.color = '#ff5c5c';
      } else {
        applyValid(emailInput, emailLabel);
      }
    });
  
    emailInput.addEventListener('blur', () => {
      emailInput.style.borderColor = '#ccc';
      if (isFindAttempted && (!emailInput.value.trim() || !emailInput.value.includes('@') || !emailInput.value.includes('com'))) {
        emailLabel.style.color = '#ff5c5c';
      } else {
        emailLabel.style.color = 'gray';
      }
    });
  });
  