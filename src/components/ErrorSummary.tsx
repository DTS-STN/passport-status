import { useEffect } from 'react'

import { FormikErrors, FormikValues } from 'formik'
import { Namespace, TFunction } from 'i18next'

export interface ErrorSummaryItem {
  feildId: string
  errorMessage: string
}

export interface ErrorSummaryProps {
  id: string
  errors: ErrorSummaryItem[]
  summary: string
}

export const getErrorSummaryItem = (
  feildId: string,
  errorMessage: string,
): ErrorSummaryItem => ({
  feildId,
  errorMessage,
})

export const getErrorSummaryItems = <T extends FormikValues>(
  formErrors: FormikErrors<T>,
  t: TFunction<Namespace, undefined>,
) => {
  return Object.keys(formErrors)
    .filter((key) => !!formErrors[key])
    .map((key) => getErrorSummaryItem(key, t(formErrors[key] as any)))
}

export const goToErrorSummary = (errorSummaryId: string) => {
  const errorSummaryEl = document.querySelector<HTMLElement>(
    `#${errorSummaryId}`,
  )
  errorSummaryEl?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  errorSummaryEl?.focus()
}

const ErrorSummary = ({ id, errors, summary }: ErrorSummaryProps) => {
  useEffect(() => {
    goToErrorSummary(id)
  }, [id])

  return (
    <section
      id={id}
      className="mb-5 border-l-6 border-accent-error p-5"
      tabIndex={-1}
    >
      <h2 className="mb-3 text-2xl font-bold">{summary}</h2>
      <ul className="list-disc space-y-2 pl-10">
        {errors.map(({ feildId, errorMessage }) => (
          <li key={feildId}>
            <a className="visited:text-link-default" href={`#${feildId}`}>
              {errorMessage}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ErrorSummary
