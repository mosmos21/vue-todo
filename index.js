var STORAGE_KEY = 'vue-todo';

var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );
    todos.forEach(function (todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

var vm = new Vue({
  el: '#app',
  data: {
    type: -1,
    todos: [
      { id: 1, comment: "TODOを作る", state: 0 }
    ]
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  methods: {
    getTodos: function () {
      return this.todos;
    },
    doAdd: function (event, value) {
      var comment = this.$refs.comment;
      if (!comment.value.length) {
        return;
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      });
      comment.value = '';
    },
    doChangeState: function (item) {
      item.state = item.state ? 0 : 1
    },
    doRemove: function (item) {
      var index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
    }
  },
  filters: {
    stateText: function (val) {
      return { 0: '作業中！', 1: '完了!' }[val];
    }
  },
  computed: {
    selectedTodo: function () {
      const type = this.type;
      return this.type == -1
        ? this.todos
        : this.todos.filter(function (item) {
          return item.state === Number(type);
        });
    }
  },
  created() {
    this.todos = todoStorage.fetch()
  }
});