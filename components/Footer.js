import PropTypes from 'prop-types'
import DateModified from '../components/DateModified'

/**
 * footer element for all pages
 */

export default function Footer(props) {
  return (
    <footer>
      <h2 className="sr-only">siteFooter</h2>
      <div className="container mx-auto px-6 mt-5">{props.t.reportProblem}</div>
      <DateModified text={props.t.dateModified} />
      <div className="w-full">
        <div className="w-full h-auto bg-footer-parliament-image bg-no-repeat bg-right-bottom bg-[#173451]">
          <div
            className="py-7 container mx-auto px-6"
            role="navigation"
            aria-labelledby="footerNav1"
          >
            <h3 className="sr-only" id="footerNav1">
              {props.footerNav1}
            </h3>
            <ul className="flex flex-col text-sm sm:grid sm:grid-cols-2 xl:grid xl:grid-cols-3 sm:gap-1">
              {' '}
              {props.footerBoxLinks.map((value, index) => {
                return (
                  <li
                    key={index}
                    className="text-white w-64 md:w-56 lg:w-80 my-2.5 hover:underline"
                  >
                    <a className="font-body" href={value.footerBoxlink}>
                      {value.footerBoxLinkText}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="w-full h-full pb-4">
          <div className="h-auto pt-5 container mx-auto px-6 flex flex-col xl:flex xl:flex-row md:justify-between">
            <div
              className="mt-3.5 xl:mt-5"
              role="navigation"
              aria-labelledby="footerNav2"
            >
              <h3 className="sr-only" id="footerNav2">
                {props.footerNav2}
              </h3>
              <ul className="flex flex-col md:grid md:grid-cols-2 xl:flex lg:flex-row">
                {props.links.map((value, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        index === 0
                          ? 'lg:mb-4 mb-5 mr-2.5 list-inside list-disc xl:list-none text-sm'
                          : 'lg:mb-4 mb-5 mr-2.5 list-inside list-disc text-sm'
                      }
                    >
                      <a
                        className="text-sm font-body text-[#21303F] hover:text-[#5E8EBD]"
                        data-cy="social-media-link"
                        href={value.link}
                      >
                        {value.linkText}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <img
                className="mb-2.5 mt-8 xl:mt-0 h-6 md:h-10 w-auto float-right"
                src={props.footerLogoImage}
                alt={props.footerLogoAltText}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  /**
   * Screenreader section indicator
   */
  footerNav1: PropTypes.string,

  /**
   * Screenreader section indicator
   */
  footerNav2: PropTypes.string,
  /**
   * array of objects containing the link text and link
   */
  footerBoxLinks: PropTypes.arrayOf(
    PropTypes.shape({
      footerBoxlink: PropTypes.string.isRequired,
      footerBoxLinkText: PropTypes.string.isRequired,
    })
  ),
  /**
   * array of objects containing the link text and link
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      linkText: PropTypes.string.isRequired,
    })
  ),

  /**
   * alt text for footer canada-ca logo
   */
  footerLogoAltText: PropTypes.string.isRequired,

  /**
   * image path for footer logo
   */
  footerLogoImage: PropTypes.string.isRequired,
}
