;
var TodoApp = /** @class */ (function () {
    function TodoApp(options) {
        this.input = options.input;
        this.addButton = options.addButton;
        this.list = options.list;
        this.listItem = options.listItem;
        this.removeButton = options.removeButton;
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    TodoApp.prototype.createNewElement = function (tag, attrs) {
        var el = document.createElement(tag);
        for (var attr in attrs) {
            el.setAttribute(attr, attrs[attr]);
        }
        return el;
    };
    TodoApp.prototype.bindEvents = function () {
        var _this = this;
        document.querySelector("." + this.addButton).addEventListener('click', this.add);
        document.body.addEventListener('click', function (e) { return _this.remove(e); });
        document.body.addEventListener('click', function (e) { return _this.toggle(e); });
    };
    TodoApp.prototype.add = function () {
        var inputValue = document.querySelector("." + this.input).value;
        if (inputValue.length) {
            var li = this.createNewElement('li', {
                'class': this.listItem
            });
            var text = document.createTextNode(inputValue);
            var removeButton = this.createNewElement('span', {
                'class': this.removeButton
            });
            li.appendChild(text);
            li.appendChild(removeButton);
            document.querySelector("." + this.list).appendChild(li);
            document.querySelector("." + this.input).value = '';
        }
        else {
            alert('Write something!');
        }
    };
    TodoApp.prototype.remove = function (e) {
        if (e.target.classList.contains((this.removeButton))) {
            e.target.closest("." + this.listItem).style.display = 'none';
        }
    };
    TodoApp.prototype.toggle = function (e) {
        if (e.target.classList.contains(this.listItem)) {
            e.target.classList.toggle(this.listItem + "_is_checked");
        }
    };
    return TodoApp;
}());
var MyTodo = new TodoApp({
    input: 'todo__input',
    addButton: 'todo__button',
    list: 'todo__list',
    listItem: 'todo__item',
    removeButton: 'todo__remove'
});
MyTodo.bindEvents();
