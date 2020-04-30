import moment from "moment";

const dateFormat = (originalDate) => {
    const date = new Date(originalDate);
    const UTCDate = date.toUTCString();
    return moment(UTCDate).format("MMMM Do YYYY");
};

export default dateFormat;
