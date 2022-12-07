import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
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

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

// interface NewCycleFormData {
//   task: string,
//   minutesAmount: number
// }
// typeof (is used to use a javascript function inside of typescript)
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
// this type is a typescript (INTERFACE) of validation using zod object.



export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    reset();   // return to the defaultValues  (integration used by zod. line 38)
  }
  const task = watch('task')
  const isSubmitDisabled = !task
  // watching the task form


  // const [task, setTask] = useState('');


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para seu projeto"
            id="task"
            list="task-suggestions"
            // onChange={(e) => setTask(e.target.value)}
            // // e = event (everytime a letter is typed or removed it refreshes the state)
            // value={task}
            {...register('task')}
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
            {...register('minutesAmount', { valueAsNumber: true })}
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

        <StartCountdownButton
          disabled={isSubmitDisabled}
          type="submit">
          {/* it is disabled when there is nothing written on task
                          ( ! ) means when there is nothing */}
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
