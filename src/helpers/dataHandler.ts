import { slugfy } from './slugfy';

/**
 * Gets a value to score and transforms in a number
 * Could be used to format data like goals, apps, assits when you've a value as '-'
 * @param value the score value
 * @returns the score value as number
 */
export const formatScores = (value: string | number): number => {
    if (value === '-') {
        return 0;
    }

    return Number(value);
};

/**
 * Transforms a string PPG in a numeric value
 * @param value the ppg as string
 * @returns the ppg as number like 1.5
 */
export const formatPPG = (value: string): number => {
    if (value === '-') {
        return 0;
    }

    return Number(value.replace(',', '.'));
};

/**
 * Transforms a string as minutesPlayed as number
 * @param value the minutes as string
 * @returns the minutes as number
 */
export const formatMinutes = (value: string): number =>
    Number(value.replace(/\D+/g, ''));

/**
 * Transforms a data string in a timestamp number
 * @param birth the birth as string
 * @returns the birth as timestamp number
 */
export const formatBirth = (birth: string): number => {
    const monthArr = [
        'Jan',
        'Fev',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    let formatedBirth = birth.replace(/\s/g, '');
    let month: string, day: number, year: number;

    if (formatedBirth.includes('(') && formatedBirth.includes(')')) {
        formatedBirth = formatedBirth.substring(0, formatedBirth.length - 4);

        month = formatedBirth.substring(0, 3);
        day = Number(formatedBirth.substring(3, 5));
        year = Number(formatedBirth.substring(6, 10));
    }

    const finalDate = new Date(year!, monthArr.indexOf(month!), day!).getTime();

    return finalDate;
};

/**
 *
 * @param value the season year as string
 * @returns the season year as number
 */
export const formatSeasonYear = (value: string): number => {
    let formatedValue: number;

    if (value.indexOf('/') > -1) {
        const season = value.split('/')[0];

        // to deal with seasons like 20/21
        if (season.length === 2) {
            const seasonTwoDigts = Number(season);

            if (seasonTwoDigts >= 0 && seasonTwoDigts <= 40) {
                formatedValue = 2000 + seasonTwoDigts;
            } else {
                formatedValue = 1900 + seasonTwoDigts;
            }
        }

        return formatedValue!;
    }

    return Number(value);
};

/**
 * Formats the data header key value removing spaces and special characters
 * @param value the data header key value
 * @returns a formated string
 */
export const formatDataHeaderKey = (value: string): string => {
    let formatedValue = value.trim();
    formatedValue = formatedValue.replace(':', '');
    formatedValue = slugfy(formatedValue);

    switch (formatedValue) {
        case 'date-of-birth-age':
            return 'birth';
        case 'place-of-birth':
            return 'cityBirth';
        case 'citizenship':
            return 'countryBirth';
        case 'former-international':
            return 'formerInternational';
        case 'contract-expires':
            return 'contractExpires';
        case 'date-of-death':
            return 'dateDeath';
        default:
            return formatedValue;
    }
};

/**
 * Formats the data header value removing spaces and special characters
 * @param value the data header value
 * @returns a formated string
 */
export const formatDataHeaderValue = (
    value: string,
    tip?: string,
): string | number => {
    if (tip === 'birth') return formatBirth(value.trim());

    return value.trim();
};

/**
 * Resizes the image URL
 * @param imageURL the full image url
 * @param oldSize the old size
 * @param newSize the new size
 * @param removeTimestamp determines if the timestamp from url should be removed
 * @returns the resized image url
 */
export const imageResize = (
    imageURL: string,
    oldSize: string,
    newSize: string,
    removeTimestamp?: boolean,
): string => {
    if (removeTimestamp && imageURL.includes('?') && imageURL.includes('=')) {
        imageURL = imageURL.split('?')[0];
    }

    return imageURL.replace(oldSize, newSize);
};

/**
 * Gets the League id from image URL
 * @param url
 * @returns the League id as string
 */
export const getLeagueExternalIdFromImg = (url: string): string =>
    url.split('/').splice(-1)[0].split('.')[0];