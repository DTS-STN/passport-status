import React, { FC } from 'react'
import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel'

export interface InputFieldProps {
  id: string
  name: string
  label: string
  required?: boolean
  describedBy?: string
  textRequired?: string
  errorMessage?: string
  type?: React.HTMLInputTypeAttribute
  value?: string | number | readonly string[]
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
  describedBy,
}) => {
  return (
    <div className="block mb-4" id={`input-${id}`} data-testid={id}>
      <InputLabel
        id={id}
        required={required}
        label={label}
        textRequired={textRequired}
      />
      {errorMessage ? <InputErrorMessage message={errorMessage} /> : null}
      <input
        className={`block h-9 py-1.5 px-3 border rounded ${
          errorMessage ? 'border-accent-error' : 'border-neutral-400'
        } focus:outline-none focus:border-sky-500 focus:ring-sky-500`}
        id={id}
        name={name}
        type={type}
        value={value ?? ''}
        onChange={onChange}
        aria-required={required}
        aria-describedby={describedBy && id + 'Help'}
      />
      {describedBy && (
        <div className="text-gray-helpText text-sm md:w-2/3" id={id + 'Help'}>
          {describedBy}
        </div>
      )}
    </div>
  )
}

InputField.defaultProps = {
  type: 'text',
}

export default InputField
