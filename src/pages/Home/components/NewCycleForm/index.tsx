import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Controlled Components or Uncontrolled Components
// 

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})
// typeof (is used to use a javascript function inside of typescript)
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
// this type is a typescript (INTERFACE) of validation using zod object.
export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });
  

    return(
        <FormContainer>
        <label htmlFor="">Vou trabalhar em</label>
        <TaskInput
          placeholder="Dê um nome para seu projeto"
          id="task"
          list="task-suggestions"
          disabled={!!activeCycle}
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
          <option value="Bananas" />
        </datalist>
        <label htmlFor="">durante</label>
        <MinutesAmountInput
          type="number"
          placeholder="00"
          id="minutesAmount"
          step={5}
          min={1}
          max={60}
          disabled={!!activeCycle}
          {...register('minutesAmount', { valueAsNumber: true })}
        />

        <span>minutos.</span>
      </FormContainer>
    )
}