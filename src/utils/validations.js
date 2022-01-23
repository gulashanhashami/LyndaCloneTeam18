const formatErrors = (errorsArray) => {
    return errorsArray.map(({ msg, param }) => {
      return {
        message: msg,
        field: param,
      };
    });
  };
  
  module.exports = { formatErrors };
