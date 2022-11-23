import { Play } from 'phosphor-react'
import { useState } from 'react';
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

// Controlled Components or Uncontrolled Components
// 

export function Home() {

  // const [task, setTask] = useState('');
  function handleSubmit(event) {
        event.target.task.value
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit}action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para seu projeto"
            id="task"
            list="task-suggestions"
            name="task"
            // onChange={(e) => setTask(e.target.value)}
            // // e = event (everytime a letter is typed or removed it refreshes the state)
            // value={task}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="Banana" />
          </datalist>
          <label htmlFor="">durante</label>
          <MinutesAmountInput
            type="number"
            placeholder="00"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos</span>
        </FormContainer>
        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton disabled={!task} type="submit">
                           {/* it is disabled when there is nothing written on task
                          ( ! ) means when there is nothing */}
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
