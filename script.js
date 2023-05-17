import allItems from './items.json' assert {type: 'json'};
const craftTable = document.querySelector('.craft-table')
const result = document.querySelector('.result')
const btnClear = document.querySelector('.btn-clear')
const items = document.querySelectorAll('.item')
let over = 0;
let curItem = '';
let source;
items.forEach( item => {
  item.addEventListener('dragstart', (e) => {
    curItem = e.target.id
  })
  item.addEventListener('dragend', (e) => {

    curItem = '';
    
  })
});

const craft = async () => {
  const cells = document.querySelectorAll('.content')
  let arr = []
  console.log(cells);
  let created = ''
  cells.forEach((e) => arr.push(e.id))
  allItems.forEach((i) => {
    if( i.patern.toString() === arr.toString() ) {
      created = i.name;
      console.log('name', created);
    }
  })
  result.id = created;

}

for (let index = 1; index <= 9; index += 1) {
  const cell = document.createElement('div')
  cell.classList.add('table-cell')
  //
  const x = document.createElement('div')
  x.classList.add('remove')
  x.innerHTML = 'x'
  //
  const content = document.createElement('div')
  content.classList.add('content')
  content.classList.add(`cell-${index}`)
  content.draggable = true;
  content.name = index;
  content.addEventListener('dragstart', (e) => {
    console.log(e.target);
    source = e.target
    curItem = e.target.id
    e.target.id = '';
  })
  content.addEventListener(
    "dragover",
    (event) => {
      // prevent default to allow drop
      event.preventDefault();
      craft();
    },
    false
  );
  content.addEventListener('dragenter',({ target }) => {
    over = target.id;
  })
  content.addEventListener('drop', (e) => {
    e.preventDefault();

    e.target.id = curItem
    craft();
  } )
  cell.appendChild(x)
  cell.appendChild(content)
  x.addEventListener('click', () => {
    content.id = ''
    craft();
  })
  craftTable.appendChild(cell)
}

btnClear.addEventListener('click', () => {
  const cells = document.querySelectorAll('.content')
  cells.forEach(c => c.id = ''); 
  
})