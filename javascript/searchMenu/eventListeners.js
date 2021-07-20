document.addEventListener('click', function (event) {
  const clickInsideButtonOpenSearchBox = buttonOpenSearchBox.contains(event.target);
  const clickInsideButtonCloseSearchBox = buttonCloseSearchBox.contains(event.target);
  const clickOutsideSearchBox = !searchBox.contains(event.target);
  const searchBoxIsOpen = searchBoxIsOpenFn();

  if (clickInsideButtonOpenSearchBox) {
    openSearchBoxFn();
  }

  if (clickInsideButtonCloseSearchBox) {
    closeSearchBoxFn();
  }

  if (clickOutsideSearchBox && searchBoxIsOpen) {
    closeSearchBoxFn();
  }

  if (elementsWithScrollToArray) {
    elementsWithScrollToArray.forEach((elementWithScroll) => {
      const scrollToKey = elementWithScroll?.dataset?.scrollToKey;
      const clickInsideElementWithScroll = elementWithScroll.contains(event.target);

      if (scrollToKey && clickInsideElementWithScroll) {
        scrollToSection(scrollToKey);
      }
    });
  }
});
