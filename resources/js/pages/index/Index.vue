<template>
    <div class="index__page">
        <div class="content-first-block">
            <div class="content__welcome">
				<div>
					<p class="content__welcome-title">
						{{ $t("welcome") }}
					</p>
				</div>
				<div class="content__welcome-subtitle-block">
					<p class="content__welcome-subtitle">
						{{ $t("to the official") }} {{ $root.settings.website_name }} {{ $t("Server Store") }}.
					</p>
				</div>
				<div class="content__welcome-text-block">
					<p class="content__welcome-text" v-html="$root.settings.block_1">
						{{ $t("To begin shopping, please select a category from the sidebar. Please note that ranks cost a one-time fee and are unlocked permanently!") }}
					</p>
				</div>
			</div>

            <div class="content__sale">
                <img :src="$root.settings.block_3" alt="sale" class="content__sale-img" v-if="!($root.settings.block_3 > 0)">
            </div>
        </div>
        <div class="content-second-block">
            <div class="content__information" v-html="$root.settings.block_2">

            </div>
            <div class="content__payments">
                <h2 class="content__payments-title">
                    {{ $t("RECENT PAYMENTS") }}
                </h2>
                <div class="content__payments-title-line"></div>
                <div class="content__payments-players">
                    <div class="content__payments-player" v-for="payment in $root.settings.lastPayments1">
                        <a :href="'/profile/'+payment.username"><img :src="'https://mc-heads.net/avatar/' + payment.username + '/28'" :alt="payment.username" class="content__payments-player-img"></a>
                    </div>
                </div>

                <div class="content__payments-line"></div>

                <div class="content__payments-players">
                    <div class="content__payments-player" v-for="payment in $root.settings.lastPayments2">
                        <img :src="'https://mc-heads.net/avatar/' + payment.username + '/28'" :alt="payment.username" class="content__payments-player-img">
                    </div>
                </div>
                <div class="content__giftcards">
                    <h2 class="content__giftcards-title">
                        {{ $t("Gift Card") }}
                        <i class="fas fa-credit-card  sidebar__donator-topdonor-icon" aria-hidden="true"></i>
                    </h2>
                    <div class="content__giftcards-title-line"></div>
                    <div class="content__giftcards-main">
                        <input :placeholder="$t('Card Code')" class="content__gift-input" v-model="giftCard">
                    </div>
                    <button class="content__gift-btn" @click="checkGift">
                        {{ $t("Check") }}
    			    </button>
                </div>
            </div>
        </div>
        <div class="content__systems">
            <div class="content__systems-payment">
                <img src="/img/paypal.png" alt="paypal" class="content__systems-paypal">
                <p class="content__systems-text">
                    {{ $t("PayPal balance, Banks, All Credit/Debit Cards") }}
                </p>
            </div>
            <div class="content__systems-line"></div>
            <div class="content__systems-payment">
                <img src="/img/paymentwall.png" alt="paymentwall" class="content__systems-xsolla">
                <p class="content__systems-text">
                    {{ $t("Paysafecard, Amazon Pay, Mobile Payments, +600 More") }}
                </p>
            </div>
            <div class="content__systems-line"></div>
            <div class="content__systems-payment">
                <img src="/img/stripe.png" alt="stripe" class="content__systems-stripe">
                <p class="content__systems-text content__systems-text--stripe">
                    {{ $t("All Credit & Debit Cards") }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                item: {
                    name: '',
                    price: 0.00,
                    description: ''
                },
                giftCard: ''
            }
        },
        methods: {
            async checkGift() {
                const response = await this.$root.axios.post(`/cart/getGift`, {
                    gift: this.giftCard
                }).then((response) => {
                    const data = response.data;

                    if (data.status) {
                        this.$root.showNotification('success', this.$t("Current balance") + ": " + data.end_balance);
                    } else {
                        this.$root.showNotification('error', data.message);
                    }
                }).catch((error) => {
                    if (error.request.status == 401){
                        this.$root.showNotification('error', this.$t("You have to authorize, before check giftcard balance"));
                    } else {
                        this.$root.showNotification('error', error.message);
                    }
                });
            },
            async showDescription(id) {
                let response;

                if (this.$root.user !== null) {
                    response = await this.$root.axios.post(`/items/get/${id}`);
                } else {
                    response = await this.$root.axios.post(`/items/get/guest/${id}`);
                }

                const data = response.data;

                if (data.success) {
                    this.item = data;
                    $('#popup-modal').modal('show');
                }
            },
            async addToCart(id) {
                const response = await this.$root.axios.post(`/cart/add/${id}`);
                const data = response.data;

                if (data.success) {
                    $('#popup-modal').modal('hide');
                    await this.$root.getCart();
                    this.$root.showNotification('success', this.$t("Item added to cart"));
                }
            },
            async removeInCart(id) {
                const response = await this.$root.axios.post(`/cart/remove/${id}`);
                const data = response.data;

                if (data.success) {
                    $('#popup-modal').modal('hide');
                    await this.$root.getCart();
                    this.$root.showNotification('success', this.$t("Item remove from cart"));
                }
            }
        }
    }
</script>
