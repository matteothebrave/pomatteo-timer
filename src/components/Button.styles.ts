import styled, { css } from 'styled-components'


export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';


interface ButtonContainerProps {
  variant: ButtonVariant;
}

// The variants of button properties
const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green'
}


// The Button Container which is rendered on main page 
export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;
    background-color: ${props => props.theme['blue-500']};
    color: ${props => props.theme.white};
    border-radius: 4px;
    border: 0;
    margin: 8px;

    /* ${props => {
      return css`
      background-color: ${buttonVariants[props.variant]}`
    }} */
`

