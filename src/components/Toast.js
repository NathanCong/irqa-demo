/**
 * 显示 Toast
 * @param {string} message 提示消息
 * @param {number} seconds 提示时间，单位：毫秒
 */
function showToast(message, seconds = 1500) {
  let toastDiv = document.querySelector('.global-toast');
  if (!toastDiv) {
    toastDiv = document.createElement('div');
    toastDiv.textContent = message;
    toastDiv.classList.add('global-toast');
    document.body.appendChild(toastDiv);
    let timer = setTimeout(() => {
      toastDiv.remove();
      clearTimeout(timer);
    }, seconds);
  }
}

module.exports = { showToast };
