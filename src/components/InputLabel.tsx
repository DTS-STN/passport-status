export interface InputLabelProps {
  htmlFor?: string
  id: string
  label: string
  required?: boolean
  textRequired?: string
}

const InputLabel = ({
  htmlFor,
  id,
  label,
  required,
  textRequired,
}: InputLabelProps) => {
  return (
    <label id={id} htmlFor={htmlFor} className="mb-2 block font-bold">
      {required && (
        <span className="text-accent-error" aria-hidden="true">
          {'* '}
        </span>
      )}
      {label}
      {required && (
        <strong className="text-accent-error">&nbsp;{textRequired}</strong>
      )}
    </label>
  )
}

export default InputLabel
