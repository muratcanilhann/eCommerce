import React from "react";
import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import { useQuery } from "react-query";
import { Formik,FieldArray } from "formik";
import { Text,Box, FormControl,FormLabel, Input, Textarea,Button } from "@chakra-ui/react";
import TextArea from "antd/es/input/TextArea";
import  validationSchema  from "./validations";
import { message } from 'antd';


function ProductDetail() {
    const {product_id} = useParams();
    const {isLoading,isError,data,error} = useQuery(["admin:product",product_id],() => fetchProduct(product_id));



    if (isLoading) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>Error</div>
	}



    const handleSubmit = async (values, bag) =>   {
        
        
        console.log("submited");
        message.loading({content:"Loading..", key:"product_update"})

        try {
            await updateProduct(values, product_id);
            message.success({
                content:"The product updated",
                key: "product_update",
                duration:2,

            });
        } catch (e) {
            message.error("The product does not");
        }
    }  

 

    return (
    <div>
        <Text fontSize={"2xl"}>Edit</Text>

        <Formik initialValues={{
            title:data.title,
            description:data.description,
            price:data.price,
            photos:data.photos,
        }}
       validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
            {
                ({handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting,}) => (

                    <>
                    <Box>
                    <Box m={5} textAlign={"left"}>
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input name="title"
                                 onChange={handleChange}
                                  onBlur={handleBlur}
                                   disabled={isSubmitting}
                                    value={values.title}
                                    isInvalid={touched.title && errors.title}  />

                                    {touched.title && errors.title && <Text color="red">{errors.title}</Text>}
                                    
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <TextArea name="description"
                                 onChange={handleChange}
                                  onBlur={handleBlur}
                                   disabled={isSubmitting}
                                    value={values.description}
                                    isInvalid={touched.description && errors.description}  />
                                     {touched.description && errors.description && <Text color="red">{errors.description}</Text>}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input name="price"
                                 onChange={handleChange}
                                  onBlur={handleBlur}
                                   disabled={isSubmitting} 
                                   value={values.price} 
                                   isInvalid={touched.price && errors.price} />

                {touched.price && errors.price && <Text color="red">{errors.price}</Text>}
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Photos</FormLabel>
                                <FieldArray name="photos" render={(arrayHelpers) => (
                                <div>
                                    {
                                        values.photos && values.photos.map((photo,index) => (
                                            <div key={index}>
                                                <Input 
                                                name={`photos.${index}`}
                                                value={photo}
                                                disabled={isSubmitting}
                                                onChange={handleChange}
                                                width={"3xl"}
                                                 />
                                            
                          <Button m={4}  type="button" colorScheme="red" onClick={() => arrayHelpers.remove(index)}>Remove</Button>
                                                 
                                            </div> 


                                        ))}
                                        
                                    <Button mt={5} onClick={() => arrayHelpers.push('')}>
                                        Add a Photo
                                    </Button>

                                </div>

                                )} />

                            </FormControl>
                        
                        <Button mt={4} width={"full"} type="submit" isLoading={isSubmitting}>
                            Update
                        </Button>
                        </form>
                    </Box>
                    </Box>
                    
                    </>
                )
            }
        </Formik>
    </div>
    )
}


export default ProductDetail;