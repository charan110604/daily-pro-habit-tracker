import { Checkbox, FormControlLabel } from "@mui/material";

interface Props {
  checked: boolean;
  label: string;
  onClick: () => void;
}

export default function HabitCell({ checked, label, onClick }: Props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onClick}
          sx={{
            color: "#1976d2",
            "&.Mui-checked": { color: "#2e7d32" }
          }}
        />
      }
      label={label}
      sx={{ display: "block" }}
    />
  );
}
