import styles from './Button.module.css'
import { ButtonContainer, ButtonVariant } from './Button.styles';

interface ButtonProps {
  variant?: ButtonVariant
}

// This is the button which is rendered on main page
export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}> Enviar </ButtonContainer>

}