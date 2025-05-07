import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useReducer } from "react";
import useHabitStore from "../store/store";
import "./styles.css";

type FormState = {
  name: string;
  frequency: "daily" | "weekly";
};

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_FREQUENCY"; payload: "daily" | "weekly" }
  | { type: "RESET" };

const initialState: FormState = {
  name: "",
  frequency: "daily",
};

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_FREQUENCY":
      return { ...state, frequency: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const AddHabitForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { addHabit } = useHabitStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.name.trim()) {
      addHabit(state.name, state.frequency);
      dispatch({ type: "RESET" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Habit Name"
          value={state.name}
          onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
          placeholder="Enter habit name"
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={state.frequency}
            label="Frequency"
            onChange={(e) => dispatch({ type: "SET_FREQUENCY", payload: e.target.value as "daily" | "weekly" })}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
