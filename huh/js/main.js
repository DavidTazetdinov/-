document.addEventListener('DOMContentLoaded', function() {
    new Tasks;
});


class Tasks {
    constructor(args) {
        this.task_input = document.querySelector('.task_name');
        this.task_submit = document.querySelector('.task_add');
        this.tasks_lists_container = document.querySelector('.tasks_lists_layout');
        this.new_tasks_list = document.querySelector('.tasks_lists_active_container ul');
        this.tasks_trash_clear = document.querySelector('.tasks_clear');

        this.dragged_elment = null;
        this.parent_container = null;

        this.actions_init();
    }

    actions_init() {
        if(this.task_submit) {
            this.task_submit.addEventListener('click', event => {
                let task_name = this.task_input.value;
                if(!task_name || !this.new_tasks_list) return;
                this.new_task_add(task_name, this.new_tasks_list);
            });
        }

        if(this.tasks_lists_container) {
            this.tasks_lists_container.addEventListener('mousedown', event => {
                if(!event.target.classList.contains('task')) return;
                this.task_drag_start(event.target);
            });
            
            this.tasks_lists_container.addEventListener('mouseup', event => {
                let tasks_list_container = event.target.closest('.tasks_list_container');
                if(!tasks_list_container || !this.dragged_elment) return;
                this.task_drag_stop(tasks_list_container);
            });
        }

        if(this.tasks_trash_clear) {
            this.tasks_trash_clear.addEventListener('click', event => {
                this.tasks_clear();
            });
        }
    }

    new_task_add(task_name, tasks_list) {
        let list_container = tasks_list.closest('.tasks_list_container');
        let new_task = document.createElement('li');
        new_task.classList.add('task');
        new_task.innerText = task_name;
        tasks_list.prepend(new_task);
        list_container.classList.remove('empty_list_container');
    }
    task_drag_start(dragged_elment) {
        this.parent_container = dragged_elment.closest('.tasks_list_container');
        this.dragged_elment = dragged_elment;
    }
    task_drag_stop(tasks_list_container) {
        let tasks_list = tasks_list_container.querySelector('.tasks_list');
        if(!tasks_list) {
            this.parent_container = null;
            return;
        }
        tasks_list.prepend(this.dragged_elment);
        tasks_list_container.classList.remove('empty_list_container');
        this.dragged_elment = null;
        this.parent_list_check();
    }
    parent_list_check() {
        if(!this.parent_container) return;
        let parent_list = this.parent_container.querySelector('.tasks_list');
        if(parent_list.childNodes.length < 1) {
            this.parent_container.classList.add('empty_list_container');
            this.parent_container = null;
        }
    }
    tasks_clear() {
        let trash_list = this.tasks_trash_clear.parentElement.querySelector('.tasks_list');
        let tasks = trash_list.querySelectorAll('.task');
        tasks.forEach(task => task.remove());
        this.tasks_trash_clear.parentElement.classList.add('empty_list_container');
    }
}