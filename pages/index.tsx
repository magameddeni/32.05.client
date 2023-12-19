import React, { useState } from "react"
import InputMask from "react-input-mask"
import axios from "axios"
import { useFormik } from "formik"
import { useMutation } from "@tanstack/react-query"
import { validateSchema } from "../utils/validateSchema"

interface IdataType {
  email: string
  number: number
}

export default function Home() {
  const [data, setData] = useState<IdataType | null>(null)

  const { mutate, isSuccess } = useMutation<IdataType>({
    mutationFn: async () => {
      const { data, status } = await axios.post(
        "http://localhost:5000/api/process",
        {
          ...formik.values,
        },
      )
      if (status !== 200) return new Error("Ошибка получения данных")
      return data
    },
    onSuccess(data) {
      formik.resetForm()
      setData(data)
    },
  })

  const initialValuesFormik = { number: 0, email: "" }
  const formik = useFormik<IdataType>({
    initialValues: initialValuesFormik,
    validationSchema: validateSchema,
    onSubmit: () => {
      mutate()
    },
  })

  return (
    <div>
      <div>
        <div>
          <div>{formik.touched.email && formik.errors.email}</div>
          <input
            placeholder='Почта'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <div>{formik.touched.number && formik.errors.number}</div>
          <InputMask
            mask='**_**_**'
            placeholder='Номер'
            name='number'
            value={formik.values.number}
            onChange={formik.handleChange}
          />
        </div>
        <button onClick={formik.submitForm}>Отправить</button>
      </div>

      <div>
        {isSuccess && data && (
          <div>
            <div>почта {data.email}</div>
            <div>номер {data.number}</div>
          </div>
        )}
      </div>
    </div>
  )
}
