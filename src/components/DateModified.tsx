import { useClientEnvironment } from '../context/ClientEnvironmentContext';

export interface DateModifiedProps {
  // text to be displayed
  text?: string;

  // id of the element for testing if needed
  id?: string;
}

/**
 * Contains build time stamp
 */
const DateModified = ({ id = 'date-modified', text = 'Date Modified: ' }: DateModifiedProps) => {
  const { BUILD_DATE } = useClientEnvironment();

  //formatting TC Date
  const builddate = BUILD_DATE
    ? BUILD_DATE.substring(0, 4) + '-' + BUILD_DATE.substring(4, 6) + '-' + BUILD_DATE.substring(6, 8)
    : 'DATE-NA';

  return (
    <dl id={id} className="container mx-auto px-4 py-8">
      <dt className="inline">{text}</dt>
      <dd className="inline">
        <time>{builddate}</time>
      </dd>
    </dl>
  );
};

export default DateModified;
