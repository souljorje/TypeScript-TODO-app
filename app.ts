class TodoApp {
    input: object;
    addButton: object;
    list: object;
    listItem: string;
    removeButton: string;
    constructor(options) {
        this.input = document.querySelector(options.input);
        this.addButton = document.querySelector(options.addButton)
        this.list = document.querySelector(options.list);
        this.listItem = options.listItem;
        this.removeButton = options.removeButton;
        this.createNewElement = this.createNewElement.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    private createNewElement(tag: string, attrs: object): object {
        let el = document.createElement(tag);
        for (let attr in attrs) {
            el.setAttribute(attr, attrs[attr]);
        }
        return el;
    }

    private init(): void {
        this.addButton.addEventListener('click', this.add);
        document.body.addEventListener('click', (e) => this.remove(e));
        document.body.addEventListener('click', (e) => this.toggle(e));
    }

    public add(): void {
        let inputValue = this.input.value;
        if (inputValue.length) {
            let li = this.createNewElement('li', {
                'class': this.listItem,
            });
            let text = document.createTextNode(inputValue);
            let removeButton = this.createNewElement('span', {
                'class': this.removeButton,
            })
            li.appendChild(text);
            li.appendChild(removeButton);
            this.list.appendChild(li);
            this.input.value = '';
        } else {
            alert('Write something!')
        }
    }

    public remove(e): void {
        if (e.target.classList.contains(this.removeButton)) {
            e.target.closest('.' + this.listItem).style.display = 'none';
        }
    }

    public toggle(e): void {
        if (e.target.classList.contains(this.listItem)) {
            e.target.classList.toggle(this.listItem + '_is_checked')
        }
    }
}

const MyTodo = new TodoApp({
    input: '.todo__input',
    addButton: '.todo__button',
    list: '.todo__list',
    listItem: 'todo__item',
    removeButton: 'todo__remove',
});

MyTodo.init();