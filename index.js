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

Vue.component('todo-row', {
  props: ['item', 'index'],
  template: `
    <tr>
      <td>{{ item.id }}</td>
      <td>{{ item.comment }}</td>
      <td>
        <button class="btn btn-primary" v-on:click="doChangeState(item)">
          {{ item.state | stateText }}
        </button>
      </td>
      <td>
        <button class="btn btn-outline-danger" v-on:click="doRemove(index)">
          削除
        </button>
      </td>
    </tr>
  `,
  methods: {
    doChangeState: function (item) {
      this.$emit('change-state', item);
    },
    doRemove: function (index) {
      this.$emit('remove-item', index);
    }
  },
  filters: {
    stateText: function (val) {
      return ['作業中！', '完了!'][val];
    }
  }
})

var vm = new Vue({
  el: '#app',
  data: {
    title: 'Vue Todo',
    type: -1,
    todos: []
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
    changeState: function (item) {
      item.state = item.state ? 0 : 1
    },
    removeItem: function (index) {
      this.todos.splice(index, 1);
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
  created: function () {
    this.todos = todoStorage.fetch()
  }
});