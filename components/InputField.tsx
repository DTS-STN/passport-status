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
  return (
    <div className="mb-4" id={`input-${id}`} data-testid={id}>
      <InputLabel
        id={id}
        required={required}
        label={label}
        textRequired={textRequired}
      />
      {errorMessage && (
        <InputErrorMessage id={`input-${id}-error`} message={errorMessage} />
      )}
      <input
        aria-describedby={helpMessage && `input-${id}-help`}
        aria-invalid={!!errorMessage}
        aria-required={required}
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
          className="text-gray-helpText text-base max-w-prose mt-1.5"
          id={`input-${id}-help`}
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
