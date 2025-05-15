const EnumApiErrorCode = {
    Success: 'S000',
    GeneralError: 'E999',
} as const;

type EnumApiErrorCode = typeof EnumApiErrorCode[keyof typeof EnumApiErrorCode];
export default EnumApiErrorCode;
  