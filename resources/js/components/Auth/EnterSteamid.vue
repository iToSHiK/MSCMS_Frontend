<template>
    <div class="panel panel-default panel--mstr-login">
        <div class="panel-heading">Login</div>
        <div class="panel-body" style="text-align: center">
            <a @click="login" class="login-steam">{{ $t('Log in Steam') }}</a>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            login() {
                let width = 860;
                let height = 500;
                let left = (screen.width / 2) - (width / 2);
                let top = (screen.height / 2) - (height / 2);
                let windowOptions = `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`;
                let type = 'auth';

                window.open('/api/auth/steam', type, windowOptions);

                window.addEventListener("message", this.initToken, false);
            },
            initToken(event) {
                if (event.data.length > 0) {
                    const token = event.data.slice(7);
                    this.$cookie.set('token', token);
                    this.$root.getUser();

                    this.$router.go(-1);
                }
            },
        }
    }
</script>
