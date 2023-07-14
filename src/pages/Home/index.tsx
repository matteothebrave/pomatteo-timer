import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { createContext, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import NewCycleForm from './components/NewCycleForm'
import Countdown from './components/Countdown'

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
  aciveCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)


export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)
  
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

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const id = String(new Date().getTime());

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutesAmount: data.minutesAmount,
  //     startDate: new Date()
  //   }

  //   setCycles((state) => [...state, newCycle]);
  //   setActiveCycleId(id)
  //   setAmountSecondsPassed(0) // Reset to 0 whenever a new project is created.

    
  //   onreset();   // return to the defaultValues  (integration used by zod. line 38)
  // }

  function handleInterruptCycle() {
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

  // const task = watch('task')
  // const isSubmitDisabled = !task
  // watching the task form
  // const [task, setTask] = useState('');
  //->Class with diego about useEffect - Basically, it is a hook which render everytime the component is used by
  // a dependency array or is exibited on screen.  

  return (
    <HomeContainer>
      <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ action="">
        <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
      {/* <NewCycleForm /> */}
      <Countdown />
      {/* We are going to insert Context API */}
      </CyclesContext.Provider>
      {activeCycle ? (
        <StopCountdownButton onClick={handleInterruptCycle}type="button">
          <HandPalm size={24} />
          Interromper
          </StopCountdownButton>
      ) : (
        <StartCountdownButton /*disabled={isSubmitDisabled}*/ type="submit">
          <Play size={24} />
          Começar
          </StartCountdownButton>
      )
    
    }
      
      </form>
    </HomeContainer>
  )
}
