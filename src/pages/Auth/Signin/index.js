import React from "react";
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";
import { useNavigate } from "react-router-dom";

import { fetchLogin } from "../../../api";

import { useAuth } from "../../../contexts/AuthContext";
 
function Signin() {
    const {login} = useAuth();
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            email: "",
            password: "",
            
        },
        validationSchema,
        onSubmit: async (values, bag) => {
            try {
                const loginResponse = await fetchLogin({email: values.email, password: values.password});
                console.log(loginResponse);
                login(loginResponse);
                navigate("../profile");
                
            } catch (error) {
                bag.setErrors({ general: error.response.data.message})
            }
        }
    })


    return(
        <div>
        <Flex align={"center"} width={"full"} justifyContent={"center"}>
        <Box pt={"10"}>
        <Box textAlign={"center"}>
            <Heading>SignIn</Heading>
        </Box>
        <Box my={5}>
            {formik.errors.general && (<Alert status="error">
                {formik.errors.general}
            </Alert>)}
        </Box>
        <Box my={"5"} textAlign={"left"}>
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input name="email"
                 onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                   value={formik.values.email}
                   isInvalid={formik.touched.email && formik.errors.email} />
            </FormControl>


            <FormControl mt={"4"}>
                <FormLabel>Password</FormLabel>
                <Input type="password"
                 name="password"
                  onChange={formik.handleChange}
                   onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && formik.errors.password} />
            </FormControl>

            
            
            <Button type="submit" width={"full"} mt={"5"}>Sign In</Button>
        </form>



        </Box>


        </Box>


        </Flex>


        </div>
    )
}

export default Signin;