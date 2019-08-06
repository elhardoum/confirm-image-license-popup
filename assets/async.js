($ =>
{
  var xhrSend = window.XMLHttpRequest.prototype.send
    , xhrOpen = window.XMLHttpRequest.prototype.open
    , confirmDialog

  window.XMLHttpRequest.prototype.open = function(method, url)
  { 
    return (this.__url=url), xhrOpen.apply(this, arguments)
  }

  window.XMLHttpRequest.prototype.send = async function(body)
  {
    if ( body.toString().indexOf('attachment_id') >= 0 || ! /async\-upload\.php$/.test(this.__url) )
      return xhrSend.apply(this, arguments)

    if ( ! await confirmDialog() )
      arguments[0].append('unconfirmed', 1)
                 
    return xhrSend.apply(this, arguments)
  }

  confirmDialog = _ => new Promise((resolve, reject) =>
  {
    // show popup
    var popup = $(`<div style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:999999">
      <div style="background:rgba(241, 241, 241, 0.5019607843137255);width:100%;height:100%;position:absolute" class="__overlay"></div>

      <div style="position:relative;top:50%;background:white;box-shadow:0 15px 30px 0 rgba(0,0,0,.11),0 5px 15px 0 rgba(0,0,0,.08)!important;padding:1rem;width:500px;left:50%">
        <label style="display:table"><input type="checkbox" /> ${ConfirmImageLicensePopup.i18n.confirm2}</label><br/>
        <span class="button">${ConfirmImageLicensePopup.i18n.continue}</span>
        <span style="position:absolute;top:0;right:0;background:#ddd;padding:14px 10px;line-height:0;font-size:1rem;cursor:pointer;user-select:none">&times;</span>
      </div>
    </div>`).appendTo(document.body)

    $('.__overlay,span', popup).click(e => (resolve($('input', popup).prop('checked')), popup.remove()))

    $(window).on('resize', _ => popup && popup.children().eq(1).css({
      left: document.documentElement.clientWidth/2 - popup.children().eq(1).outerWidth()/2,
      top: document.documentElement.clientHeight/2 - popup.children().eq(1).outerHeight()/2,
    })).trigger('resize')
  })
})( window.jQuery )
