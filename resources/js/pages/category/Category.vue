<template>
    <div>
        <div class="content__shop">
                <div id="page-title" class="gray" style="background: none;">
                        <div class="container_cat">
                          <h1>{{ category.name }}</h1>
                          <p>{{ category.description }}</p>
                        </div>
                        <div class="box">
                          <h1 class="ms-h1 orange" style="margin: 0 0 22px 0;"></h1>
                  </div>  
                </div>
                <div class="category__list" v-if="category.is_listing === 1">
                    <div class="category__list--item" :class="{ featured: item.featured }" v-for="item in items">
                                <div class="image">
                                      <a @click="showDescription(item.id)" class="toggle-modal">
                                        <img :src="'/img/items/'+item.id+'.png'" onerror="this.onerror=null;this.src='/img/items/def.png';" style="width: 95px;" class="toggle-tooltip img-rounded" title="" data-original-title="Click for more details">
                                      </a>
                                </div>
                                <div class="category__list__item--title">
                                    <p class="content__shop-card-title">{{ item.name }}</p>
                                </div>
                                <div class="category__list__item--price" v-if="!category.is_cumulative || !item.is_unavailable">
                                    <del class="content__shop-card-price-del" style="text-align: right;" v-if="item.discount > 0 && (!$root.settings.is_virtual_currency || item.virtual_price === null)">{{ $root.toActualCurrency(item.discount) }} {{ $root.currency.name }}</del>
                                    <p class="content__shop-card-price-text" v-if="!$root.settings.is_virtual_currency || item.virtual_price === null">{{ $root.toActualCurrency(item.price) }} {{ $root.currency.name }}</p>
                                    <p class="content__shop-card-price-text" v-if="$root.settings.is_virtual_currency && item.virtual_price !== null">{{ item.virtual_price }} {{ $root.settings.virtual_currency }}</p>
                                </div>
                                <div class="content__shop-card-btn noHover" style="color: #a3a3a3; margin-top: 30px; margin-bottom: 15px;" v-else>
                                            UNAVAILABLE
                                </div>
                                        <button v-if="(!category.is_cumulative || !item.is_unavailable) && item.featured === 1" @click="showDescription(item.id)" class="content__shop-card-btn" style="padding: 7px 40px; margin-bottom: 15px;margin-left: 20px;">
                                            {{ $t("BUY") }}
                                        </button>
                                        <button v-if="(!category.is_cumulative || !item.is_unavailable) && item.featured === 0" class="content__shop-card-btn" style="padding: 7px 40px;margin-bottom: 15px;margin-left: 20px;" @click="showDescription(item.id)">
                                            {{ $t("BUY") }}
                                        </button>
                    </div>
                </div>

                <div class="content__shop-cards" v-if="category.is_comparison === 0 & category.is_listing === 0">
                    <div class="content__shop-card hvr-grow" :class="{ featured: item.featured }" @click="(!category.is_cumulative || !item.is_unavailable) && showDescription(item.id)" v-for="item in items">
                        <div class="content__shop-card-question" style="color: #fff; width: 110px; background: var(--main-btn-color);" v-if="item.featured === 1">
                          FEATURED
                        </div>
                        <div v-else class="content__shop-card-question">
                          ?
                        </div>
                        <div class="content__shop-card-image">
                            <a class="toggle-modal">
                                <img :src="'/img/items/'+item.id+'.png'" width="170" height="140" class="content__shop-card-img" title="" onerror="this.onerror=null;this.src='/img/items/def.png';" :data-original-title="$t('Click for more details')">
                            </a>
                        </div>
                        <p class="content__shop-card-title">{{ item.name }}</p>
                        <div class="content__shop-card-price" v-if="!category.is_cumulative || !item.is_unavailable">
                            <del class="content__shop-card-price-del" v-if="item.discount > 0 && (!$root.settings.is_virtual_currency || item.virtual_price === null)">{{ $root.toActualCurrency(item.discount) }} {{ $root.currency.name }}</del>
                            <p class="content__shop-card-price-text" v-if="!$root.settings.is_virtual_currency || item.virtual_price === null">{{ $root.toActualCurrency(item.price) }} {{ $root.currency.name }}</p>
                            <p class="content__shop-card-price-text" v-if="$root.settings.is_virtual_currency && item.virtual_price !== null">{{ item.virtual_price }} {{ $root.settings.virtual_currency }}</p>
                        </div>
                        <div class="content__shop-card-btn noHover" style="color: #a3a3a3; margin-top: 30px; margin-bottom: 15px;" v-else>
                            UNAVAILABLE
                        </div>
                        <button v-if="(!category.is_cumulative || !item.is_unavailable) && item.featured === 1" @click="showDescription(item.id)" class="content__shop-card-btn" style="color: #fff; background: var(--main-btn-color);">
                            {{ $t("BUY") }}
                        </button>
                        <button v-if="(!category.is_cumulative || !item.is_unavailable) && item.featured === 0" class="content__shop-card-btn" @click="showDescription(item.id)">
                            {{ $t("BUY") }}
                        </button>
                    </div>
                </div>


            <div id="content" class="username" v-if="category.is_comparison === 1">
                <div class="container" style="padding: 0;">
                    <div class="container" style="padding: 0 0.2%; overflow-x:auto;">
                        <table>
                          <tr>
                            <th style="width:25%"></th>
                            <th v-for="item in items">
                              <div class="content__shop-card hvr-grow" :class="{ featured: item.featured }" style="height: auto; width: auto;"> 
                                <img :src="'/img/items/'+item.id+'.png'" width="170" height="140" title="" onerror="this.onerror=null;this.src='/img/items/def.png';" data-original-title="Click for more details" class="content__shop-card-img">
                                <p class="content__shop-card-title">{{ item.name }}</p>
                                <div class="content__shop-card-price" v-if="!category.is_cumulative || !item.is_unavailable">
                                    <del class="content__shop-card-price-del" v-if="item.discount > 0 && (!$root.settings.is_virtual_currency || item.virtual_price === null)">{{ $root.toActualCurrency(item.discount) }}</del>
                                    <p class="content__shop-card-price-text" v-if="!$root.settings.is_virtual_currency || item.virtual_price === null">{{ $root.toActualCurrency(item.price) }} {{ $root.currency.name }}</p>
                                    <p class="content__shop-card-price-text" v-if="$root.settings.is_virtual_currency && item.virtual_price !== null">{{ item.virtual_price }} {{ $root.settings.virtual_currency }}</p>
                                </div>
                                <div class="content__shop-card-btn noHover" style="color: #a3a3a3; margin-top: 30px; margin-bottom: 15px;" v-else>
                                    UNAVAILABLE
                                </div>
                                <button v-if="!category.is_cumulative || !item.is_unavailable" @click="showDescription(item.id)" class="content__shop-card-btn" style="background: var(--main-btn-color);color: #fff;padding: 7px 40px;margin-bottom: 15px;">BUY</button>
                               </div>
                            </th>
                          </tr>
                          <tr v-for="(compareRow, compareRowName) in category.comparison">
                            <td>{{ compareRow['value'] }}</td>
                            <td v-for="item in items">
                                <i class="fa" style="font-family: 'Open Sans';" v-if="item.comparison == null">undefined</i>
                                <i class="fa" v-if="category.comparison[compareRowName]['type'] == 0" :class="{ 'fa-remove': category.comparison[compareRowName]['type'] == 0 && item.comparison[compareRowName] == 0, 'fa-check': category.comparison[compareRowName]['type'] == 0 && item.comparison[compareRowName] == 1 }"></i>
                                <p v-if="category.comparison[compareRowName]['type'] == 1" v-html="category.comparison[compareRowName]['type'] == 1 ? getHtmlFromMinecraftCode(item.comparison[compareRowName]) : ''"></p>
                            </td>
                          </tr>
                        </table>
                    </div>
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
                                    <b v-if="!$root.settings.is_virtual_currency || item.virtual_price === null">{{ $root.toActualCurrency(item.price) }} <small>{{ $root.currency.name }}</small></b>
                                    <b v-if="$root.settings.is_virtual_currency && item.virtual_price !== null">{{ item.virtual_price }} <small>{{ $root.settings.virtual_currency }}</small></b>
                                </p>
                            </div>
                            <div class="col-sm-8">
                                <div style="display: inline-block;" class="package-footer-buttons" v-if="$root.user !== null">
                                    <button class="orange" v-if="!item.in_cart" @click="addToCart(item.id)" style="border-radius: 8px; margin-top: 5px;">
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
                category: {},
                items: {},
                itemsFeatured: {},
                item: {
                    name: '',
                    price: 0.00,
                    description: '',
                    virtual_price: 0.00,
                    featured: '',
                }
            }
        },
        methods: {
            checkPermission() {
                if (!this.$cookie.get('token')) {
                    this.$router.push({name: 'auth'});
                }

                this.fetchData(this.$route.params.url);
            },
            async fetchData(url) {
                const response = await this.$root.axios.post(`/categories/get/${url}`);
                const data = response.data;

                let parsedCategory = data.category;
                if (parsedCategory.is_comparison == 1){
                    parsedCategory.comparison = JSON.parse(parsedCategory.comparison);
                }
                this.category = parsedCategory;

                let parsedItems = data.items;
                if (parsedCategory.is_comparison == 1){
                    for (var i = 0; i < parsedItems.length; i++) {
                        parsedItems[i].comparison = JSON.parse(parsedItems[i].comparison);
                    }
                }
                this.items = parsedItems;

                this.itemsFeatured = data.itemsFeatured;
            },
            async showDescription(id) {
                const response = await this.$root.axios.post(`/items/get/${id}`);
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
                    this.$root.showNotification('success', this.$t("Item added in cart"));
                } else if (typeof data.message !== "undefined") {
                    this.$root.showNotification('error', data.message);
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
            },
            getHtmlFromMinecraftCode(text) {
                if (text.indexOf('§' || '&') > -1){
                    return Array.prototype.reduce.call(
                        text.replaceColorCodes().childNodes, 
                        (result, node) => result + (node.outerHTML || node.nodeValue),
                        ''
                    );
                }
                return text;
            }
        },
        mounted() {
            let minecraftCodesScript = document.createElement('script')
            minecraftCodesScript.setAttribute('src', '/js/MinecraftColorCodes.js')
            document.head.appendChild(minecraftCodesScript)
        },
        created() {
            this.checkPermission();
        },
        watch: {
            $route(to, from) {
                this.checkPermission();
            }
        }
    }
</script>
