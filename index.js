var STORAGE_KEY = 'vue-todo';

var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );
    todos.foreach(function (todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

var mv = new Vue({
  el: '#app',
  data: {
    todos: [
      { id: 1, comment: "TODOを作る", state: 0 }
    ]
  },
  methods: {

  }
});