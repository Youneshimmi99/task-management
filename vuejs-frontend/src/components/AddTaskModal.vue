<template>
	<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
		<div class="bg-white p-6 rounded-md shadow-md w-6/12">
			<h2 class="text-lg font-semibold mb-4">Add New Task</h2>
			<form @submit.prevent="addTask">
				<div class="mb-2">
					<label class="block font-medium">Title:</label>
					<input v-model="newTask.title" required class="w-full p-2 border rounded-md" />
				</div>
				<div class="mb-4">
					<label class="block font-medium">Description:</label>
					<textarea v-model="newTask.description" required class="w-full p-2 border rounded-md"></textarea>
				</div>
				<div class="flex justify-end mt-4">
					<button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
						Add Task
					</button>
					<button @click="closeModal" class="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
						Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	props: {
        tasks: Object,
    },
	data() {
		return {
			newTask: {
				title: '',
				description: '',
			},
		};
	},
	methods: {
		async addTask() {
			try {
				await this.$axios.post('/api/tasks', this.newTask);
				this.$emit('showAlert', {message: 'Task added successfully', type: 'success'});
				this.$emit('taskAdded');
				this.newTask = {
					title: '',
					description: '',
				};
				this.closeModal();
			} catch (error) {
				const message = error.response.data.message || 'Error adding task';
				this.$emit('showAlert', {message: message, type: 'error'});
				console.error('Error adding task:', error);
			}
		},
		closeModal() {
			this.$emit('close');
		},
	},
};
</script>
