export interface FieldSetLegendProps {
  htmlFor?: string;
  id: string;
  label: string;
  required?: boolean;
  textRequired?: string;
}

const FieldSetLegend = ({ id, label, required, textRequired }: FieldSetLegendProps) => {
  return (
    <legend>
      <p id={id} className="mb-2 block font-bold">
        {label}
        {required && <strong aria-hidden="true">&nbsp;{textRequired}</strong>}
      </p>
    </legend>
  );
};

export default FieldSetLegend;
