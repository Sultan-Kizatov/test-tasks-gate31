const showDataOnView = (data, wrapper) => {
  let blocks = document.querySelectorAll('.block');

  blocks.length && blocks.forEach((block) => wrapper.removeChild(block));

  // create blocks
  for (let i = 0; i < data.length; i++) {
    let div = document.createElement('div');
    wrapper.append(div);
    div.classList.add('block');

    let title = document.createElement('h2');
    title.innerHTML = data[i].title;
    title.classList.add('title');
    div.append(title);

    let descr = document.createElement('div');
    descr.innerHTML = data[i].body;
    descr.classList.add('descr');
    div.append(descr);

    let check = document.createElement('input');
    check.classList.add('check');
    div.append(check);
    check.type = 'checkbox';

    check.addEventListener('click', () => {
      div.classList.toggle('bg');
      title.classList.toggle('color');
      descr.classList.toggle('color');
    });
  }
};

const clickButtonFilteredData = (inputString, data, wrapper) => {
  const filteredData = data.filter((dataItem) => {
    return dataItem.title.indexOf(inputString, 0) === -1 ? false : true;
  });

  // show data on dom
  showDataOnView(filteredData, wrapper);
};

fetch('https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7')
  .then((response) => response.json())
  .then((data) => {
    // find dom elements
    const container = document.querySelector('.container');
    const wrapper = document.querySelector('.wrapper');

    // filter button
    const buttonSearch = document.querySelector('.search');

    // filter input
    const filterInput = document.querySelector('.input');

    // show data on dom
    showDataOnView(data, wrapper);

    // filter event
    buttonSearch.addEventListener('click', () => {
      clickButtonFilteredData(filterInput.value, data, wrapper);
    });
    document.addEventListener('keydown', (e) => {
      if (e.which === 13) {
        clickButtonFilteredData(filterInput.value, data, wrapper);
      }
    });
  })
  .catch((error) => {
    return error;
  });
