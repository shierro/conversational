'use strict';
 $(document).ready(() => {
   let lastScrollTop = 0;
   let displaying = false;
   let pageLoad = false;

  // Elements
  const elems = {
    body: $('body'),
    header: $('.header'),
    content: $('.main-content'),
    logo: $('.header__content img'),
    panelLeft: $('.panel__left'),
    panelRight: $('.panel__right'),
    nextContent: $('.next-content'),
    nextSlider: $('div.next-slider'),
    messagesContainer: $('.message__container')
  }

  // Event Handlers
  const nextTransition = () => {
    elems.header.css('background-color', '#ffffff');
    elems.body.css('background-color', '#ffffff');
    elems.nextContent.css('display', 'flex');
    elems.logo.prop('src', './assets/logo-white.png');
    elems.content.fadeOut();
  }
  
  const showNextContent = () => {
    setTimeout(() => elems.panelLeft.fadeIn(), 800);
    setTimeout(() => elems.panelRight.fadeIn(), 1200);
  }

  const displayNextSlider = () => {
    elems.nextSlider
      .css('opacity', 1)
      .addClass('animated fadeInUp')
      .fadeIn();
    displaying = false;
  }

  const displayMessagesInSequence = () => {
    displaying = true;
    let messageCounter = 1;
    $.each(elems.messagesContainer, (index, messageContainer) => {
      console.log(messageCounter)
      setTimeout(() => showMessage(messageContainer), (messageCounter * 1000));
      messageCounter += $(messageContainer).find('.message__content').length;
    });
    setTimeout(displayNextSlider, (messageCounter - 1) * 1000);
  }

  const showMessage = (messages, index) => {
    const messageContainer = $(messages);
    const icon = messageContainer.find('.message__icon');
    const messageList = messageContainer.find('.message__content');
    if (icon.css('opacity') == 0) {
      setTimeout(() => icon
        .css('opacity', 1)
        .addClass('animated fadeInUp')
        .fadeIn(), (index + 1000));
    }

    $.each(messageList, (index, message) => {
      setTimeout(() => $(message)
        .css('opacity', 1)
        .addClass('animated fadeInUp')
        .fadeIn(), (index) * 1000);
    });
  }

  const handlePageLoad = () => {
    console.log('handlePageLoad')
    const firstMessage = elems.messagesContainer[0];
    showMessage(firstMessage);
    return pageLoad = true;
  }

  const handleScroll = () => {
    if(displaying) return;
    
    console.log('handle scroll!')
    displayMessagesInSequence();
  }

  const nextSlide = () => {
    document.removeEventListener('scroll', handleScroll, true);
    nextTransition();
    showNextContent();
  };

  // Events
  elems.nextSlider.click(nextSlide);
  
  document.addEventListener('scroll', handleScroll, true);
 });
