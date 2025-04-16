// HTML 로딩 완료 후 실행
document.addEventListener('DOMContentLoaded', function () {
    // ===== 요소 가져오기 =====
    const emailInput = document.getElementById('email'); // 이메일 입력 필드
    const passwordInput = document.getElementById('password'); // 비밀번호 입력 필드
    const loginButton = document.getElementById('loginButton'); // 로그인 버튼
    const emailError = document.getElementById('email-error'); // 이메일 에러 메시지 표시 영역
    const passwordError = document.getElementById('password-error'); // 비밀번호 에러 메시지 표시 영역
    const emailLabel = document.getElementById('email-label'); // 이메일 라벨
    const passwordLabel = document.getElementById('password-label'); // 비밀번호 라벨
  
    let isLoginAttempted = false; // 로그인 버튼을 클릭했는지 여부
  
    // ===== 공통 유틸 함수들 =====
  
    // 입력 필드/라벨/에러 메시지를 기본 스타일(회색)로 초기화
    function resetStyles(input, label, errorDiv) {
      input.style.borderColor = '#ccc';
      label.style.color = 'gray';
      errorDiv.textContent = '';
    }
  
    // 유효한 입력일 때: 하늘색 스타일 적용
    function applyValid(input, label) {
      input.style.borderColor = '#66c4ff';
      label.style.color = '#66c4ff';
    }
  
    // 에러 메시지 출력 + 선택적으로 스타일 적용
    // applyStyle === false 면 메시지만 표시하고 테두리/라벨 색은 바꾸지 않음
    function applyError(input, label, errorDiv, message, applyStyle = true) {
      if (applyStyle) {
        input.style.borderColor = '#ff5c5c';
        label.style.color = '#ff5c5c';
      }
  
      errorDiv.textContent = '* ' + message;
      errorDiv.style.color = '#ff5c5c';
      errorDiv.style.fontSize = '11px';
    }
  
    // blur 시 값이 비어있다면 기본 회색 스타일로 초기화
    function setNeutralIfEmpty(input, label, errorDiv) {
      if (!input.value.trim()) {
        resetStyles(input, label, errorDiv);
      }
    }
  
    // ===== 로그인 버튼 클릭 처리 =====
    loginButton.addEventListener('click', function (e) {
      e.preventDefault(); // 폼 제출 방지
      isLoginAttempted = true; // 로그인 시도 상태 true
  
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      let hasError = false;
  
      // 이메일 유효성 검사
      if (email === '' || !email.includes('com')) {
        applyError(emailInput, emailLabel, emailError, '이메일을 입력해주세요.');
        emailInput.focus(); // 이메일로 포커스 이동
        hasError = true;
      }
  
      // 비밀번호 유효성 검사
      if (password === '') {
        applyError(passwordInput, passwordLabel, passwordError, '비밀번호를 입력해주세요.', false);
        passwordLabel.style.color = '#ff5c5c'; // ❗ 라벨 색상 직접 적용
        if (!hasError) passwordInput.focus();
        hasError = true;
      }
  
      // 유효할 경우 처리
      if (!hasError) {
        alert('로그인 시도 중...');
      }
    });
  
    // ===== 이메일 입력 시 실시간 처리 =====
    emailInput.addEventListener('input', function () {
      const val = emailInput.value.trim();
  
      if (val.includes('com')) {
        // 'com' 포함된 이메일이면 유효 → 하늘색 적용
        applyValid(emailInput, emailLabel);
        emailError.textContent = '';
      } else {
        // 로그인 시도 이후면 에러 표시
        if (isLoginAttempted) {
          applyError(emailInput, emailLabel, emailError, '이메일을 입력해주세요.');
        } else {
          // 로그인 시도 전이면 포커스 상태가 아닐 때만 회색 초기화
          if (document.activeElement !== emailInput) {
            resetStyles(emailInput, emailLabel, emailError);
          }
        }
      }
    });
  
    // ===== 비밀번호 입력 시 실시간 처리 =====
    passwordInput.addEventListener('input', function () {
      const val = passwordInput.value.trim();
  
      if (val.length > 0) {
        // 유효한 입력일 경우
        applyValid(passwordInput, passwordLabel);
        passwordError.textContent = '';
      } else {
        // 값이 사라졌을 때
        if (isLoginAttempted) {
          applyError(passwordInput, passwordLabel, passwordError, '비밀번호를 입력해주세요.');
        } else {
          // 로그인 시도 전이면 포커스 아닌 경우만 초기화
          if (document.activeElement !== passwordInput) {
            resetStyles(passwordInput, passwordLabel, passwordError);
          }
        }
      }
    });
  
    // ===== 이메일 포커스 시 처리 =====
    emailInput.addEventListener('focus', function () {
      const val = emailInput.value.trim();
  
      if (isLoginAttempted && (val === '' || !val.includes('com'))) {
        // 로그인 시도 후 + 유효하지 않다면 → 빨간색
        emailInput.style.borderColor = '#ff5c5c';
        emailLabel.style.color = '#ff5c5c';
      } else {
        // 그 외는 하늘색
        applyValid(emailInput, emailLabel);
      }
    });
  
    // ===== 비밀번호 포커스 시 처리 =====
    passwordInput.addEventListener('focus', function () {
      const val = passwordInput.value.trim();
  
      if (isLoginAttempted && val === '') {
        passwordInput.style.borderColor = '#ff5c5c';
        passwordLabel.style.color = '#ff5c5c';
      } else {
        applyValid(passwordInput, passwordLabel);
      }
    });
  
    // ===== 이메일 포커스 해제 시 처리 =====
    emailInput.addEventListener('blur', function () {
      emailInput.style.borderColor = '#ccc';
  
      if (isLoginAttempted && (!emailInput.value.trim() || !emailInput.value.includes('com'))) {
        // 유효하지 않으면 빨간색 라벨 유지
        emailLabel.style.color = '#ff5c5c';
      } else {
        emailLabel.style.color = 'gray';
      }
    });
  
    // ===== 비밀번호 포커스 해제 시 처리 =====
    passwordInput.addEventListener('blur', function () {
      passwordInput.style.borderColor = '#ccc';
  
      if (isLoginAttempted && !passwordInput.value.trim()) {
        passwordLabel.style.color = '#ff5c5c';
      } else {
        passwordLabel.style.color = 'gray';
      }
    });
  });
  