<template>
	<div>
		<navbar-modal
			@showLoginModal="showLoginModal = true"
			@showRegisterModal="showRegisterModal = true"
			@showAlert="showAlert"
		/>
		<task-list
			:tasks="tasks"
			@taskDeleted="deleteTask"
			@showAddTaskModal="openAddTaskModal"
			@showAlert="showAlert"
		/>
		<add-task-modal
			v-if="showAddTaskModal"
			:tasks="tasks"
			@close="showAddTaskModal = false"
			@taskAdded="fetchTasks"
			@showAlert="showAlert"
		/>
		<custom-alert
			:show="alert.show"
			:message="alert.message"
			:type="alert.type"
			@close="closeAlert"
		/>
		<login-modal
			v-if="showLoginModal"
			@close="showLoginModal = false"
			@showAlert="showAlert"
		/>
		<register-modal
			v-if="showRegisterModal"
			@close="showRegisterModal = false"
			@showAlert="showAlert"
		/>
	</div>
</template>

<script>
import NavbarModal from '@/components/NavbarModal.vue';
import TaskList from '@/components/TaskList.vue';
import AddTaskModal from '@/components/AddTaskModal.vue';
import CustomAlert from '@/components/CustomAlert.vue';
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
	name: 'App',
	components: {
		NavbarModal,
		TaskList,
		AddTaskModal,
		CustomAlert,
		LoginModal,
		RegisterModal,
	},
	data() {
		return {
			tasks: [],
			selectedTask: null,
			showLoginModal: false,
			showRegisterModal: false,
			showAddTaskModal: false,
			alert: {
				show: false,
				message: '',
				type: '',
			},
		};
	},
	methods: {
		showAlert({message, type}) {
			this.alert.show = true;
			this.alert.message = message;
			this.alert.type = type;
		},
		closeAlert() {
			this.alert.show = false;
			this.alert.message = '';
			this.alert.type = '';
		},
		async fetchTasks() {
			try {
				const response = await this.$axios.get('/api/tasks');
				this.tasks = response.data;
			} catch (error) {
				this.showAlert('Error fetching tasks', 'error');
				console.error('Error fetching tasks:', error);
			}
		},
		deleteTask(taskId) {
			this.tasks = this.tasks.filter(task => task._id !== taskId);
		},
		openAddTaskModal() {
			this.showAddTaskModal = true;
		},
	},
	mounted() {
		this.fetchTasks();
	},
};
</script>
