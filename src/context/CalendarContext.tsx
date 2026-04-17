import {createContext,useContext,useReducer,useMemo,useEffect,useState} from "react";

import {calendarReducer,generateMonthData} from "../reducers/calendarReducer";

import type {CalendarState,CalendarAction} from "../reducers/calendarReducer";

import type { DayData } from "../types/calendar";

import { useAuth } from "./AuthContext";

interface CalendarContextType {
  state: DayData[];
  habits: string[];
  dispatch: React.Dispatch<CalendarAction>;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  loading: boolean;
  error: string | null;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: React.ReactNode }) {

  const { user } = useAuth();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* USER IDENTIFIER */

  const email = user?.email || "guest";
  console.log("Current Calendar User:", email);

  /* STORAGE KEYS */

  const habitsKey = `habits-${email}`;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const storageKey = `calendar-${email}-${year}-${month}`;

  console.log("Habits Key:", habitsKey);
console.log("Calendar Key:", storageKey);

  /* GLOBAL HABIT TEMPLATES */

  const globalHabits: string[] = JSON.parse(
    localStorage.getItem("global-habits") || "[]"
  );

  const initialHabits = JSON.parse(
    localStorage.getItem(habitsKey) ||
      JSON.stringify(globalHabits.length ? globalHabits : ["Study", "Walk"])
  );

  const [state, dispatch] = useReducer(calendarReducer, {
    days: [],
    habits: initialHabits
  } as CalendarState);

  /* LOAD MONTH DATA */

  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true);
        setError(null);

        await new Promise((res) => setTimeout(res, 200));

        const storedDays = localStorage.getItem(storageKey);

        if (storedDays) {

          dispatch({
            type: "SET_DATA",
            payload: JSON.parse(storedDays)
          });

        } else {

          const newData = generateMonthData(
            year,
            month,
            state.habits
          );

          dispatch({
            type: "SET_DATA",
            payload: newData
          });

        }

      } catch {

        setError("Failed to load calendar data");

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, [currentDate, email]);

  /* SAVE HABITS */

  useEffect(() => {

    localStorage.setItem(
      habitsKey,
      JSON.stringify(state.habits)
    );

  }, [state.habits, habitsKey]);

  /* SAVE CALENDAR DATA */

  useEffect(() => {

    if (state.days.length > 0) {

      localStorage.setItem(
        storageKey,
        JSON.stringify(state.days)
      );

    }

  }, [state.days, storageKey]);

  const value = useMemo(
    () => ({
      state: state.days,
      habits: state.habits,
      dispatch,
      currentDate,
      setCurrentDate,
      loading,
      error
    }),
    [state, currentDate, loading, error]
  );

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {

  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("useCalendar must be used inside CalendarProvider");
  }

  return context;

}