<template>
  <div class="featured__packages">
    <div id="page-title" class="gray" style="background: none;">
        <div class="container_cat">
            <h1 style="color: #dd2828; font-size: 28px;">Featured Packages</h1>
        </div>
        <div class="box" style="margin: 10px 0 0 0;">
            <h1 class="ms-h1 orange" style="margin: 0 0 22px 0; border-bottom: 5px solid #dd2828;"></h1>
        </div>  
    </div>
    <div class="featured__packages--flex">
      <div v-if="$root.settings.deal.length > 0" class="featured__package" @click="showDescription($root.settings.deal[0].id)" id="featured__halloween">
        <div class="featured__package--img">
          <img style="height: 95px;" class="sidebar__navigation-item-img" :src="'/img/items/' + $root.settings.deal[0].id + '.png'">
        </div>
        <div class="featured__package--text">
          <p class="featured__package__text--title">{{ $root.settings.deal[0].name }}</p>
          <p class="featured__package__text--price">
            <s v-if="$root.settings.deal[0].discount > 0">{{ (+$root.toActualCurrency($root.settings.deal[0].discount)).toFixed(2) }}</s> {{ (+$root.toActualCurrency($root.settings.deal[0].price)).toFixed(2) }} {{ $root.currency.name }}
          </p>
        </div>
      </div>
      <div  v-if="$root.settings.deal.length > 1" class="featured__package" @click="showDescription($root.settings.deal[1].id)" id="featured__halloween">
        <div class="featured__package--img">
          <img style="height: 95px;" class="sidebar__navigation-item-img" :src="'/img/items/' + $root.settings.deal[1].id + '.png'">
        </div>
        <div class="featured__package--text">
          <p class="featured__package__text--title">{{ $root.settings.deal[1].name }}</p>
          <p class="featured__package__text--price">
            <s v-if="$root.settings.deal[1].discount > 0">{{ (+$root.toActualCurrency($root.settings.deal[1].discount)).toFixed(2) }}</s> {{ (+$root.toActualCurrency($root.settings.deal[1].price)).toFixed(2) }} {{ $root.currency.name }}
          </p>
        </div>
      </div>
      <div v-if="$root.settings.deal.length > 2" class="featured__package" @click="showDescription($root.settings.deal[2].id)" id="featured__halloween">
        <div class="featured__package--img">
          <img style="height: 95px;" class="sidebar__navigation-item-img" :src="'/img/items/' + $root.settings.deal[2].id + '.png'">
        </div>
        <div class="featured__package--text">
          <p class="featured__package__text--title">{{ $root.settings.deal[2].name }}</p>
          <p class="featured__package__text--price">
            <s v-if="$root.settings.deal[2].discount > 0">{{ (+$root.toActualCurrency($root.settings.deal[2].discount)).toFixed(2) }}</s> {{ (+$root.toActualCurrency($root.settings.deal[2].price)).toFixed(2) }} {{ $root.currency.name }}
          </p>
        </div>
      </div>
    </div>

        <div class="modal" id="popup-modal" tabindex="-1" role="dialog" style="display: none;" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" style="color: #fff;" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">{{ item.name }}</h4>
                    </div>
                    <div class="modal-body ql-editor" style="color: #e2e2e2;" v-html="item.description">

                    </div>
                    <div class="modal-footer">
                        <div style="display: block;" class="row">
                            <div class="col-sm-4">
                                <p class="pull-left" style="color: #02a60e; font-weight: bold;">
                                    <b>{{ $root.toActualCurrency(item.price) }} <small>{{ $root.currency.name }}</small></b>
                                </p>
                            </div>
                            <div class="col-sm-8">
                                <div style="display: inline-block;" class="package-footer-buttons" v-if="$root.user !== null">
                                    <button class="orange" style="border-radius: 8px; margin-top: 5px;" v-if="!item.in_cart" @click="addToCart(item.id)">
                                        {{ $t("Add to cart") }}
                                    </button>
                                    <button class="orange" style="border-radius: 8px; margin-top: 5px;" v-if="item.in_cart" @click="removeInCart(item.id)">
                                        {{ $t("Remove") }}
                                    </button>
                                </div>
                            </div>
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
                item: {
                    name: '',
                    price: 0.00,
                    description: ''
                }
            }
        },
        methods: {
            async showDescription(id) {
                let response;
				
				if (this.$root.user == null) {
					this.$root.showNotification('error', `You need to auhorize!`);
				}

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
                    this.$root.showNotification('success', `Item ${this.item.name} added to Cart`);
                }
            },
            async removeInCart(id) {
                const response = await this.$root.axios.post(`/cart/remove/${id}`);
                const data = response.data;

                if (data.success) {
                    $('#popup-modal').modal('hide');
                    await this.$root.getCart();
                    this.$root.showNotification('success', `Item ${this.item.name} remove in Cart`);
                }
            }
        }
    }
</script>
