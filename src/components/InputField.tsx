import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel'

export interface InputFieldProps {
  errorMessage?: string
  helpMessage?: React.ReactNode
  helpMessageSecondary?: React.ReactNode
  id: string
  label: string
  max?: string
  name: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  required?: boolean
  textRequired?: string
  type?: React.HTMLInputTypeAttribute
  value?: string | number | readonly string[]
}

const InputField = ({
  errorMessage,
  helpMessage,
  helpMessageSecondary,
  id,
  label,
  max,
  name,
  onChange,
  required,
  textRequired,
  type,
  value,
}: InputFieldProps) => {
  const inputErrorMessageId = `input-${id}-error`
  const inputHelpMessageId = `input-${id}-help`
  const inputHelpMessageSecondaryId = `input-${id}-help-secondary`
  const inputWrapperId = `input-${id}`
  const inputLabelId = `input-${id}-label`

  const getAriaDescribedby = () => {
    const ariaDescribedby: string[] = []
    if (errorMessage) ariaDescribedby.push(inputErrorMessageId)
    if (helpMessage) ariaDescribedby.push(inputHelpMessageId)
    if (helpMessageSecondary) ariaDescribedby.push(inputHelpMessageSecondaryId)
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
      {helpMessage && (
        <div
          className="mb-1.5 max-w-prose text-base text-gray-600"
          id={inputHelpMessageId}
        >
          {helpMessage}
        </div>
      )}
      <input
        aria-describedby={getAriaDescribedby()}
        aria-invalid={errorMessage ? true : undefined}
        aria-labelledby={inputLabelId}
        aria-required={required ? true : undefined}
        className={`block h-9 rounded border px-3 py-1.5 ${
          errorMessage ? 'border-accent-error' : 'border-neutral-400'
        } focus:border-sky-500 focus:outline-none focus:ring-sky-500`}
        id={id}
        max={max}
        name={name}
        onChange={onChange}
        type={type}
        value={value ?? ''}
      />
      {helpMessageSecondary && (
        <div
          className="mt-1.5 max-w-prose text-base text-gray-600"
          id={inputHelpMessageSecondaryId}
        >
          {helpMessageSecondary}
        </div>
      )}
    </div>
  )
}

InputField.defaultProps = {
  type: 'text',
}

export default InputField
