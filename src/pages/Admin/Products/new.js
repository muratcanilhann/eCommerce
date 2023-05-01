import React from "react";
import { postProduct } from "../../../api";
import { useMutation,useQueryClient } from "react-query";
import { Formik,FieldArray } from "formik";
import { Text,Box, FormControl,FormLabel, Input,Button } from "@chakra-ui/react";
import TextArea from "antd/es/input/TextArea";
import  validationSchema  from "./validations";
import { message } from 'antd';


function NewProduct() {
const queryClient = useQueryClient();
   

const newProductMutation = useMutation(postProduct,{
    onSuccess: () => queryClient.invalidateQueries("admin:products")

});

    const handleSubmit = async (values, bag) =>   {
        
        
        message.loading({content:"Loading..", key:"product_update"})
        
      
        const newValues = {
            ...values,
            photos: JSON.stringify(values.photos)

        }



        newProductMutation.mutate(newValues,{
            onSuccess: () => {
            console.log("succes");

            message.success({
                content:"The product updated",
                key: "product_update",
                duration:2,

            });
            
        }})
    }  

 

    return (
    <div>
        <Text fontSize={"2xl"}>New Product</Text>

        <Formik initialValues={{
            title:"Test",
            description:"Lorem ipsum 12",
            price:"100",
            photos:[],
        }}
       validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
            {
                ({handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting,}) => (

                    <>
                    <Box>
                    <Box m={"5"} textAlign={"left"}>
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input name="title"
                                 onChange={handleChange}
                                  onBlur={handleBlur}
                                   disabled={isSubmitting}
                                    value={values.title}
                                    isInvalid={errors.title && touched.title}
                                      />

                                    {touched.title && errors.title && <Text color="red">{errors.title}</Text>}
                                    
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <TextArea name="description"
                                 onChange={handleChange}
                                  onBlur={handleBlur}
                                   disabled={isSubmitting}
                                    value={values.description}
                                     
                                     />
                                    
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input name="price"
                                 onChange={handleChange}
                                  onBlur={handleBlur}
                                   disabled={isSubmitting} 
                                   value={values.price} 
                                  />

                {touched.price && errors.price && <Text color="red">{errors.price}</Text>}
                            </FormControl>

                            <FormControl mt={"4"}>
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
                                            
                          <Button m={"4"}  type="button" colorScheme="red" onClick={() => arrayHelpers.remove(index)}>Remove</Button>
                                                 
                                            </div> 


                                        ))}
                                        
                                    <Button mt={"5"} onClick={() => arrayHelpers.push('')}>
                                        Add a Photo
                                    </Button>

                                </div>

                                )} />

                            </FormControl>
                        
                        <Button mt={"4"} width={"full"} type="submit" isLoading={isSubmitting}>
                            Save
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


export default NewProduct;