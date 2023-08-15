<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="bg-white p-6 rounded-md shadow-md w-6/12">
            <h2 class="text-lg font-semibold mb-4">Login</h2>
            <form @submit.prevent="login">
                <div class="mb-2">
                    <label class="block font-medium">Email:</label>
                    <input v-model="email" type="email" class="w-full p-2 border rounded-md" />
                </div>
                <div class="mb-4">
                    <label class="block font-medium">Password:</label>
                    <input v-model="password" type="password" class="w-full p-2 border rounded-md" />
                </div>
                <div class="flex justify-end mt-4">
                    <button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
                        Login
                    </button>
                    <button
                        @click="closeModal"
                        class="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await this.$axios.post('/api/login', {
                    email: this.email,
                    password: this.password,
                });

                const { token, user } = response.data;

                this.$store.dispatch('login', { token, user });
                this.$emit('showAlert', {message: 'Logged in successfully', type: 'success'});
                this.closeModal();
            } catch (error) {
                const message = error.response.data.error || 'Error logging in';
                this.$emit('showAlert', {message: message, type: 'error'});
                console.error('Error logging in:', error);
            }
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>
