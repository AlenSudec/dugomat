<template>
  <div v-if="currentLoan" class="loan-view container">
    <router-link class="nav-link flex" :to="{ name: 'Home' }" >
      <img src="@/assets/icon-arrow-left.svg" alt=""/> Nazad
    </router-link>
    <!-- Header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div class="status-button flex" :class="{
          paid: currentLoan.loanPaid,
          draft: currentLoan.loanDraft,
          pending: currentLoan.loanPending,
          }">
            <span v-if="currentLoan.loanPaid">Plaćeno</span>
            <span v-if="currentLoan.loanDraft">U pripremi</span>
            <span v-if="currentLoan.loanPending">Neplaćeno</span>
          </div>
      </div>
      <div class="right flex">
        <button @click="toggleEditLoan" class="dark-purple">Uredi</button>
        <button @click="deleteLoan(currentLoan.docId)" class="red">Obriši</button>
        <button v-if="currentLoan.loanPending" @click="updateStatusToPaid(currentLoan.docId)" class="green">Označi kao plaćeno</button>
        <button v-if="currentLoan.loanDraft || currentLoan.loanPaid" @click="updateStatusToPending(currentLoan.docId)" class="orange">Označi kao neplaćeno</button>
      </div>
    </div>

    <!-- loans details -->
    <div class="loan-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentLoan.loanId }}</p>
          <p>{{ currentLoan.productDescription }}</p>
        </div>
      </div>
      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Datum posudbe</h4>
          <p>{{ currentLoan.loanDate }}</p>
          <h4>Datum plaćanja</h4>
          <p>{{ currentLoan.paymentDueDate }}</p>
        </div>
        <div class="bill flex flex-column">
          <h4>Osoba koja posuđuje</h4>
          <p>{{ currentLoan.clientName }}</p>
          <p>{{ currentLoan.clientStreetAddress }}</p>
          <p>{{ currentLoan.clientCity }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Email osobe koja posuđuje</h4>
          <p>{{ currentLoan.clientEmail }}</p>
        </div>
      </div>
      <div class="total flex">
          <p>Iznos posudbe</p>
          <p>{{ currentLoan.loanTotal }}kn</p>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState} from "vuex";
export default {
  name: "loanView",
  data() {
    return {
      currentLoan: null,
    }
  },
  created() {
    this.getCurrentLoan();
  },
  methods: {
    ...mapMutations(["SET_CURRENT_LOAN", "TOGGLE_EDIT_LOAN", "TOGGLE_LOAN"]),
    ...mapActions(["DELETE_LOAN","UPDATE_STATUS_TO_PENDING","UPDATE_STATUS_TO_PAID"]),

    getCurrentLoan() {
      this.SET_CURRENT_LOAN(this.$route.params.loanId);
      this.currentLoan = this.currentLoanArray[0];
    },
    toggleEditLoan() {
      this.TOGGLE_EDIT_LOAN();
      this.TOGGLE_LOAN();
    },
    async deleteLoan(docId) {
      await this.DELETE_LOAN(docId);
      this.$router.push({name: "Home"});
    },
    updateStatusToPaid(docId){
      this.UPDATE_STATUS_TO_PAID(docId);
    },
    updateStatusToPending(docId){
      this.UPDATE_STATUS_TO_PENDING(docId);
    },
  },
  computed: {
    ...mapState(["currentLoanArray","editLoan"]), //
  },
  watch : {
    editLoan() {
      if(!this.editLoan){
        this.currentLoan = this.currentLoanArray[0];
        
      }
    },
  }

  

};
</script>

<style lang="scss" scoped>
  .loan-view {
    .nav-link {
      margin-bottom: 32px;
      align-items: center;
      color: #fff;
      font-size: 12px;
      img {
        margin-right: 16px;
        width: 7px;
        height: 10px;
      }
    }
    .header,
    .loan-details {
      background-color: #393E46;
      border-radius: 20px;
    }
    .header {
      align-items: center;
      padding: 24px 32px;
      font-size: 12px;
      .left {
        align-items: center;

        span {
          color: #dfe3fa;
          margin-right: 16px;
        }
      }
      .right {
        flex: 1;
        justify-content: flex-end;
        .dark-purple {
          background: #222831;
        }
        .button {
          color: #fff;
        }
      }
    }

    .loan-details{
      padding: 48px;
      margin-top: 24px;
       .total {
          color: #fff;
          padding: 32px;
          background-color: #D65A31;
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 50px;
          border-radius: 20px 20px 20px 20px;
          margin-top: 20px;
          p {
            font-size: 28px;
          }
       }
      .top {
        div {
          color: #dfe3fa;
          flex: 1;
        }

        .left {
          font-size: 12px;
          p:first-child {
            font-size: 24px;
            text-transform: uppercase;
            color: #fff;
            margin-bottom: 8px;
          }

          p:nth-child(2){
            font-size: 16px;
          }

          span {
            color: #D65A31;
          }
        }
        .right {
          font-size: 12px;
          align-items: flex-end;
        }
      }

      .middle {
        margin-top: 50px;
        margin-bottom: 20px;
        color: #dfe3fa;
        gap: 100px;

        h4 {
          font-size: 12px;
          font-weight: 400;
          margin-bottom: 12px;

        }

        p {
          font-size: 16px;
        }

        .bill,
        .payment {
          flex: 1;
        }
        .payment {
          h4:nth-child(3){
            margin-top: 32px;
          }
          p {
            font-weight: 600;
          }
        }
        .bill {
          p:nth-child(2) {
            font-size: 16px;

          }
          p:nth-child(3) {
            margin-top: auto;
          }

          p {
            font-size: 12px;
          }
        }
        .send-to {
          flex: 2;
        }
      }

      .bottom {
        margin-top: 50px;
        .billing-items {
          padding: 32px;
          border-radius: 20px 20px 0 0;
          background-color: #252945;

          .heading {
            color: #dfe3fa;
            font-size: 12px;
            margin-bottom: 32px;

            p:first-child {
              flex: 3;
              text-align: left;
            }
            p {
              flex: 1;
              text-align: right;
            }
          }

          .item {
            margin-bottom: 32px;
            font-size: 13px;
            color: #fff;

            &:last-child {
              margin-bottom: 0;
            }

            p:first-child {
              flex: 3;
              text-align: left;
            }
            p {
              flex: 1;
              text-align: right;
            }
          }
        }

        .total {
          color: #fff;
          padding: 32px;
          background-color: rgba(12, 14, 22, 0.7);
          align-items: center;
          border-radius: 0 0 20px 20px;
          p {
            flex: 1;
            font-size: 12px;

          }
          P:nth-child(2){
            font-size: 28px;
            text-align: right;
          }
        }
      }
    }
  }
</style>