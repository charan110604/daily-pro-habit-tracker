import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface Props {
  mood: string;
  setMood: (m: string) => void;
}

export default function MoodSelector({ mood, setMood }: Props) {
  return (
    <ToggleButtonGroup
      value={mood}
      exclusive
      onChange={(_, val) => val && setMood(val)}
      size="small"
      sx={{ mt: 1 }}
    >
      <ToggleButton value="🙂">🙂</ToggleButton>
      <ToggleButton value="😐">😐</ToggleButton>
      <ToggleButton value="😞">😞</ToggleButton>
    </ToggleButtonGroup>
  );
}
