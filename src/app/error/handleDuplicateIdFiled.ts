import { TErrorSources, TGenericResponseError } from "../interface/error";

const handleDuplicateFiledError = (err: any): TGenericResponseError => {
  const regex = /dup key: \{ name: "([^"]+)" \}/;

  const match = err?.message.match(regex);

  const duplicateMessage = match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${duplicateMessage} is already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate filed",
    errorSources: errorSources,
  };
};

export const HandleDuplicateFiledError = handleDuplicateFiledError;
