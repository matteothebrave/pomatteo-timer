import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { useEffect, useState } from 'react'
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

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)
  

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id)
    setAmountSecondsPassed(0) // Reset to 0 whenever a new project is created.

    
    reset();   // return to the defaultValues  (integration used by zod. line 38)
  }

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


  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds])

  const task = watch('task')
  const isSubmitDisabled = !task
  // watching the task form
  // const [task, setTask] = useState('');
  //->Class with diego about useEffect - Basically, it is a hook which render everytime the component is used by
  // a dependency array or is exibited on screen.  

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
      <NewCycleForm />
      <Countdown activeCycle={activeCycle} setCycles={setCycles} activeCycleId={activeCycleId}/>
      {/* We are going to insert Context API */}
        
      {activeCycle ? (
        <StopCountdownButton onClick={handleInterruptCycle}type="button">
          <HandPalm size={24} />
          Interromper
          </StopCountdownButton>
      ) : (
        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
          </StartCountdownButton>
      )
    
    }
      
      </form>
    </HomeContainer>
  )
}
