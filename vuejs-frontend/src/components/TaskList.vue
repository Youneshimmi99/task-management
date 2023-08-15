<template>
    <div class="p-4 bg-white shadow-md rounded-md">
        <h1 class="text-3xl font-bold mb-4 text-center">Task List</h1>
        <button @click="showAddTaskModal" class="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">Create New Task</button>
        <table class="w-full border-collapse">
            <thead>
                <tr>
                <th class="py-2 px-4 text-left border-b border-gray-300 w-[25%]">Title</th>
                <th class="py-2 px-4 text-left border-b border-gray-300 w-[35%]">Description</th>
                <th class="py-2 px-4 text-left border-b border-gray-300 w-[10%]">Completed</th>
                <th class="py-2 px-4 text-right border-b border-gray-300 w-[25%]"></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="tasks.length === 0">
                    <tr>
                        <td colspan="4" class="text-center pt-4">No tasks available</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="task in tasks" :key="task._id" class="border-b border-gray-300">
                        <td class="py-2 px-4">{{ task.title }}</td>
                        <td class="py-2 px-4">{{ task.description }}</td>
                        <td class="py-2 px-4">
                            <input type="checkbox" v-model="task.status" @change="updateTaskStatus(task)" />
                        </td>
                        <td class="py-2 px-4 text-right">
                            <button @click="deleteTask(task._id)" class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        tasks: Object,
    },
    methods: {
        async updateTaskStatus(task) {
            try {
                await this.$axios.put(
                    `/api/tasks/${task._id}`,
                    { status: task.status }
                );
                this.$emit('showAlert', {message: 'Task status updated successfully', type: 'success'});
            } catch (error) {
                this.$emit('showAlert', {message: 'Error updating task status', type: 'error'});
                console.error('Error updating task status:', error);
            }
        },
        async deleteTask(taskId) {
            try {
                await this.$axios.delete(`/api/tasks/${taskId}`);
                this.$emit('showAlert', {message: 'Task deleted successfully', type: 'success'});
                this.$emit('taskDeleted', taskId);
            } catch (error) {
                this.$emit('showAlert', {message: 'Error deleting task', type: 'error'});
                console.error('Error deleting task:', error);
            }
        },
        showAddTaskModal() {
            this.$emit('showAddTaskModal');
        }
    },
};
</script>
