<template>
    <div>
    <div id="page-title" class="gray">
        <div class="container">
            <h1>SkyBlock</h1>
            <p>You're currently looking at this category. And this is a description, that you can edit with using admin panel!</p>
        </div>
    </div>
    <div id="content" class="username">
        <div class="container" style="padding: 0 0.3%;">
            <div class="container" style="padding: 0 0.2%;">
                <div class="box">
                    <h1 class="ms-h1 orange"></h1>
                </div>
                
                <table>
                      <tr>
                        <th style="width:25%"></th>
                        <th>
                          <div class="content__shop-card hvr-grow" style="height: auto; width: auto;"> 
                            <img src="/img/items/69.png" width="170" height="140" title="" onerror="this.onerror=null;this.src='/img/items/def.png';" data-original-title="Click for more details" class="content__shop-card-img">
                            <p class="content__shop-card-title hvr-grow">VIP Rank</p>
                           <div class="content__shop-card-price"><del class="content__shop-card-price-del">9.99</del> <p class="content__shop-card-price-text">8.99 USD</p></div>
                             <button class="content__shop-card-btn" style="background: #f25700;color: #fff;padding: 7px 40px;margin-bottom: 15px;">BUY</button>
                           </div>
                        </th>
                        <th>
                          <div class="content__shop-card hvr-grow" style="height: auto; width: auto;"> 
                            <img src="/img/items/68.png" width="170" height="140" title="" onerror="this.onerror=null;this.src='/img/items/def.png';" data-original-title="Click for more details" class="content__shop-card-img">
                            <p class="content__shop-card-title">VIP+ Rank</p>
                           <div class="content__shop-card-price"><del class="content__shop-card-price-del">9.99</del> <p class="content__shop-card-price-text">8.99 USD</p></div>
                             <button class="content__shop-card-btn" style="background: #f25700;color: #fff;padding: 7px 40px;margin-bottom: 15px;">BUY</button>
                           </div>
                        </th>
                        <th>
                          <div class="content__shop-card hvr-grow featured" style="height: auto; width: auto;"> 
                            <img src="/img/items/67.png" width="170" height="140" title="" onerror="this.onerror=null;this.src='/img/items/def.png';" data-original-title="Click for more details" class="content__shop-card-img">
                            <p class="content__shop-card-title">MVP Rank</p>
                           <div class="content__shop-card-price"><del class="content__shop-card-price-del">9.99</del> <p class="content__shop-card-price-text">8.99 USD</p></div>
                             <button class="content__shop-card-btn" style="background: #f25700;color: #fff;padding: 7px 40px;margin-bottom: 15px;">BUY</button>
                           </div>
                        </th>
                        <th>
                          <div class="content__shop-card hvr-grow" style="height: auto; width: auto;"> 
                            <img src="/img/items/69.png" width="170" height="140" title="" onerror="this.onerror=null;this.src='/img/items/def.png';" data-original-title="Click for more details" class="content__shop-card-img">
                            <p class="content__shop-card-title">MVP+ Rank</p>
                           <div class="content__shop-card-price"><del class="content__shop-card-price-del">9.99</del> <p class="content__shop-card-price-text">8.99 USD</p></div>
                             <button class="content__shop-card-btn" style="background: #f25700;color: #fff;padding: 7px 40px;margin-bottom: 15px;">BUY</button>
                           </div>
                        </th>
                      </tr>
                      <tr>
                        <td>Chat Name Color</td>
                        <td><a style="color: #78BB37;">Green</a></td>
                        <td><a style="color: #78BB37;">Green</a></td>
                        <td><a style="color: #4CBADF;">Aqua</a></td>
                        <td><a style="color: #4CBADF;">Aqua</a></td>
                      </tr>
                      <tr>
                        <td>Chat Prefix</td>
                        <td><a style="color: #78BB37;">[VIP]</a></td>
                        <td><a style="color: #78BB37;">[VIP+]</a></td>
                        <td><a style="color: #4CBADF;">[MVP]</a></td>
                        <td><a style="color: #4CBADF;">[MVP+]</a></td>
                      </tr>
                      <tr>
                        <td>Support the Server</td>
                        <td><i class="fa fa-check"></i></td>
                        <td><i class="fa fa-check"></i></td>
                        <td><i class="fa fa-check"></i></td>
                        <td><i class="fa fa-check"></i></td>
                      </tr>
                      <tr>
                        <td>/fw Command</td>
                        <td><i class="fa fa-remove"></i></td>
                        <td><i class="fa fa-remove"></i></td>
                        <td><i class="fa fa-remove"></i></td>
                        <td><i class="fa fa-check"></i></td>
                      </tr>
                      <tr>
                        <td>Game Replays (/games) Command</td>
                        <td><i class="fa fa-remove"></i></td>
                        <td><i class="fa fa-remove"></i></td>
                        <td><i class="fa fa-remove"></i></td>
                        <td><i class="fa fa-check"></i></td>
                      </tr>
                </table>
                
                
            </div>
        </div>
    </div>
    </div>
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
        }
    }
</script>