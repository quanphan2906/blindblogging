module.exports = (io, socket) => {
    require("./comments")(io, socket);
    require("./likes")(io, socket);
};
