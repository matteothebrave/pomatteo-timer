import { createContext, ReactNode, useState } from "react";

interface CreateCycleData { 
    task: string;
    minutesAmount: number
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    isActive: boolean;
    startDate: Date;
    interruptedDate?: Date
    finishedDate?: Date
  }

interface CyclesContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
  }


export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}



export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId)
    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
      }
      function markCurrentCycleAsFinished() {
        setCycles(state => state.map((cycle) => {
          if (cycle.id === activeCycleId) {
            return { ...cycle, finishedDate: new Date() } 
          } else {
              return cycle
            }
          }),
        )
      }

      function interruptCurrentCycle() {
        setCycles(state => 
         state.map((cycle) => {
         if (cycle.id === activeCycleId) {
           return { ...cycle, interruptedDate: new Date() } 
         } else {
             return cycle
           }
         }),
       )
       setActiveCycleId(null); 
     }
     function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());
    
        const newCycle: Cycle = {
          id,
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date(),
          isActive: false
        }
        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id)
        setAmountSecondsPassed(0) // Reset to 0 whenever a new project is created.
        // reset()
    return(
        <CyclesContext.Provider 
        value={{
            activeCycle,
            activeCycleId, 
            markCurrentCycleAsFinished, 
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle
            }}
            >
            {children}
            </CyclesContext.Provider>
    )
}
}