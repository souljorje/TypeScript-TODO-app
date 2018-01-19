interface TodoInterface {
  input: string;
  list: string;
  listItem: string;
  removeButton: string;
};

class TodoApp implements TodoInterface {
  input: string;
  addButton: string;
  list: string;
  listItem: string;
  removeButton: string;
  options: object;
  constructor(options) {
    this.input = options.input;
    this.addButton = options.addButton;
    this.list = options.list;
    this.listItem = options.listItem;
    this.removeButton = options.removeButton;
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  private createNewElement(tag: string, attrs: object): HTMLElement {
    const el = document.createElement(tag);
    for (let attr in attrs) {
      el.setAttribute(attr, attrs[attr]);
    }
    return el;
  }

  public bindEvents(): void {
    document.querySelector(`.${this.addButton}`).addEventListener('click', this.add);
    document.body.addEventListener('click', (e) => this.remove(e));
    document.body.addEventListener('click', (e) => this.toggle(e));
  }

  public add(): void {
    const inputValue = document.querySelector<HTMLInputElement>(`.${this.input}`).value;
    if (inputValue.length) {
      const li = this.createNewElement('li', {
        'class': this.listItem,
      });
      const text = document.createTextNode(inputValue);
      const removeButton = this.createNewElement('span', {
        'class': this.removeButton,
      })
      li.appendChild(text);
      li.appendChild(removeButton);
      document.querySelector<HTMLUListElement>(`.${this.list}`).appendChild(li);
      document.querySelector<HTMLInputElement>(`.${this.input}`).value = '';
    } else {
      alert('Write something!')
    }
  }

  public remove(e): void {
    if (e.target.classList.contains((this.removeButton))) {
      e.target.closest(`.${this.listItem}`).style.display = 'none';
    }
  }

  public toggle(e): void {
    if (e.target.classList.contains(this.listItem)) {
      e.target.classList.toggle(`${this.listItem}_is_checked`)
    }
  }
}

const MyTodo = new TodoApp({
  input: 'todo__input',
  addButton: 'todo__button',
  list: 'todo__list',
  listItem: 'todo__item',
  removeButton: 'todo__remove',
});

MyTodo.bindEvents();