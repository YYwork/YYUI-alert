'use strict';

$.pop =

  _show: (message, title, type, callback)->
    $('body').append(
      '<div id="popup" class="pop-cover">'\
      +'  <div class="pop-windows">'\
      +'    <span class="pop-x">x</span>'\
      +'    <div class="pop-title">'\
      +'      <span class="pop-title-text">' + title + '</span>'\
      +'    </div>'\
      +'    <div class="pop-content">'\
      +'      <div class="pop-text">'\
      +'          <span>' + message + '</span>'\
      +'      </div>'\
      +'    </div>'\
      +'    <div class="pop-btn-group">'\
      +'      <button class="pop-cancel">取消</button>'\
      +'      <button class="pop-yes">确定</button>'\
      +'    </div>'\
      +'  </div>'\
      +'</div>')

    switch type
      when 'alert'
        $('.pop-yes').click ()->
          $.pop._hide()
          if callback
            callback(true)

        $('.pop-x').click ()->
          $.pop._hide()
          if callback
            callback(null)

      when 'confirm'
        $('.pop-yes').click ()->
          $.pop._hide()
          if callback
            callback(true)

        $('.pop-x, .pop-cancel').click ()->
          $.pop._hide()
          if callback
            callback(null)

      when 'toast'
        toastRemove = setInterval( ()->
          $('#popup').remove()
          clearInterval(toastRemove)
        , 10000)

      when 'form'
        $('.pop-text').addClass('pop-form-text').append(message)


  _hide: () ->
    $('#popup').remove()

  confirm: (message, title, callback)->
    $.pop._show(message, title, 'confirm', callback)
    if title == undefined || title == null || title = ''
      $('.pop-title').remove()

  alert: (message, title, callback)->
    $.pop._show(message, title, 'alert', callback)
    $('.pop-title, .pop-cancel').addClass('hidden')
    $('.pop-yes').addClass('pop-yes-line')

  toast: (message, title, callback)->
    $.pop._show(message, null, 'toast', callback)
    $('.pop-title, .pop-btn-group, .pop-x').remove()
    $('#popup').addClass('pop-toast')

  form: (form, title, callback)->
    $.pop._show(form, title, 'form', callback)
    $('.pop-cancel, .pop-text span').remove()
    $('.pop-yes').addClass('pop-yes-line')

