(function($)
{
  var xhrSend = window.XMLHttpRequest.prototype.send
    , xhrOpen = window.XMLHttpRequest.prototype.open

  window.XMLHttpRequest.prototype.open = function(method, url)
  { 
    return (this.__url=url), xhrOpen.apply(this, arguments)
  }

  window.XMLHttpRequest.prototype.send = function(body)
  {
    if ( body.toString().indexOf('attachment_id') >= 0 || ! /async\-upload\.php$/.test(this.__url) )
      return xhrSend.apply(this, arguments)

    if ( ! confirm( ConfirmImageLicensePopup.i18n.confirm ) )
      arguments[0].append('unconfirmed', 1)
                 
    return xhrSend.apply(this, arguments)
  }

})( window.jQuery )