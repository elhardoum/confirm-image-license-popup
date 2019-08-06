(function()
{
  var script = document.createElement('script')
    , load = function()
    {
      var appScript = document.createElement('script')
      appScript.async = true
      appScript.src = ConfirmImageLicensePopup.root + ( '_asyncSupport' in window && window._asyncSupport ? 'async' : 'legacy' ) + '.js'
      document.head.appendChild(appScript)
    }

  document.head.appendChild(script)
  script.onload = load
  script.onerror = load
  script.async = true
  script.src = ConfirmImageLicensePopup.root + 'support.js'
})()