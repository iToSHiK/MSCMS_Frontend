<template>
    <div class="content-container">
        <div class="content__checkout">
            <p class="content__checkout-text">
                {{ $t("Checkout") }}
            </p>
            <p class="content__checkout-text">
                <span>{{ $root.toActualCurrency($root.cart.price).toFixed(2) }} {{ $root.currency.name }}</span>
                <span v-if="$root.settings.is_virtual_currency == 1 && $root.cart.virtual_price > 0"> / {{ $root.cart.virtual_price }} {{ $root.settings.virtual_currency }}</span>
            </p>
        </div>
        <div class="content__order">
            <div class="content__order-head ">
                <ul class="content__order-head-list">
                    <li class="content__order-head-item">{{ $t("Name") }}</li>
                    <li class="content__order-head-item">{{ $t("Price") }}</li>
                    <li class="content__order-head-item content__order-head-item--qua">{{ $t("Quantity") }}</li>
                </ul>
            </div>
            <div class="content__order-main" v-for="item in $root.cartItems">
                <div class="content__order-main-list">
                    <div class="content__order-main-item">
                        <img :src="'/img/items/'+item.id+'.png'" width="74" height="62" alt="box" class="content__order-main-img" onerror="this.onerror=null;this.src='/img/items/def.png';">
                        <p class="content__order-main-text content__order-main-text--name">
                            {{ item.name }}
                        </p>
                    </div>
                    <div class="content__order-main-item content__order-main-item--price">
                        <p class="content__order-main-text">
                            <span v-if="!$root.settings.is_virtual_currency || !item.is_virtual_currency_only || item.virtual_price === null">{{ $root.toActualCurrency(item.price).toFixed(2) }} {{ $root.currency.name }}</span>
                            <span v-if="$root.settings.is_virtual_currency == 1 && item.is_virtual_currency_only == 1 && item.virtual_price !== null">{{ item.virtual_price }} {{ $root.settings.virtual_currency }}</span>
                        </p>
                    </div>
                    <div class="content__order-main-item content__order-main-item--quantily">
                        <i v-if="item.quantityLimit !== 1" class="fas fa-plus content__order-main-icon content__order-main-icon--plus" @click="plusCount(item)" style="cursor: pointer;"></i>
                        <input type="number" v-model="item.count" class="content__order-main-input" min="1" :max="item.quantityLimit" :readonly="item.quantityLimit === 1">
                        <i v-if="item.quantityLimit !== 1" class="fas fa-minus content__order-main-icon content__order-main-icon--minus" @click="minusCount(item)" style="cursor: pointer;"></i>
                    </div>
                    <div class="content__order-main-item">
                        <button class="content__order-main-btn content__order-main-btn--alt" @click="reloadItem(item.id, item.count)">
                            <i class="fas fa-sync-alt "></i>
                        </button>
                        <button class="content__order-main-btn content__order-main-btn--info" @click="showDescription(item.id)">
                            <i class="fas fa-info "></i>
                        </button>
                        <button class="content__order-main-btn content__order-main-btn--times" @click="removeInCart(item.id)">
                            <i class="fas fa-times "></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="content__vars" v-for="item in ($root.cartItems ? $root.cartItems.filter((q) => q.vars.length > 0) : [])">
            <div class="content__var-text">
                <p class="content__var-title">
                    Option{{ item.vars.length > 1 ? 's' : ''}} for {{ item.name }}
                </p>
            </div>
            <div class="var_item" v-for="var_ in item.vars">
                <div class="content__var-text">
                    <p class="content__var-description">
                        {{ var_.description }}
                    </p>
                </div>
                <div class="content__var-line"></div>
                <div class="" v-if="var_.type == 0">
                    <select v-model="var_.use" class="select-css">
                      <option v-for="line in var_.lines" v-bind:value="line.value">
                      {{ line.name }} - {{ ($root.toActualCurrency(item.price) * (line.price / 100)).toFixed(2) }} {{ $root.currency.name }}
                      </option>
                    </select>
                </div>
                <div class="" v-if="var_.type == 1">
                    <input class="content__coupon-input" type="text" :placeholder="$t('Enter text') + '...'" v-model="var_.use"></input>
                </div>
                <div class="" v-if="var_.type == 2">
                    <input class="content__coupon-input" type="num" v-model="var_.use"></input>
                </div>
            </div>
        </div>
        <div class="content__vars" style="padding: 0;" v-if="recommended_items.length > 0">
            <div id="page-title" class="gray" style="background: none;">
              <div class="container">
                <h1 style="font-size: 30px; color: #ffae00; margin-top: 22px; margin-bottom: -10px;">FEATURED DEAL</h1>
              </div>
              <div class="box" style="color: #ffae00; margin-top: -10px; margin-bottom: 40px;">
                <h1 style="color: rgb(230 128 3); border-bottom: 4px solid rgb(230 128 3);" class="ms-h1 orange"></h1>
                <div v-for="item in recommended_items" class="row" style="padding-top: 2.33%; padding-right: 30px; padding-left: 30px;">
                  <img :src="'/img/items/'+item.id+'.png'" width="112" height="100" alt="box" onerror="this.onerror=null;this.src='/img/items/def.png';" class="content__order-main-img">
                  <div class="recommended_name" style="display: flex; flex-direction: column; margin-top: auto; margin-bottom: auto; padding-left: 3%;">
                    <p style="font-size: 28px; font-weight: 700; text-align: left; text-shadow: 0 0 5px #e5620659; color: #d8732d;">
                        {{ item.name }}
                    </p>
                    <p style="margin-top: 5px; text-align: left; font-size: 16px; font-weight: 400; color: #fff;">
                        This item is popular among us customers. Give it a try!
                    </p>
                  </div>
                  <div class="recommended_price" style="display: flex; margin-top: auto; margin-bottom: auto; padding-left: 3%;">
                      <del class="content__shop-card-price-del" style="font-size: 19px;" v-if="item.discount == 0 || !$root.settings.is_virtual_currency || !item.is_virtual_currency_only || item.virtual_price === null">{{ (+$root.toActualCurrency(item.price)).toFixed(2) }}</del>
                      <p class="content__shop-card-price-text" style="color: #02a60e; font-size: 19px;" v-if="!$root.settings.is_virtual_currency || !item.is_virtual_currency_only || item.virtual_price === null">{{ (+$root.toActualCurrency(item.price - (item.price * (item.discount / 100)))).toFixed(2) }} {{ $root.currency.name }}</p>
                      <p class="content__shop-card-price-text" style="color: #02a60e; font-size: 19px;" v-if="$root.settings.is_virtual_currency == 1 && item.is_virtual_currency_only == 1 && item.virtual_price !== null">{{ item.virtual_price }} {{ $root.settings.virtual_currency }}</p>
                  </div>
                  <div class="recommended_button" style="display: flex; margin-top: auto; margin-bottom: auto; padding-left: 3%;">
                      <button @click="showDescription(item.id)" class="content__shop-card-btn" style="background: rgb(242, 87, 0); color: rgb(255, 255, 255); padding: 7px 40px; margin-bottom: 15px; margin-left: 45px;">ADD TO THE CART</button>
                  </div> 
                </div>
                <h1 style="color: rgb(230 128 3); border-bottom: 4px solid rgb(230 128 3);" class="ms-h1 orange"></h1>
                </div>
            </div>
        </div>
        <div style="margin-top: 20px;" v-if="$root.settings.details == 1">
            <div class="span4 recipient">
              <p class="content__checkout-title-image">You are buying as...</p>
              <div class="recipient-details">
                <img style="width: 125px;height: 295px;" :src="'https://mc-heads.net/body/' + $root.user.username" class="avatar">
                <p class="username">{{ $root.user.username }}</p>
                <p @click="logout" style="cursor: pointer;"><a style="color: #656565;">Not correct?</a></p>
              </div>
            </div>
            <p class="content__checkout-title-form">Your Details</p>
            <div class="row">
                <div class="span3">
                  <div class="content__form-text">
                      <p class="content__form-title">
                          Full Name*
                      </p>
                  </div>
                  <div class="content__form-line"></div>
                  <input type="text" name="fullname" class="content__form-input" v-model="details.fullname">
                </div>
                <div class="span4">
                    <div class="content__form-text">
                          <p class="content__form-title">
                              E-mail*
                          </p>
                    </div>
                  <div class="content__form-line"></div>
                  <input type="text" name="email" pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" class="content__form-input" v-model="details.email">
                </div>
            </div>
            <div class="row">
                <div class="span3">
                  <div class="content__form-text">
                      <p class="content__form-title">
                          Address Line 1: *
                      </p>
                  </div>
                  <div class="content__form-line"></div>
                  <input type="text" name="address1" class="content__form-input" v-model="details.address1">
                </div>
                <div class="span4">
                    <div class="content__form-text">
                      <p class="content__form-title">
                          Address Line 2:
                      </p>
                    </div>
                  <div class="content__form-line"></div>
                  <input type="text" name="address2" class="content__form-input" v-model="details.address2">
                </div>
            </div>
            <div class="row">
                <div class="span3">
                  <div class="content__form-text">
                      <p class="content__form-title">
                          City:*
                      </p>
                  </div>
                  <div class="content__form-line"></div>
                  <input type="text" name="city" class="content__form-input" v-model="details.city">
                </div>
            </div>
            <div class="row">
                <div class="span3">
                  <div class="content__form-text">
                      <p class="content__form-title">
                          Zip Code:*
                      </p>
                  </div>
                  <div class="content__form-line"></div>
                  <input type="text" name="zipcode" class="content__form-input" v-model="details.zipcode">
                </div>
                <div class="span4">
                <div class="content__form-text">
                  <p class="content__form-title">
                      State/Region:*
                  </p>
                </div>
                  <div class="content__form-line"></div>
                  <input type="text" name="region" class="content__form-input" v-model="details.region">
                </div>
            </div>
            <div class="row">
                <div class="span3">
                  <div class="content__form-text">
                      <p class="content__form-title">
                          Country:*
                      </p>
                  </div>
                  <div class="content__form-line"></div>
                    <select name="country" class="select-css" v-model="details.country">
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="Andorra">Andorra</option>
                        <option value="Angola">Angola</option>
                        <option value="Antigua & Deps">Antigua & Deps</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Armenia">Armenia</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbados">Barbados</option>
                        <option value="Belarus">Belarus</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Belize">Belize</option>
                        <option value="Benin">Benin</option>
                        <option value="Bhutan">Bhutan</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Bosnia Herzegovina">Bosnia Herzegovina</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgaria">Bulgaria</option>
                        <option value="Burkina">Burkina</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cambodia">Cambodia</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Canada">Canada</option>
                        <option value="Cape Verde">Cape Verde</option>
                        <option value="Central African Rep">Central African Rep</option>
                        <option value="Chad">Chad</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Comoros">Comoros</option>
                        <option value="Congo">Congo</option>
                        <option value="Congo {Democratic Rep}">Congo {Democratic Rep}</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Cyprus">Cyprus</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominica">Dominica</option>
                        <option value="Dominican Republic">Dominican Republic</option>
                        <option value="East Timor">East Timor</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egypt">Egypt</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                        <option value="Eritrea">Eritrea</option>
                        <option value="Estonia">Estonia</option>
                        <option value="Ethiopia">Ethiopia</option>
                        <option value="Fiji">Fiji</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambia">Gambia</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Greece">Greece</option>
                        <option value="Grenada">Grenada</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinea">Guinea</option>
                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haiti">Haiti</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hungary">Hungary</option>
                        <option value="Iceland">Iceland</option>
                        <option value="India">India</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Iran">Iran</option>
                        <option value="Iraq">Iraq</option>
                        <option value="Ireland {Republic}">Ireland {Republic}</option>
                        <option value="Israel">Israel</option>
                        <option value="Italy">Italy</option>
                        <option value="Ivory Coast">Ivory Coast</option>
                        <option value="Jamaica">Jamaica</option>
                        <option value="Japan">Japan</option>
                        <option value="Jordan">Jordan</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Korea North">Korea North</option>
                        <option value="Korea South">Korea South</option>
                        <option value="Kosovo">Kosovo</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                        <option value="Laos">Laos</option>
                        <option value="Latvia">Latvia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libya">Libya</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lithuania">Lithuania</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Macedonia">Macedonia</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malta">Malta</option>
                        <option value="Marshall Islands">Marshall Islands</option>
                        <option value="Mauritania">Mauritania</option>
                        <option value="Mauritius">Mauritius</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Micronesia">Micronesia</option>
                        <option value="Moldova">Moldova</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolia">Mongolia</option>
                        <option value="Montenegro">Montenegro</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar, {Burma}">Myanmar, {Burma}</option>
                        <option value="Namibia">Namibia</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Norway">Norway</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Panama">Panama</option>
                        <option value="Papua New Guinea">Papua New Guinea</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Peru">Peru</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Romania">Romania</option>
                        <option value="Russian Federation">Russian Federation</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="St Kitts & Nevis">St Kitts & Nevis</option>
                        <option value="St Lucia">St Lucia</option>
                        <option value="Saint Vincent & the Grenadines">Saint Vincent & the Grenadines</option>
                        <option value="Samoa">Samoa</option>
                        <option value="San Marino">San Marino</option>
                        <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Slovakia">Slovakia</option>
                        <option value="Slovenia">Slovenia</option>
                        <option value="Solomon Islands">Solomon Islands</option>
                        <option value="Somalia">Somalia</option>
                        <option value="South Africa">South Africa</option>
                        <option value="South Sudan">South Sudan</option>
                        <option value="Spain">Spain</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Sudan">Sudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Swaziland">Swaziland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Syria">Syria</option>
                        <option value="Taiwan">Taiwan</option>
                        <option value="Tajikistan">Tajikistan</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Togo">Togo</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Turkmenistan">Turkmenistan</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Uzbekistan">Uzbekistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Vatican City">Vatican City</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Yemen">Yemen</option>
                        <option value="Zambia">Zambia</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="content__coupons_form" style="padding: 0; margin-top: 0px;">
        <div class="content__coupon">
            <div class="content__coupon-text">
                <p class="content__coupon-title">
                    {{ $t("Redeem Coupons or Gift Cards") }}
                </p>
                <i class="fas fa-tag content__coupon-icon"></i>
            </div>
            <div class="content__coupon-line"></div>
            <div class="content__coupon-main" v-if="!couponActive">
                <input class="content__coupon-input" placeholder="0XXX-00XX-0XXX" v-model="coupon"></input>
                <button class="content__coupon-btn" @click="submitCoupon">
                    {{ $t("Reedem") }}
                </button>
            </div>
            <span v-else style="color: #fff;">Active {{ couponType }}: {{ coupon }} ({{ couponPercent }})</span>
        </div>
        <div class="content__coupon" v-if="$root.settings.is_ref">
            <div class="content__coupon-text">
                <p class="content__coupon-title">
                    {{ $t("Enter referral code (if exists)") }}
                </p>
                <i class="fas user-plus content__coupon-icon"></i>
            </div>
            <div class="content__coupon-line"></div>
            <div class="content__coupon-main">
                <input class="content__coupon-input" placeholder="Can be empty..." v-model="ref"></input>
            </div>
        </div>
        </div>
        <div class="content__payment">
            <div class="content__payment-text">
                {{ $t("Payment Method") }}
            </div>
            <div class="content__payment-line">

            </div>
            <div class="content__payment-block">
                <div class="content__payment-methods">
                    <div class="content__payment-choice" v-for="method in paymentMethods">
                        <input type="radio" style="margin-bottom: 20px;" class="content__payment-checkbox" :checked="paymentMethod === method.name" @click="paymentMethod = method.name">
                        <div class="content__payment-method">
			            <img :src="`/img/${ method.name.toLowerCase() }-metod.png`" style="border-radius: 10px;" alt="method" class="content__payment-method-img">
                            <p class="content__payment-method-subtitle" style="text-align: center;">
                                {{ method.name }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="content__payment-privacy">
                    <input type="checkbox" class="content__payment-checkbox--privacy" v-model="privacy">
                    <div class="content__payment-privacy-text">
                        <div class="content__payment-privacy-title">
                            {{ $t("Privacy Statement") }}
                        </div>
                        <div class="content__payment-privacy-subtitle">
                            {{ $t("All payments are final and non-refundable. Attempting a chargeback or opening a PayPal dispute will result in permanent and irreversible banishment from all of our servers, and other minecraft stores.") }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content__purchase">
            <div class="content__purchase-text">
                <input type="checkbox" class="content__payment-checkbox" v-model="terms">
                <p class="content__purchase-title">
                    {{ $t("I agree to the terms & conditions of this purchase.") }}
                </p>
            </div>
            <button class="content__purchase-btn" :disabled="disableButton" @click="purchase">
                {{ $t("PURCHASE") }}
            </button>
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
                                    <b v-if="!$root.settings.is_virtual_currency || !item.is_virtual_currency_only || item.virtual_price === null">{{ $root.toActualCurrency(item.price) }} <small>{{ $root.currency.name }}</small></b>
                                    <b v-if="$root.settings.is_virtual_currency == 1 && item.is_virtual_currency_only == 1 && item.virtual_price !== null">{{ item.virtual_price }} <small>{{ $root.settings.virtual_currency }}</small></b>
                                </p>
                            </div>
                            <div class="col-sm-8">
                                <div style="display: inline-block;" class="package-footer-buttons" v-if="$root.user !== null">
                                    <button class="orange" v-if="!item.in_cart" @click="addToCart(item.id)" style="border-radius: 8px; margin-top: 5px;">
                                        {{ $t("Add to cart") }}
                                    </button>
                                    <button class="orange" v-if="item.in_cart" @click="removeInCart(item.id)" style="border-radius: 8px; margin-top: 5px;">
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
                    description: '',
                    featured: '',
                    virtual_price: 0.00,
                    is_virtual_currency_only: 0,
                },
                details: {
                    fullname: '',
                    email: '',
                    address1: '',
                    address2: '',
                    city: '',
                    zipcode: '',
                    region: '',
                    country: '',
                },
                privacy: false,
                terms: false,
                paymentMethod: 'PayPal',
                paymentMethods: {},
                disableButton: false,
                ref: this.$root.settings.is_ref ? (this.$cookie.get('ref') ? this.$cookie.get('ref') : '') : '',
                coupon: '',
                couponPercent: '0%',
                couponType: 'coupon',
                couponActive: false,
                disableCouponBtn: false,
                recommended_items: [],
            }
        },
        methods: {
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

                    if (this.$root.cart.items === 0) {
                        this.$router.push({name: 'index'});
                    }

                    this.loadProcess();
                }
            },
            async reloadItem(id, count) {
                const response = await this.$root.axios.post(`/cart/reload/${id}`, {
                    count: count
                });
                const data = response.data;

                if (data.success) {
                    await this.$root.getCart();

                    if (this.$root.cart.items === 0) {
                        this.$router.push({name: 'index'});
                    }
                }
            },
            openTerms() {
                $('#terms').modal('show');
            },
            openPrivacy() {
                $('#privacy').modal('show');
            },
            logout() {
                this.$cookie.delete('token');
                this.$root.getUser();

                this.$router.push({name: 'index'});
            },
            plusCount(item) {
                if (item.quantityLimit === null || item.count < item.quantityLimit)
                    item.count++;
            },
            minusCount(item) {
                if (item.count > 1)
                    item.count--;
            },
            async purchase() {
                this.disableButton = true;

                if (!this.privacy) {
                    this.disableButton = false;
                    return this.$root.showNotification('error', this.$t("Accept Privacy Statement"));
                }

                if (!this.terms) {
                    this.disableButton = false;
                    return this.$root.showNotification('error', this.$t("Accept Terms"));
                }

                if (this.paymentMethod == "Stripe"){
                    let stripeScript = document.createElement('script')
                                  stripeScript.setAttribute('src', 'https://js.stripe.com/v3/')
                                  document.head.appendChild(stripeScript)
                }
                else if (this.paymentMethod == "RazorPay"){
                    let RazorPayScript = document.createElement('script')
							      RazorPayScript.setAttribute('src', 'https://checkout.razorpay.com/v1/checkout.js')
							      document.head.appendChild(RazorPayScript)
                }
                let vars = [];

                for(let i = 0; i < this.$root.cartItems.length; i++){
                    for(let j = 0; j < this.$root.cartItems[i].vars.length; j++){
                        if (this.$root.cartItems[i].vars[j].type != 0 && this.$root.cartItems[i].vars[j].use == ""){
                            this.disableButton = false;
                            return this.$root.showNotification('error', this.$t("One of the option fields is not filled!"));
                        }
                        vars.push([
                            this.$root.cartItems[i].cid,
                            this.$root.cartItems[i].vars[j].id,
                            this.$root.cartItems[i].vars[j].use
                        ]);
                    }
                }

                const response = await this.$root.axios.post(`/payments/create`, {
                    paymentMethod: this.paymentMethod,
                    currency: this.$root.currency.name,
                    vars: vars,
                    ref: this.ref,
                    details: this.details
                });
                const data = response.data;

                if (data.success) {
                    if (data.data !== null) {  /* && typeof data.data.url !== "undefined" */ 
                        if (data.data.type === 'url') {
                            window.location.href = data.data.url;
                        } else {
                            const block = $(data.data.html);
                            $(document.body).append(block);
                            block.submit();
                        }
                    } else {
                        this.disableButton = false;
                        return this.$root.showNotification('error', this.$t("Error generating payment link"));
                    }
                } else {
                    this.disableButton = false;
                    if (data.message == 'success'){
                        this.$router.push({name: 'PaymentSuccess'});
                        this.$root.cartItems = [];
                        this.$root.cart.items = 0;
                        this.$root.cart.price = 0;
                        this.$root.cart.virtual_price = 0;
                        return this.$root.showNotification('success', this.$t("Successfuly gave item(s)!"));
                    }

                    return this.$root.showNotification('error', data.message);
                }
            },
            async getPaymentMethods(isSubscribeMode = false) {
                const response = await this.$root.axios.post(`/payments/get`+"?subs="+(isSubscribeMode ? 1 : 0));

                this.paymentMethods = response.data;
            },
            async submitCoupon() {
                if (this.disableCouponBtn) {
                    return false;
                }

                this.disableCouponBtn = true;

                const response = await this.$root.axios.post(`/cart/acceptCoupon`, {
                    coupon: this.coupon
                });
                const data = response.data;

                if (data.success) {
                    await this.$root.getCart();

                    if (data.type == "gift"){
                        this.couponType = "gift";
                        this.couponPercent = this.$root.toActualCurrency(data.sum).toFixed(2) + ' ' + this.$root.currency.name;
                    } else {
                        this.couponType = "coupon";
                        this.couponPercent = data.percent + '%';
                    }

                    this.$root.showNotification('success', data.message);
                    this.couponActive = true;
                } else {
                    this.disableCouponBtn = false;
                    this.$root.showNotification('error', data.message);
                }
            },
            async getCoupon() {
                const response = await this.$root.axios.post(`/cart/getCoupon`);
                const data = response.data;

                if (data.coupon !== '') {
                    this.coupon = data.coupon;
                    this.couponActive = true;
                    this.disableCouponBtn = true;
                    this.couponType = "coupon";
                    this.couponPercent = data.percent + '%';
                }
            },
            async loadProcess() {
              await this.$root.getCart();

              if (this.$root.cart.items === 0) {
                  this.$router.go(-1);
              }

              let hasSubscribeItem = false;
              let hasRegularItem = false;
              for(let i = 0; i < this.$root.cartItems.length; i++){
                if (this.$root.cartItems[i].is_subs){
                  hasSubscribeItem = true;
                } else {
                  hasRegularItem = true;
                }
              }
              if (hasSubscribeItem && (hasRegularItem || this.$root.cartItems.length > 1))
                return this.$root.showNotification('error', this.$t("To purchase a subscription goods, it must be in the cart alone"));

              this.getPaymentMethods(hasSubscribeItem);

              const response = await this.$root.axios.post(`/cart/getRecommended`);
              this.recommended_items = response.data;
            }
        },
        mounted() {
            if (!this.$cookie.get('token')) {
                this.$router.push({name: 'auth'});
            }

            this.loadProcess();
            this.getCoupon();
        }
    }
</script>