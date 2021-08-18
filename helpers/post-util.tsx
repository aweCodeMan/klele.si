import {PostViewInterface} from "../domain/post-view.interface";

export namespace PostUtil {

    export function getCommentDifference(data: { postView?: PostViewInterface, numberOfComments: number }) {
        return data.postView ? (data.numberOfComments - data.postView.numberOfComments) : 0;
    }

    export function getCommentsText(numberOfComments: number) {
        if (numberOfComments === 0) {
            return `${numberOfComments} komentarjev`;
        }

        let text = '';

        const remainder = numberOfComments % 100;

        if (remainder === 1) {
            text = 'komentar';
        } else if (remainder === 2) {
            text = 'komentarja';
        } else if (remainder === 3 || remainder === 4) {
            text = 'komentarji'
        } else {
            text = 'komentarjev'
        }

        return `${numberOfComments} ${text}`;
    }

    export function getPinnedTime(daysToGo: number) {
        if (daysToGo === 0) {
            return `Samo še danes!`;
        }

        let text = '';

        const remainder = daysToGo % 100;

        if (remainder === 1) {
            text = 'dan';
        } else if (remainder === 2) {
            text = 'dneva';
        } else {
            text = 'dni'
        }

        return `Pripeto še ${daysToGo} ${text}`;
    }

    export function getCommentDifferenceText(data: { postView?: PostViewInterface, numberOfComments: number }) {
        const difference = getCommentDifference(data);

        if (difference === 0) {
            return null;
        }

        let text = '';

        const remainder = difference % 100;

        if (remainder === 1) {
            text = 'nov';
        } else if (remainder === 2) {
            text = 'nova';
        } else if (remainder === 3 || remainder === 4) {
            text = 'novi'
        } else {
            text = 'novih'
        }

        return <span className='ml-1 text-red'>(+{difference} {text})</span>;
    }
}
