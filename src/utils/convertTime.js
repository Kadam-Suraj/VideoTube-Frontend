export function formatTime(duration) {
    // Round duration to the nearest integer
    const totalSeconds = Math.round(duration);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format time as hh:mm:ss or mm:ss
    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    } else {
        return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }
}

export function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const differenceInSeconds = Math.floor((now - past) / 1000);

    if (differenceInSeconds < 60) {
        return `${differenceInSeconds} seconds ago`;
    }

    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    if (differenceInMinutes === 1) {
        return "1 minute ago";
    }

    if (differenceInMinutes < 60) {
        return `${differenceInMinutes} minutes ago`;
    }


    const differenceInHours = Math.floor(differenceInMinutes / 60);

    if (differenceInHours === 1) {
        return "1 hour ago";
    }

    if (differenceInHours < 24) {
        return `${differenceInHours} hours ago`;
    }

    const differenceInDays = Math.floor(differenceInHours / 24);

    if (differenceInDays === 1) {
        return "1 day ago";
    }

    if (differenceInDays < 7) {
        return `${differenceInDays} days ago`;
    }

    const differenceInWeeks = Math.floor(differenceInDays / 7);
    if (differenceInWeeks === 1) {
        return "1 week ago";
    }

    if (differenceInWeeks < 4) {
        return `${differenceInWeeks} weeks ago`;
    }

    const differenceInMonths = Math.floor(differenceInDays / 30);
    if (differenceInMonths === 1) {
        return "1 month ago";
    }

    if (differenceInMonths < 12) {
        return `${differenceInMonths} months ago`;
    }

    const differenceInYears = Math.floor(differenceInDays / 365);
    if (differenceInYears === 1) {
        return "1 year ago";
    }

    return `${differenceInYears} years ago`;
}

export const getVideDate = (timestamp) => {
    return new Date(timestamp).getDay() === new Date().getDay() ? "Today" : new Date(timestamp).toDateString()
}