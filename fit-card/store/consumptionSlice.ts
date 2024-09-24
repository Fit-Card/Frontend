// @/store/consumptionSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface Expense {
  category: string;
  percentage: number;
}

interface ConsumptionState {
  expenses: Expense[];
}

const initialState: ConsumptionState = {
  expenses: [
    { category: "식비", percentage: 30 },
    { category: "카페", percentage: 15 },
    { category: "교통", percentage: 25 },
    { category: "주유", percentage: 20 },
    { category: "기타", percentage: 10 },
  ],
};

const consumptionSlice = createSlice({
  name: "consumption",
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
  },
});

export const { setExpenses } = consumptionSlice.actions;
export default consumptionSlice.reducer;
