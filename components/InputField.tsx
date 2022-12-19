import React, { FC } from 'react'
import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel'

export interface InputFieldProps {
  id: string
  name: string
  label: string
  required?: boolean
  helpMessage?: string
  textRequired?: string
  errorMessage?: string
  type?: React.HTMLInputTypeAttribute
  value?: string | number | readonly string[]
  max?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const InputField: FC<InputFieldProps> = ({
  id,
  label,
  name,
  errorMessage,
  onChange,
  required,
  textRequired,
  type,
  value,
  max,
  helpMessage,
}) => {
  const inputErrorMessageId = `input-${id}-error`
  const inputHelpMessageId = `input-${id}-help`
  const inputWrapperId = `input-${id}`
  const inputLabelId = `input-${id}-label`

  const getAriaDescribedby = () => {
    const ariaDescribedby: string[] = []
    if (errorMessage) ariaDescribedby.push(inputErrorMessageId)
    if (helpMessage) ariaDescribedby.push(inputHelpMessageId)
    return ariaDescribedby.length > 0 ? ariaDescribedby.join(' ') : undefined
  }

  return (
    <div className="mb-4" id={inputWrapperId} data-testid={id}>
      <InputLabel
        id={inputLabelId}
        htmlFor={id}
        required={required}
        label={label}
        textRequired={textRequired}
      />
      {errorMessage && (
        <InputErrorMessage id={inputErrorMessageId} message={errorMessage} />
      )}
      <input
        aria-describedby={getAriaDescribedby()}
        aria-invalid={errorMessage ? true : undefined}
        aria-label={inputLabelId}
        aria-required={required ? true : undefined}
        className={`block h-9 py-1.5 px-3 border rounded ${
          errorMessage ? 'border-accent-error' : 'border-neutral-400'
        } focus:outline-none focus:border-sky-500 focus:ring-sky-500`}
        id={id}
        max={max}
        name={name}
        onChange={onChange}
        type={type}
        value={value ?? ''}
      />
      {helpMessage && (
        <div
          className="text-gray-600 text-base max-w-prose mt-1.5"
          id={inputHelpMessageId}
        >
          {helpMessage}
        </div>
      )}
    </div>
  )
}

InputField.defaultProps = {
  type: 'text',
}

export default InputField
