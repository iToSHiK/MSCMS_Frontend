<template>
    <div class="panel panel-default panel--mstr-login">
        <div class="panel-body" style="text-align: center;">
            <span class="mstr-login-tip" style="color: #b5bbc1;text-align: center;font-size: 20px;font-weight: bold;">{{ $t('Please enter your username to continue') }}:</span>
            <form v-on:submit.prevent="onSubmit">
                <div class="username">
                    <div class="input-group">
                        <input type="text" v-model="username" name="ign" style="margin-top: 3%;margin-bottom: 2%;position: relative;" class="form-control input-lg form-control-lg">
                        <div class="input-group-append input-group-btn">
                            <button class="orange" style="position: relative;" type="submit">Continue<i class="fa fa-chevron-right ml-2" style="margin-left:10px;"></i></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: ''
            }
        },
        methods: {
            async onSubmit() {
                const response = await this.$root.axios.post('/auth/username', {
                    username: this.username
                });

                if (response.data == "ban"){
                    this.$root.showNotification('error', this.$t('Your user is banned'));
                    return this.$router.go(-1);
                }
                if (response.data == "incorrect"){
                    this.$root.showNotification('error', this.$t('Incorrect username'));
                    return this.$router.go(-1);
                }

                this.$cookie.set('token', response.data);
                this.$root.getUser();

                this.$router.go(-1);
            }
        },
        mounted() {

        }
    }
</script>
