import { createStore } from 'vuex';
import db from "../firebase/firebaseInit";

export default createStore({
  state: {
    loanData: [],
    loanModal: null,
    modalActive: null,
    loansLoaded: null,
    currentLoanArray: null,
    editLoan: null,
  },
  mutations: {
    TOGGLE_LOAN(state) {
      state.loanModal = !state.loanModal;
    },
    TOGGLE_MODAL(state){
      state.modalActive = !state.modalActive;
    },
    SET_LOAN_DATA(state, payload){
      state.loanData.push(payload);
    },
    LOANS_LOADED(state){
      state.loansLoaded = true;
    },
    SET_CURRENT_LOAN(state, payload) {
      state.currentLoanArray = state.loanData.filter((loan) => {
        return loan.loanId === payload;
      })
    },
    TOGGLE_EDIT_LOAN(state) {
      state.editLoan = !state.editLoan;
    },
    DELETE_LOAN(state, payload) {
      state.loanData = state.loanData.filter((loan) => loan.docId !== payload);
    },
    UPDATE_STATUS_TO_PAID(state, payload) {
      state.loanData.forEach((loan) => {
        if(loan.docId === payload){
          loan.loanPaid = true;
          loan.loanPending = false;
        }
      })
    },
    UPDATE_STATUS_TO_PENDING(state, payload) {
      state.loanData.forEach((loan) => {
        if(loan.docId === payload){
          loan.loanPaid = false;
          loan.loanPending = true;
          loan.loanDraft = false;
        }
      });
    },
  },
  actions: {
    async GET_LOANS({commit, state}){
      const getData = db.collection("loans"); // change name
      const results = await getData.get();
      results.forEach(doc => {
        if(!state.loanData.some((loan) => loan.docId === doc.id)) {
          const data = {
            docId: doc.id,
            loanId: doc.data().loanId,
            // billerStreetAddress: doc.data().billerStreetAddress,
            // billerCity: doc.data().billerCity,
            // billerZipCode: doc.data().billerZipCode,
            // billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            loanDateUnix: doc.data().loanDateUnix,
            loanDate: doc.data().loanDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            // loanItemList: doc.data().loanItemList,
            loanTotal: doc.data().loanTotal,
            loanPending: doc.data().loanPending,
            loanDraft: doc.data().loanDraft,
            loanPaid: doc.data().loanPaid,
          };
          commit("SET_LOAN_DATA", data);
        }
      });
      commit("LOANS_LOADED");
    },
    async UPDATE_LOAN({commit, dispatch}, {docId, routeId}) {
      commit("DELETE_LOAN", docId);
      await dispatch("GET_LOANS");
      commit("TOGGLE_LOAN");
      commit("TOGGLE_EDIT_LOAN");
      commit("SET_CURRENT_LOAN", routeId);
    },
    async DELETE_LOAN({commit}, docId){
      const getLoan = db.collection("loans").doc(docId);
      await getLoan.delete();
      commit("DELETE_LOAN", docId);
    },
    async UPDATE_STATUS_TO_PAID({commit}, docId) {
      const getLoan = db.collection("loans").doc(docId);
      await getLoan.update({
        loanPaid: true,
        loanPending: false,
      });
      commit("UPDATE_STATUS_TO_PAID", docId);
    },
    async UPDATE_STATUS_TO_PENDING({commit}, docId){
      const getLoan = db.collection("loans").doc(docId);
      await getLoan.update({
        loanPaid: false,
        loanPending: true,
        loanDraft: false,
      });
      commit("UPDATE_STATUS_TO_PENDING", docId);
    },
  },
  modules: {
  },
});
