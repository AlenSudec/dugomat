<template>
  <router-link v-if="userMail==loan.created" class="loan flex" :to="{name: 'Loan', params: { loanId: loan.loanId }}">
      <div class="left flex">
          <!-- <span>{{loan.created}}</span> -->
          <span class="tracking-number">#{{loan.loanId}}</span>
          <span class="due-date">{{loan.paymentDueDate}}</span>
          <span class="person">{{loan.clientName}}</span>
      </div>
      <div class="right flex">
          <span class="price">{{loan.loanTotal}}kn</span>
          <div class="status-button flex" :class="{paid : loan.loanPaid, draft: loan.loanDraft, pending: loan.loanPending}">
              <span v-if="loan.loanPaid">Plaćeno</span>
              <span v-if="loan.loanDraft">U pripremi</span>
              <span v-if="loan.loanPending">Neplaćeno</span>
          </div>
          <div class="icon">
              <img src="@/assets/icon-arrow-right.svg" alt=""/>
          </div>
      </div>
  </router-link>
  
</template>

<script>
import {mapGetters } from "vuex";
import store from "../store/index";
export default {
    name: "loan",
    props: ["loan"],
    data : function() {
        return {
            userMail: store.state.user.data.email
        }
    },
    computed: {

        ...mapGetters({
            user: "user"
        }),
        
    },
    
};

</script>
<style lang="scss" scoped>
.loan{
    text-decoration: none;
    cursor: pointer;
    gap: 16px;
    margin-bottom: 16px;
    color: #fff;
    border-radius: 20px;
    padding: 28px 32px;
    background-color: #393E46;
    align-items: center;
    span {
        font-size: 13px;
    }

    .left {
        align-items: center;
        flex-basis: 60%;
        gap: 16px;
        span {
            flex: 1;
        }
        .tracking-number{
            text-transform: uppercase;
        }
    }

    .right{
        gap: 16px;
        flex-basis: 40%;
        align-items: center;
        .price {
            flex: 1;
            font-size: 16px;
            font-weight: 600px;
        }
    }
}
</style>