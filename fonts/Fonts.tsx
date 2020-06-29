import RalewayExtraLightEot from './raleway-v16-latin/raleway-v16-latin-200.eot';
import RalewayExtraLightSvg from './raleway-v16-latin/raleway-v16-latin-200.svg';
import RalewayExtraLightTtf from './raleway-v16-latin/raleway-v16-latin-200.ttf';
import RalewayExtraLightWoff from './raleway-v16-latin/raleway-v16-latin-200.woff';
import RalewayExtraLightWoff2 from './raleway-v16-latin/raleway-v16-latin-200.woff2';
import RalewayLightEot from './raleway-v16-latin/raleway-v16-latin-300.eot';
import RalewayLightSvg from './raleway-v16-latin/raleway-v16-latin-300.svg';
import RalewayLightTtf from './raleway-v16-latin/raleway-v16-latin-300.ttf';
import RalewayLightWoff from './raleway-v16-latin/raleway-v16-latin-300.woff';
import RalewayLightWoff2 from './raleway-v16-latin/raleway-v16-latin-300.woff2';

// https://google-webfonts-helper.herokuapp.com/fonts/raleway?subsets=latin

/* raleway-200 - latin */
export const raleway200 = {
  fontFamily: "Raleway",
  fontStyle: "normal",
  // fontDisplay: "swap",
  fontWeight: 200,
  // src: url('../fonts/raleway-v16-latin-200.eot'); /* IE9 Compat Modes */
  src: `local('Raleway ExtraLight'), local('Raleway-ExtraLight'),
        url(${RalewayExtraLightEot}?#iefix) format('embedded-opentype'), /* IE6-IE8 */
        url(${RalewayExtraLightWoff2}) format('woff2'), /* Super Modern Browsers */
        url(${RalewayExtraLightWoff}) format('woff'), /* Modern Browsers */
        url(${RalewayExtraLightTtf}) format('truetype'), /* Safari, Android, iOS */
        url(${RalewayExtraLightSvg}#Raleway) format('svg'); /* Legacy iOS */`,
};

/* raleway-300 - latin */
export const raleway300 = {
  fontFamily: "Raleway",
  fontStyle: "normal",
  // fontDisplay: "swap",
  fontWeight: 300,
  // src: url('../fonts/raleway-v16-latin-300.eot'); /* IE9 Compat Modes */
  src: `local('Raleway Light'), local('Raleway-Light'),
        url(${RalewayLightEot}?#iefix) format('embedded-opentype'), /* IE6-IE8 */
        url(${RalewayLightWoff2}) format('woff2'), /* Super Modern Browsers */
        url(${RalewayLightWoff}) format('woff'), /* Modern Browsers */
        url(${RalewayLightTtf}) format('truetype'), /* Safari, Android, iOS */
        url(${RalewayLightSvg}#Raleway) format('svg'); /* Legacy iOS */`,
};
