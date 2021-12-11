<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Posudbe</h1>
        <span v-if="loanData.length==1">Imate {{ loanData.length }} aktivnu posudbu</span>
        <span v-else-if="loanData.length > 1 && loanData.length < 5">Imate {{ loanData.length }} aktivne posudbe</span>
        <span v-else>Imate {{ loanData.length }} aktivnih posudbi</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>Filtriraj po statusu <span v-if="filteredLoan">: {{ filteredLoan }}</span></span>
          <img src="@/assets/icon-arrow-down.svg" alt="">
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredLoans">U pripremi</li>
            <li @click="filteredLoans">Neplaćeno</li>
            <li @click="filteredLoans">Plaćeno</li>
            <li @click="filteredLoans">Očisti filter</li>
          </ul>
        </div>
        <div @click="newLoan" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="">
          </div>
          <span>Nova posudba</span>
        </div>
      </div>
    </div>
    <!-- loans -->
    <div v-if="loanData.length > 0">
      <Loan v-for="(loan,index) in filteredData" v-bind:loan="loan" :key="index"/>
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="">
      <h3>Nemate upisanih posudbi</h3>
      <p>Stvori novu posudbu klikom na gumb Nova posudba</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Loan from "../components/Loan.vue";
export default {
  name: "Home",
  data() {
    return {
      filterMenu: null,
      filteredLoan: null,
    }
  },
  components: {
    Loan,
  },
  methods: {
    ...mapMutations(["TOGGLE_LOAN"]),
    newLoan() {
      this.TOGGLE_LOAN();
    },
    toggleFilterMenu(){
      this.filterMenu = !this.filterMenu;
    },
    filteredLoans(e) {
      if (e.target.innerText === "Clear Filter") {
        this.filteredLoan = null;
        return;
      }
      this.filteredLoan = e.target.innerText;
    }
  },
  computed: {
    ...mapState(["loanData"]),

    filteredData() {
      return this.loanData.filter(loan => {
        if(this.filteredLoan === "U pripremi") {
          return loan.loanDraft === true;
        }
        if(this.filteredLoan === "Neplaćeno") {
          return loan.loanPending === true;
        }
        if(this.filteredLoan === "Plaćeno") {
          return loan.loanPaid === true;
        }
        return loan;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;
  .header {
    margin-bottom: 65px;
    .left, .right {
      flex: 1;
    }
    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .filter {
        align-items: center;
        span {
          font-size: 12px;
        }
      }
      .filter {
          position: relative;
          margin-right: 40px;
          cursor: pointer;
          
          img {
            margin-left: 12px;
            width: 9px;
            height: 5px;
          }

          .filter-menu {
            
            width: 120px;
            position: absolute;
            top: 25px;
            list-style: none;
            background-color: #1e2139;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            li {
              cursor: pointer;
              font-size: 12px;
              padding: 10px 20px;

              &:hover {
                color: #1e2139;
                background-color: #fff;

              }
            }
          }
      }

      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }
  .empty{
    margin-top: 160px;
    align-items: center;
    img {
      width: 214px;
      height: 200px;
    }
    h3 {
      font-size: 20px;
      margin-top: 40px;
    }
    p {
      text-align: center;
      max-width: 224px;
      font-size: 12px;
      font-weight: 300px;
      margin-top: 16px;
    }
  }
}
</style>
