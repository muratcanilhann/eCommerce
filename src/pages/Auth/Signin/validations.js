import * as yup from "yup";

const validations = yup.object().shape({
email: yup.string().email("Gecerli bir email giriniz.").required("Zorunlu alan"),
password: yup.string().min(5, "Parolanız en az 5 karakter içermelidir.").required(),



})

export default validations;