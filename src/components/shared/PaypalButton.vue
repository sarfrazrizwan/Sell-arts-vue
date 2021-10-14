<template>
  <div class="paypal__button" ref="paypal__button"></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    amount: {
      type: [Number, String],
      required: true
    },
    currencyCode: {
      type: String,
      default: "USD"
    }
  },
  mounted() {
    /* eslint-disable */
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount,
                  currency_code: this.currencyCode
                }
              }
            ]
          })
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            this.$emit("onApprove", details)
          })
        }
      })
      .render(this.$refs.paypal__button)
  }
}
</script>
<style scoped>
.paypal__button {
  max-width: 100%;
}
</style>
