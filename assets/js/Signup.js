document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('#signupForm input[type="text"], #signupForm input[type="password"]');
    const labels = document.querySelectorAll('#signupForm label');
    const errors = document.querySelectorAll('.error-message');
    const signupButton = document.querySelector('.signup-button');
  
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const nationalityRadios = document.querySelectorAll('input[name="nationality"]');
    const genderError = document.getElementById('gender-error');
    const genderLabel = [...labels].find(label => label.textContent.includes('성별 및 국적'));
  
    let isSignupAttempted = false;
  
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
  
    function setNeutralIfEmpty(input, label, errorDiv) {
      if (!input.value.trim()) {
        resetStyles(input, label, errorDiv);
      }
    }
  
    function checkRadioGroupSelected(radioGroup) {
      return [...radioGroup].some(radio => radio.checked);
    }
  
    function updateRadioButtonStyles() {
      const allRadios = [...document.querySelectorAll('.radio-button')];
      allRadios.forEach(btn => {
        const input = btn.querySelector('input[type="radio"]');
        const span = btn.querySelector('span');
        if (input.checked) {
          btn.style.borderColor = '#66c4ff';
          span.style.color = '#66c4ff';
          span.style.fontWeight = '600';
        } else {
          btn.style.borderColor = '#ccc';
          span.style.color = '#555';
          span.style.fontWeight = 'normal';
        }
      });
    }
  
    signupButton.addEventListener('click', function (e) {
      e.preventDefault();
      isSignupAttempted = true;
  
      let firstEmptyInput = null;
  
      inputs.forEach((input, idx) => {
        const label = labels[idx];
        const error = errors[idx];
        const val = input.value.trim();
  
        if (!val || (input.id === 'email' && !val.includes('com'))) {
          applyError(input, label, error, label.textContent + '을(를) 입력해주세요.');
          if (!firstEmptyInput) firstEmptyInput = input;
        } else {
          applyValid(input, label);
          error.textContent = '';
        }
      });
  
      // 성별 및 국적 미선택 시 에러 표시
      const genderSelected = checkRadioGroupSelected(genderRadios);
      const nationalitySelected = checkRadioGroupSelected(nationalityRadios);
  
      if (!genderSelected || !nationalitySelected) {
        genderLabel.style.color = '#ff5c5c';
        genderError.textContent = '* 성별 및 국적을 선택해주세요.';
        genderError.style.color = '#ff5c5c';
        document.querySelectorAll('.radio-button').forEach(btn => {
          btn.style.borderColor = '#ff5c5c';
          const span = btn.querySelector('span');
          span.style.color = '#ff5c5c';
        });
      }
  
      if (firstEmptyInput) {
        firstEmptyInput.focus();
        inputs.forEach((input, idx) => {
          if (input !== firstEmptyInput && !input.value.trim()) {
            const label = labels[idx];
            const error = errors[idx];
            input.style.borderColor = '#ccc';
  
            const inputId = input.getAttribute('id');
            if (["email", "password", "password-confirm", "birth"].includes(inputId)) {
              label.style.color = '#ff5c5c';
              error.textContent = '* ' + label.textContent + '을(를) 입력해주세요.';
              error.style.color = '#ff5c5c';
              error.style.fontSize = '11px';
            }
          }
        });
      }
      // ✅ 입력이 모두 정상일 경우 팝업
      if (!firstEmptyInput && genderSelected && nationalitySelected) {
         alert('회원정보 생성중..');
  }
    });
  
    inputs.forEach((input, idx) => {
      const label = labels[idx];
      const error = errors[idx];
      const inputId = input.getAttribute('id');
  
      input.addEventListener('focus', () => {
        const val = input.value.trim();
        if (isSignupAttempted && !val) {
          input.style.borderColor = '#ff5c5c';
          label.style.color = '#ff5c5c';
        } else {
          if (inputId === 'email') {
            if (val.includes('com')) applyValid(input, label);
          } else {
            applyValid(input, label);
          }
        }
      });
  
      input.addEventListener('blur', () => {
        const val = input.value.trim();
        if (isSignupAttempted && !val) {
          input.style.borderColor = '#ccc';
          if (["email", "password", "password-confirm", "birth"].includes(inputId)) {
            label.style.color = '#ff5c5c';
          } else {
            label.style.color = '#ff5c5c';
          }
        } else {
          input.style.borderColor = '#ccc';
          label.style.color = 'gray';
        }
      });
  
      input.addEventListener('input', () => {
        const val = input.value.trim();
        if (inputId === 'email') {
          if (val.includes('com')) {
            applyValid(input, label);
            error.textContent = '';
          } else if (isSignupAttempted) {
            applyError(input, label, error, label.textContent + '을(를) 입력해주세요.');
          } else {
            resetStyles(input, label, error);
          }
        } else {
          if (val.length > 0) {
            applyValid(input, label);
            error.textContent = '';
          } else if (isSignupAttempted) {
            applyError(input, label, error, label.textContent + '을(를) 입력해주세요.');
          } else {
            resetStyles(input, label, error);
          }
        }
      });
    });
  
    document.querySelectorAll('input[name="gender"], input[name="nationality"]').forEach(radio => {
      radio.addEventListener('change', () => {
        updateRadioButtonStyles();
        genderLabel.style.color = '#66c4ff';
        genderError.textContent = '';
      });
    });
  });
  