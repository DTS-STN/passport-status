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
      {label}
      {required && <span>&nbsp;{textRequired}</span>}
    </label>
  )
}

export default InputLabel
