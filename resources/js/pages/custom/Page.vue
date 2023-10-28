<template>
    <div class="panel panel-default panel-mstr-home" v-html="page.content"></div>
</template>

<script>
    export default {
        data() {
            return {
                page: {
                    url: '',
                    name: '',
                    content: ''
                }
            }
        },
        methods: {

        },
        async mounted() {
            const url = this.$route.params.url;

            const response = await this.$root.axios.post(`/pages/get`, {
                url: url
            });
            const data = response.data;

            if (data.success) {
                this.page = data.page;
            } else {
                this.$router.go(-1);
            }
        }
    }
</script>
