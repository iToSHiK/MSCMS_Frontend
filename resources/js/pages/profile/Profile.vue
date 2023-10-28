<template>
	<div>
		<div v-if="isLogin == false">
			<div class="content__checkout2">
				<p class="content__checkout-text2">You are not authorized</p>
			</div>
		</div>

	  <div v-if="isReady">
			<div class="content__checkout2">
				<p class="content__checkout-text2">Profile</p>
			</div>
			<div class="content-container">
				
				<div class="content-first-block-profile">
					<div class="content__player-card-profile hvr-grow">
						<div class="content__player-card-image"><a class="toggle-modal"><img :src="'https://mc-heads.net/body/' + profile.username" class="content__player-card-img"></a></div>
						<div class="content__player-card-text-profile">
							<p class="content__player-card-title-profile" v-html="profile.displayname"></p>
							<div class="content__player-card-price">
								<p class="content__player-card-price-text-profile">{{ profile.group }}</p>
							</div>
						</div>
					</div>
					<div class="content__donator-lastdonor-profile">
						<div class="sidebar__donator-topdonor-block-flex">
							<div class="sidebar__donator-topdonor-block--content-profile sidebar__donator-topdonor-block--last">
								<div class="sidebar__donator-topdonor-block-text--last">
									<p class="sidebar__donator-topdonor-profile-text">Information</p> <i
										class="fas fa-info-circle  sidebar__donator-topdonor-icon" aria-hidden="true"></i>
								</div>
							</div>
						</div>
						<div class="content__info-profile">
							<table class="content__info-table-profile">
								<tr class="content__info-table-profile-tr">
									<th class="content__info-table-profile-th">
										<i class="fas fa-table content__info-profile-table-th--icon"></i>
										Registration date:
									</th>
									<th class="content__info-profile-table-th--val">
										{{ profile.created }}
									</th>
								</tr>
								<tr class="content__info-table-profile-tr">
									<th class="content__info-table-profile-th">
										<i class="fas fa-dollar-sign content__info-table-th--icon"></i>
										  Money spent:
									</th>
									<th class="content__info-profile-table-th--val">
										{{ $root.toActualCurrency(profile.money_spent).toFixed(2) }} {{ $root.currency.name }}
									</th>
								</tr>
							</table>
							<div class="content__info-purchase" v-if="profile.top_item_name != null">
								<span class="content__info-purchase-title">Top purchase</span>
								<div class="content__info-purchase-block hvr-grow">
									<div class="content__info-purchase-block-img">
										<img :src="'/img/items/'+profile.top_item_id+'.png'" onerror="this.onerror=null;this.src='/img/items/def.png';">
									</div>
									<div class="content__info-purchase-block-text">
										{{ profile.top_item_name }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="content-second-profile-block ">
					<div class="sidebar__donator-lastdonor w-100">
						<div class="sidebar__donator-topdonor-block-flex">
							<div class="sidebar__donator-topdonor-block sidebar__donator-topdonor-block--last">
								<div class="sidebar__donator-topdonor-block-text--last">
									<p class="sidebar__donator-topdonor-profile-text">Recent purchases</p> <i
										class="fas fa-donate  sidebar__donator-topdonor-icon" aria-hidden="true"></i>
								</div>
							</div>
						</div>
						<div class="content__purchase-lastpurchase-players-block">
							<div class="content__purchase-lastpurchase-items">

								<div class="content__purchase-lastpurchase-player hvr-grow" v-for="item in profile.items">
									<div class="content__purchase-lastdonor-profile-img">
										<img :src="'/img/items/'+item.id+'.png'" class="content__payments-profile-img" onerror="this.onerror=null;this.src='/img/items/def.png';">
									</div>
									<span class="content__purchase-lastdonor-player-name">{{ item.name }}</span>
									<span class="content__purchase-lastdonor-player-price">{{ $root.toActualCurrency(item.price).toFixed(2) }} {{ $root.currency.name }}</span>
								</div>

							</div>
							<!-- <div class="content__purchase-lastdonor-line"></div> -->
						</div>
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
            		isLogin: true,
            		isReady: false,
                profile: {}
            }
        },
        methods: {
            async getProfile() {
            		var apiUsername = "";
           		 	if (typeof this.$route.params.username == "string"){
           		 		apiUsername = this.$route.params.username;
           		 	} else {
	            		if (this.$root.user == null){
	            			await this.$root.getUser();
	            			if (this.$root.user == null) {
	            				this.isLogin = false;
	            				return;
	            			} else {
           		 				apiUsername = this.$root.user.username;
	            			}
	            		} else {
           		 			apiUsername = this.$root.user.username;
	            		}
         		 		}
                const response = await this.$root.axios.post(`/profile/` + apiUsername);
                this.profile = response.data;
                this.isReady = true;
            },
        },
        mounted() {
            this.getProfile();
        }
    }
</script>
