import React, { useContext, useState } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { CyclesContext } from '../../contexts/CyclesContext';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
    .min(1, 'The cycle cant be less than 5 minutes')
    .max(60, '60 minutes is the maximum for a project'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);
  const [isConfirmingInterrupt, setIsConfirmingInterrupt] = useState(false);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });
  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch('task');
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const playSound = () => {
    const audio = new Audio('src/assets/startsound.wav');
    audio.play();
  };

  const playInterruptSound = () => {
    const audio = new Audio('src/assets/interruptsound.wav');
    audio.play();
  };

  const handleStartCountdown = (data: NewCycleFormData) => {
    playSound();
    handleCreateNewCycle(data);
  };

  const handleInterruptClick = () => {
    if (isConfirmingInterrupt) {
      playInterruptSound();
      interruptCurrentCycle();
      setIsConfirmingInterrupt(false);
    } else {
      setIsConfirmingInterrupt(true);
    }
  };

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleStartCountdown)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptClick} type="button">
            <HandPalm size={24} />
            {isConfirmingInterrupt ? 'Clique novamente para confirmar' : 'Interromper'}
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            disabled={isSubmitDisabled}
            type="submit"
          >
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
