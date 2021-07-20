const openSearchBoxFn = () => {
  if (mainWrapper) {
    mainWrapper.className = '--search-menu-is-open';
  }
}

const closeSearchBoxFn = () => {
  if (mainWrapper) {
    mainWrapper.className = '';
  }
}

const searchBoxIsOpenFn = () => {
  const className = mainWrapper?.className;
  let searchBoxIsOpen = false;

  if (typeof className === 'string') {
    searchBoxIsOpen = className.includes('--search-menu-is-open');
  }

  return searchBoxIsOpen;
}

const scrollToSection = (key) => {
  if (typeof key === 'string') {
    const element = document.getElementById(key);

    if (element.scrollIntoView) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
