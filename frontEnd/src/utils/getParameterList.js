const getParameterList = (parameter) => {
  let parameterList = null;
  if (parameter)
    parameterList = [
      {
        name: parameter.name,
        value: parameter.value,
      },
    ];
  return parameterList;
};

export default getParameterList;
