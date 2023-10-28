<template>
<div class="panel panel-default panel--mstr-login" v-if="!isLoading">
    <div class="panel-body" style="text-align: center;">
        <span class="mstr-login-tip" style="color: #b5bbc1;text-align: center;font-size: 20px;font-weight: bold;">{{ $t('Please enter your username to continue') }}:</span>
        <form v-on:submit.prevent="requestAuth">
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

<div v-else>
    <div id="content" class="username">
        <div class="container">
            <div class="container">
                <div class="box">
                    <h1 class="ms-h1 orange">Confirm your authorization 🚀</h1>
                </div>
                <p style="margin: 0 0 10px; color: #7d7d7d;"><b>Please, check a chat & verify yourself on the Minecraft Server!</b> You need to confirm that you are the owner of the account!</p>
                <div style="height: 110px;">
        <div id="loader">Loading...</div>
        </div>
                <component :is="'style'">
                    #loader,
                    #loader:before,
                    #loader:after {
                      background: #dd2828;
                      -webkit-animation: load1 1s infinite ease-in-out;
                      animation: load1 1s infinite ease-in-out;
                      width: 1em;
                      height: 4em;
                    }
                    #loader {
                      color: #dd2828;
                      text-indent: -9999em;
                      margin: 88px auto;
                      position: relative;
                      font-size: 11px;
                      -webkit-transform: translateZ(0);
                      -ms-transform: translateZ(0);
                      transform: translateZ(0);
                      -webkit-animation-delay: -0.16s;
                      animation-delay: -0.16s;
                    }
                    #loader:before,
                    #loader:after {
                      position: absolute;
                      top: 0;
                      content: '';
                    }
                    #loader:before {
                      left: -1.5em;
                      -webkit-animation-delay: -0.32s;
                      animation-delay: -0.32s;
                    }
                    #loader:after {
                      left: 1.5em;
                    }
                    @-webkit-keyframes load1 {
                      0%,
                      80%,
                      100% {
                        box-shadow: 0 0;
                        height: 4em;
                      }
                      40% {
                        box-shadow: 0 -2em;
                        height: 5em;
                      }
                    }
                    @keyframes load1 {
                      0%,
                      80%,
                      100% {
                        box-shadow: 0 0;
                        height: 4em;
                      }
                      40% {
                        box-shadow: 0 -2em;
                        height: 5em;
                      }
                    }
                </component>
                <p style="margin: 0 0 10px; color: #7d7d7d; text-align: center;">To continue using a store, you need to press on the verification message in the chat. <br> If you don't receive it, <b><a href="#" @click="requestAuth()" style="color: rgb(221, 40, 40);">press here</a></b> to retry again.</p>
            </div>
        </div>
    </div>
</div>
</template>


<script>
    export default {
        data() {
            return {
                isLoading: false,
                timer: 0,
                username: '',
            }
        },
        methods: {
            async requestAuth() {
                if (this.isLoading) clearInterval(this.timer);
                const response = await this.$root.axios.post('/game_auth/init/' + this.username, {});
                if (!response.data.status){
                    this.$root.showNotification('error', this.$t('Incorrect username'));
                    return this.$router.go(-1);
                }
                this.isLoading = true;
                this.timer = setInterval(async () => {
                    const resp = await this.$root.axios.post('/game_auth/check/' + this.username, {});
                    if (resp.data.status){
                        clearInterval(this.timer);
                        this.$cookie.set('token', resp.data.token);
                        await this.$root.getUser();
                        this.$router.push('/');
                    }
                }, 3000);
            }
        },
        async mounted() {
        }
    }
</script>