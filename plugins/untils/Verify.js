var Reg = {
  regPhone: /^1[34578][0-9]\d{8}$/
}
export const regText = params => {
  return Reg.regPhone.test(params)
}

