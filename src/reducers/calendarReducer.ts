import type { DayData } from "../types/calendar";

export interface CalendarState {
  days: DayData[];
  habits: string[];
}

export type CalendarAction =
  | { type:"SET_DATA"; payload:DayData[] }
  | { type:"TOGGLE_HABIT"; date:string; habitIndex:number }
  | { type:"SET_MOOD"; date:string; mood:string }
  | { type:"ADD_HABIT"; name:string }
  | { type:"DELETE_HABIT"; habitIndex:number };

export function generateMonthData( // creates initial calendar for a month
  year:number,
  month:number,
  habits:string[]
):DayData[]{

  const daysInMonth = new Date(year,month+1,0).getDate(); // find no of days in a month

  return Array.from({length:daysInMonth},(_,i)=>({   // create array of days
    date:new Date(year,month,i+1).toDateString(),
    habits:Array(habits.length).fill(false),        // create a day object
    mood:""
  }));
}

export function calendarReducer(    // core state manager
  state:CalendarState,
  action:CalendarAction
):CalendarState{

  switch(action.type){

    case "SET_DATA":
      return { ...state, days:action.payload };

    case "ADD_HABIT":
      return {
        ...state,
        habits:[...state.habits,action.name],
        days:state.days.map(day=>({
          ...day,
          habits:[...day.habits,false]
        }))
      };

    case "DELETE_HABIT":
      return{
        ...state,
        habits:state.habits.filter((_,i)=>i!==action.habitIndex),
        days:state.days.map(day=>({
          ...day,
          habits:day.habits.filter((_,i)=>i!==action.habitIndex)
        }))
      };

    case "TOGGLE_HABIT":
      return{
        ...state,
        days:state.days.map(day =>
          day.date===action.date
            ?{
                ...day,
                habits:day.habits.map((h,i)=>
                  i===action.habitIndex ? !h : h
                )
              }
            :day
        )
      };

    case "SET_MOOD":
      return{
        ...state,
        days:state.days.map(day =>
          day.date===action.date
            ?{...day,mood:action.mood}
            :day
        )
      };

    default:
      return state;
  }
}