<template lang="html">
<div class="cartcontrol">
    <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @click="calCart($event,0)">
            <span class="inner icon-remove_circle_outline"></span>
        </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="calCart($event,1)"></div>
</div>
</template>

<script>
import Vue from 'vue';

export default {
    props: {
        food: {
            type: Object
        }
    },
    created() {

    },
    methods: {
        calCart(event, flag) {
            if (!event._constructed) {
                return;
            }
            if (!flag) {
                this.food.count--;
                return;
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count++;
            }
        }
    }
}
</script>

<style lang="scss">
.cartcontrol {
    font-size: 0;
    .cart-count {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: rgb(147,153,159);
    }
    .cart-decrease {
        display: inline-block;
        padding: 6px;
        transition: all 0.4s linear;
        .inner {
            display: inline-block;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0,160,220);
        }
        &.move-enter-active,
        &.move-leave {
            opacity: 1;
            transform: translate3D(0,0,0);
            .inner {
                transform: rotate(0);
            }
        }
        &.move-enter,
        &.move-leave-active {
            opacity: 0;
            transform: translate3d(24px,0,0);
            .inner {
                transform: rotate(180deg);
            }
        }
    }
    .cart-add {
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0,160,220);
    }

}
</style>
