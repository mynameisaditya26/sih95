let ioInstance = null;
exports.initSocket = (io) => { ioInstance = io; return ioInstance; };
exports.getSocket = () => ioInstance || { emit: () => {} };
