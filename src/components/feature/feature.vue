<template lang="html">
    <span class="feature" :class="feaClass"></span>
</template>

<script>
export default {
    props: {
        typeno: {
            type: Number
        },
        size: {
            type: Number
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    computed: {
        feaClass() {
            return this.classMap[this.typeno] + '-' + this.size;
        }
    }
}
</script>

<style lang="scss">@import '../../assets/sass/mixin.scss';
@mixin iconConfig($size,$feature) {
    width: $size+px;
    height: $size+px;
    margin-right: 4px;
    background-size: $size+px $size+px;
    background-repeat: no-repeat;
    @include bg-image( 'img/'+$feature);
}
.feature {
    display: inline-block;
    font-size: 0;
    vertical-align: top;
    &.decrease-1 {
        @include iconConfig(12,'decrease_1');
    }
    &.decrease-2 {
        @include iconConfig(24,'decrease_2');
    }
    &.decrease-3 {
        @include iconConfig(12,'decrease_3');
    }
    &.decrease-4 {
        @include iconConfig(48,'decrease_4');
    }
    &.special-1 {
        @include iconConfig(12,'special_1');
    }
    &.special-2 {
        @include iconConfig(24,'special_2');
    }
    &.special-3 {
        @include iconConfig(12,'special_3');
    }
    &.special-4 {
        @include iconConfig(48,'special_4');
    }
    &.discount-1 {
        @include iconConfig(12,'discount_1');
    }
    &.discount-2 {
        @include iconConfig(24,'discount_2');
    }
    &.discount-3 {
        @include iconConfig(12,'discount_3');
    }
    &.discount-4 {
        @include iconConfig(48,'discount_4');
    }
    &.guarantee-1 {
        @include iconConfig(12,'guarantee_1');
    }
    &.guarantee-2 {
        @include iconConfig(24,'guarantee_2');
    }
    &.guarantee-3 {
        @include iconConfig(12,'guarantee_3');
    }
    &.guarantee-4 {
        @include iconConfig(48,'guarantee_4');
    }
    &.invoice-1 {
        @include iconConfig(12,'invoice_1');
    }
    &.invoice-2 {
        @include iconConfig(24,'invoice_2');
    }
    &.invoice-3 {
        @include iconConfig(12,'invoice_3');
    }
    &.invoice-4 {
        @include iconConfig(48,'invoice_4');
    }

}
</style>
