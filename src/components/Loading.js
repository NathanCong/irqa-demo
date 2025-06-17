/**
 * 显示 Loading
 * @param {string} message 提示消息
 */
function showLoading(message) {
  let loadingDiv = document.querySelector('.global-loading');
  if (!loadingDiv) {
    loadingDiv = document.createElement('div');
    loadingDiv.textContent = message;
    loadingDiv.classList.add('global-loading');
    document.body.appendChild(loadingDiv);
  }
}

/**
 * 隐藏 Loading
 */
function hideLoading() {
  let loadingDiv = document.querySelector('.global-loading');
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

module.exports = { showLoading, hideLoading };
