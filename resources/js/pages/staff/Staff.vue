<template>
    <div class="content-container">
       <div class="panel panel-default panel-mstr-home">
        <div v-for="(staffPlayers, staffGroup) in staff">
          <div class="content__checkout">
             <p class="content__checkout-text">{{ staffGroup }}</p>
          </div>
          <div class="content__shop-cards">
             <div class="content__shop-card hvr-grow" v-for="staffPlayer in staffPlayers">
                <div class="content__shop-card-image"><a class="toggle-modal"><img :src="'https://mc-heads.net/body/' + staffPlayer.username" width="87" height="208" onerror="this.onerror=null;this.src='/img/items/def.png';" class="content__shop-card-img"></a></div>
                <p class="content__shop-card-title" v-html="staffPlayer.displayname"></p>
                <!-- <div class="content__shop-card-price">
                   <p class="content__shop-card-price-text" style="color: #ff1f1f;">Owner</p>
                </div> -->
             </div>
          </div>
        </div>
       </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                staff: []
            }
        },
        methods: {
            async getStaff() {
                const response = await this.$root.axios.post(`/staff`);
                this.staff = response.data;
            }
        },
        async mounted() {
            this.getStaff();
        }
    }
</script>
