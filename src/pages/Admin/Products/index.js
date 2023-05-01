import {useMemo} from "react";
import { useQuery,useMutation, useQueryClient, } from "react-query";
import { fetchProductList, deleteProduct } from "../../../api";
import { Table,Popconfirm } from "antd";
import { Text,Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";


function AdminProducts() {

	

	const {isLoading, isError, data, error} = useQuery('admin:products',fetchProductList);

	const queryClient = useQueryClient();

	const deleteMutation = useMutation(deleteProduct,{
		onSuccess: () => queryClient.invalidateQueries("admin:products")
	
	});

	const columns = useMemo(() => {
		return [{
			title: "Title",
			dataIndex: "title",
			key:"title"
		},
		{
			title: "Price",
			dataIndex: "price",
			key:"price"
		},
		{
			title:"Created at",
			dataIndex:"createdAt",
			key:"createdAt"
		},
		{
			title:"Action",
			key:"action",
			render: (text, record) => (
				<>
				<Link to={`/admin/products/${record._id}`}>Edit</Link>
				<Popconfirm
				title="Are you sure ?"
				onConfirm={() => {
				deleteMutation.mutate(record._id,{
					onSuccess: () => {
					alert("Deleted");
					
				}})
				}}
				onCancel={() => console.log("Cancelled")}
				okText="Yes"
				cancelText="No"
				placement="left"
				>
				
				<Link style={{marginLeft:5}}>Delete</Link>
	
				</Popconfirm>
				</>
			),
			
		},
	];
		
	})


	if (isLoading) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>Error</div>
	}
	

	return( <div>
			<Flex justifyContent={"space-between"} alignItems={"center"}>
			<Text fontSize= "2xl" p="5">Products</Text>	

		<Link to={"/admin/products/new	"}><Button >New Product</Button></Link>
			</Flex>

			<Table dataSource={data} columns={columns} rowKey={"_id"} />

	</div>
	);
}

export default AdminProducts;