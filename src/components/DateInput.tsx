export interface DateSelectOption {
  value: string
  label: string
}
export type DateInputSelectOptions = DateSelectOption[]
export type DateInputType = 'month' | 'day' | 'year'

export type DateInputOnChangeEvent = (
  e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  type: DateInputType,
) => void

export interface DateInputProps {
  ariaDescribedby?: string
  dateSelectLabelId: string
  error?: boolean
  id: string
  label: string
  onChange: DateInputOnChangeEvent
  options?: DateInputSelectOptions
  required?: boolean
  type: DateInputType
  value: string
  max?: number
  min?: number
}

const DateInput = ({
  ariaDescribedby,
  dateSelectLabelId,
  error,
  id,
  label,
  onChange,
  options,
  required,
  type,
  value,
  max,
  min,
}: DateInputProps) => {
  const handleOnInputChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = (e) => onChange(e, type)

  return (
    <div className="flex flex-col space-y-2">
      <label
        id={`date-select-${id}-label`}
        htmlFor={id}
        className="text-base font-bold"
      >
        {label}
      </label>
      {type === 'month' ? (
        <select
          id={id}
          value={value}
          onChange={handleOnInputChange}
          aria-describedby={ariaDescribedby}
          aria-invalid={error ? true : undefined}
          aria-labelledby={`${dateSelectLabelId} date-select-${id}-${type}-label`}
          aria-required={required ? true : undefined}
          className={`w-40 rounded border px-3 py-1 ${
            error ? 'border-accent-error' : 'border-neutral-400'
          } bg-white focus:border-sky-500 focus:outline-none focus:ring-sky-500`}
        >
          <option value="" disabled></option>
          {options
            ? options.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))
            : []}
        </select>
      ) : (
        <input
          id={id}
          value={value}
          type="number"
          onChange={handleOnInputChange}
          aria-describedby={ariaDescribedby}
          aria-invalid={error ? true : undefined}
          aria-labelledby={`${dateSelectLabelId} date-select-${id}-${type}-label`}
          aria-required={required ? true : undefined}
          className={`w-30 rounded border px-3 py-1 ${
            error ? 'border-accent-error' : 'border-neutral-400'
          } bg-white focus:border-sky-500 focus:outline-none focus:ring-sky-500`}
          max={max}
          min={min}
        ></input>
      )}
    </div>
  )
}

export default DateInput
