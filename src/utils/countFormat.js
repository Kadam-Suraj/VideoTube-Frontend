const countFormat = (count) => {
    if (!count) return 0;
    if (count < 1000) return count;
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    if (count < 1000000000) return `${(count / 1000000).toFixed(1)}M`;
    return `${(count / 1000000000).toFixed(1)}B`;
}
export default countFormat;