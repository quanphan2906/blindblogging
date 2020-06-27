const endsWith = (str, suffix) => {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

export default endsWith;
