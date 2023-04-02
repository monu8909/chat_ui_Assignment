import moment from "moment";

export const convertDateTime = (val) => {
    var tempDate = new Date(val);
    const toDateFormat = moment(tempDate).format("DD-MMM-yyyy hh:mm a");
    return toDateFormat;
};