import * as url from 'url';

export const isValidUrl = (urlString: string): boolean => {
  try {
    const parsedUrl = new URL(urlString);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (error) {
    return false; // URL is not valid
  }
};
