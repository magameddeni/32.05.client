import * as Yup from "yup"

export const validateSchema = Yup.object({
  number: Yup.string().trim().required("Это обязательное поле!"),
  email: Yup.string().email().trim(),
})
