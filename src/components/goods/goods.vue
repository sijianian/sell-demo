<template lang="html">
<div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li v-for="(item,index) in goods" class="menu-item menu-item-hook" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                <span class="text"><feature v-if="item.type>0" :typeno="item.type" :size="3"></feature>{{item.name}}</span>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
            <li v-for="item in goods" class="food-list food-list-hook">
                <h1 class="title" v-text="item.name"></h1>
                <ul>
                    <li v-for="food in item.foods" class="food-item">
                        <div class="icon">
                            <img width="57" height="57" :src="food.icon" alt="">
                        </div>
                        <div class="content">
                            <h2 class="name" v-text="food.name"></h2>
                            <p class="desc" v-text="food.description"></p>
                            <div class="extra">
                                <span class="count">月售{{food.sellCount}}份</span>
                                <span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="now">￥{{food.price}}</span>
                                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
</div>
</template>

<script>
import feature from '../feature/feature'
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import {
    API_ROOT
} from '../../config'

const ERR_OK = 0;

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            curIndex: 0
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        this.$http.get(API_ROOT + 'api/goods').then((response) => {
            response = response.body;
            if (response.errno === ERR_OK) {
                this.goods = response.data;
                this.$nextTick(() => {
                    this.initScroll();
                    this.calculateHeight();
                });
            }
        })
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
                    this.curIndex = i;
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good, index) => {
                good.foods.forEach((food, index) => {
                    if (food.count) {
                        foods.push(food);
                    }
                })
            });
            return foods;
        }
    },
    methods: {
        initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            });
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
                let menuList = this.$refs.menuWrapper.getElementsByClassName('menu-item-hook');
                let el = menuList[this.curIndex];
                this.menuScroll.scrollToElement(el, 300);
            });
        },
        calculateHeight() {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectMenu(index, e) {
            if (!e._constructed) {
                return;
            }
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el, 300);
        }
    },
    components: {
        feature,
        shopcart,
        cartcontrol
    }
}
</script>

<style lang="scss">@import '../../assets/sass/mixin.scss';
.goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 54px;
    width: 100%;
    text-align: left;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item {
            display: table;
            width: 56px;
            height: 54px;
            padding: 0 12px;
            line-height: 14px;
            .text {
                display: table-cell;
                width: 56px;
                vertical-align: middle;
                font-size: 12px;
                @include border-1px(rgba(7,17,27,0.1));
            }
            &.current {
                position: relative;
                z-index: 10;
                margin-top: -1px;
                font-weight: 700px;
                background: #fff;
                .text {
                    @include border-none();
                }
            }
        }
    }
    .foods-wrapper {
        flex: 1;
        .title {
            height: 26px;
            padding-left: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147,153,159);
            background: #f3f5f7;
        }
        .food-item {
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            @include border-1px(rgba(7,17,27,0.1));
            &:last-child {
                @include border-none();
                margin-bottom: 0;
            }
            .icon {
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .content {
                flex: 1;
                .name {
                    height: 20px;
                    line-height: 20px;
                    font-size: 20px;
                    font-weight: 600;
                    margin: 2px 0 8px;
                    color: rgb(7,17,27);
                }
                .desc,
                .extra {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
                .desc {
                    margin-bottom: 8px;
                    line-height: 12px;
                }
                .extra {
                    line-height: 10px;
                    &.count {
                        margin-right: 12px;
                    }
                }
                .price {
                    font-weight: 700;
                    line-height: 24px;
                    .now {
                        margin-right: 18px;
                        font-size: 14px;
                        color: rgb(240,20,20);
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 10px;
                        color: rgb(140,153,159);
                    }
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 12px;
                }
            }
        }
    }
}
</style>
