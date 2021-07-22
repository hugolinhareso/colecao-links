const openSearchBoxFn = () => {
  if (mainWrapper) {
    mainWrapper.className = '--search-menu-is-open';
    searchInput.focus();
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

const onClickSearchOption = (key) => {
  if (typeof key === 'string') {
    closeSearchBoxFn();
    scrollToSection(key);
  }
}

const addSearchOptionInSectionHTML = (elementToInsertOption, option) => {
  const {
    title,
    scrollToKey,
  } = option;

  if (
    elementToInsertOption &&
    typeof title === 'string' &&
    typeof scrollToKey === 'string'
  ) {
    elementToInsertOption.innerHTML += `<li onclick="onClickSearchOption('${scrollToKey}')" class="option button-base">${title}</li>`;
  }
}

const resetInnerHTMLSearchSections = () => {
  optionsSectionOne.innerHTML = '';
  optionsSectionTwo.innerHTML = '';
  optionsSectionThree.innerHTML = '';
  optionsSectionFour.innerHTML = '';
}

const renderSearchOptions = (searchText) => {
  fetch('../../data/menuOptions.json')
    .then(response => response.json())
    .then(menuOptions => {
      resetInnerHTMLSearchSections();
      let searchedMenuOptions = [];

      if (typeof searchText === 'string') {
        menuOptions.forEach(menuOption => {
          const searchTextLowerCase = searchText.toLowerCase();
          const optionTitleLowerCase = menuOption.title.toLowerCase();
          if (optionTitleLowerCase.includes(searchTextLowerCase)) {
            searchedMenuOptions.push(menuOption);
          }
        });
      } else {
        searchedMenuOptions.push(...menuOptions);
      }

      let menuOptionsSectioned = [];
      const sliceIterationsQuantity = Math.ceil(searchedMenuOptions?.length / 5);
      
      for (let index = 0; index < sliceIterationsQuantity; index++) {
        const optionsSection = searchedMenuOptions.splice(0, 5);
        menuOptionsSectioned.push(optionsSection);
      }

      menuOptionsSectioned.map((optionsSection, sectionIndex) => {
        optionsSection.map(option => {
          switch (sectionIndex) {
            case 0:
              addSearchOptionInSectionHTML(optionsSectionOne, option);
              break;
            case 1:
              addSearchOptionInSectionHTML(optionsSectionTwo, option);
              break;
            case 2:
              addSearchOptionInSectionHTML(optionsSectionThree, option);
              break;
            case 3:
              addSearchOptionInSectionHTML(optionsSectionFour, option);
              break;
          }
        });
      });
    });
}
renderSearchOptions();

const onChangeSearchValue = () => {
  const searchString = searchInput.value;
  renderSearchOptions(searchString);
}
