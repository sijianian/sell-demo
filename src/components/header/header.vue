<template>
<div class="header">
    <div class="content-wrapper">
        <div class="avatar">
            <img width="64" height="64" :src="seller.avatar" alt="">
        </div>
        <div class="content">
            <div class="title">
                <span class="brand"></span>
                <span class="name" v-text="seller.name"></span>
            </div>
            <div class="description" v-text="seller.description+'/'+seller.deliveryTime+'分钟送达'">
            </div>
            <div class="support" v-if="seller.supports">
                <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                <span class="text" v-text="seller.supports[0].description"></span>
            </div>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
            <span class="count" v-text="seller.supports.length+'个'"></span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span>
        <span class="bulletin-text" v-text="seller.bulletin"></span>
        <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
        <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <transition name="fade">
        <div class="detail" v-show="detailShow">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name" v-text="seller.name"></h1>
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="(item,index) in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                            <span class="text" v-text="seller.supports[index].description"></span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content" v-text="seller.bulletin"></p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <i class="icon-close"></i>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import star from '../star/star'

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            detailShow: false
        }
    },
    methods: {
        showDetail() {
            this.detailShow = true;
        },
        hideDetail() {
            this.detailShow = false;
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
        star
    }
}
</script>

<style lang="scss">@import '../../assets/sass/mixin.scss';
.header {
    position: relative;
    color: #fff;
    background: rgba(7,17,27,0.5);
    overflow: hidden;
    .content-wrapper {
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0;
        .avatar {
            display: inline-block;
            vertical-align: top;
            img {
                border-radius: 2px;
            }
        }
        .content {
            display: inline-block;
            margin-left: 16px;
            .title {
                margin: 2px 0 8px;
                .brand {
                    display: inline-block;
                    vertical-align: top;
                    width: 30px;
                    height: 18px;
                    @include bg-image( 'img/brand');
                    background-repeat: no-repeat;
                    background-size: 30px 18px;
                }
                .name {
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                }
            }
            .description {
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
            }
            .support {
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image( 'img/decrease_1');
                    }
                    &.discount {
                        @include bg-image( 'img/discount_1');
                    }
                    &.guarantee {
                        @include bg-image( 'img/guarantee_1');
                    }
                    &.invoice {
                        @include bg-image( 'img/invoice_1');
                    }
                    &.special {
                        @include bg-image( 'img/special_1');
                    }
                }
                .text {
                    line-height: 12px;
                    font-size: 12px;
                }
            }
        }
        .support-count {
            position: absolute;
            right: 12px;
            bottom: 14px;
            height: 24px;
            line-height: 24px;
            padding: 0 8px;
            text-align: center;
            border-radius: 14px;
            background: rgba(0,0,0,0.2);
            .count {
                vertical-align: top;
                font-size: 10px;
            }
            .icon-keyboard_arrow_right {
                margin-left: 2px;
                line-height: 24px;
                font-size: 10px;
            }
        }
    }
    .bulletin-wrapper {
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: rgba(7,17,27,0.2);
        .bulletin-title {
            display: inline-block;
            vertical-align: top;
            width: 22px;
            height: 12px;
            margin-top: 8px;
            @include bg-image( 'img/bulletin');
            background-size: 22px 12px;
            background-repeat: no-repeat;
        }
        .bulletin-text {
            margin: 0 4px;
            font-size: 10px;
        }
        .icon-keyboard_arrow_right {
            position: absolute;
            right: 10px;
            top: 8px;
            font-size: 10px;
        }
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter:blur(10px);
    }
    .detail {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: auto;
        transition: all 0.5s;
        background: rgba(7,17,27,0.8);
        &.fade-enter-active,
        &.fade-leave-active {
            opacity: 0;
            background: rgba(7,17,27,0);
        }
        .detail-wrapper {
            width: 100%;
            height: 100%;
            .detail-main {
                // margin-top: 64px;
                padding: 64px 0;
                .name {
                    line-height: 16px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                }
                .star-wrapper {
                    margin-top: 18px;
                    padding: 2px 0;
                    text-align: center;
                }
                .title {
                    display: flex;
                    width: 80%;
                    margin: 28px auto 24px;
                    .line {
                        flex: 1;
                        position: relative;
                        top: -6px;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                    }
                    .text {
                        padding: 0 12px;
                        font-weight: 700;
                        font-size: 14px;
                    }
                }
                .supports {
                    width: 80%;
                    margin: 0 auto;
                    .support-item {
                        padding: 0 12px;
                        margin-bottom: 12px;
                        font-size: 0;
                        text-align: left;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .icon {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            vertical-align: top;
                            margin-right: 6px;
                            background-size: 16px 16px;
                            background-repeat: no-repeat;
                            &.decrease {
                                @include bg-image( 'img/decrease_2');
                            }
                            &.discount {
                                @include bg-image( 'img/discount_2');
                            }
                            &.guarantee {
                                @include bg-image( 'img/guarantee_2');
                            }
                            &.invoice {
                                @include bg-image( 'img/invoice_2');
                            }
                            &.special {
                                @include bg-image( 'img/special_2');
                            }
                        }
                        .text {
                            line-height: 16px;
                            font-size: 12px;
                        }
                    }
                }
                .bulletin {
                    width: 80%;
                    margin: 0 auto;
                    .content {
                        padding: 0 12px;
                        line-height: 24px;
                        font-size: 12px;
                        text-indent: 2;
                        text-align: left;
                    }
                }
            }
        }
        .detail-close {
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0;
            clear: both;
            font-size: 32px;
        }
    }
}
</style>
