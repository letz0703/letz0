//import {cookies, headers} from "next/headers";
import {Form} from "../components/Form";

//import {RandomNumber} from "../components/random";
export default async function Page({searchParams}){
	//const h = headers().get('User-Agent')
	//console.log(h);
	console.log(searchParams);
	//const c = cookies().getAll()
	//const c = cookies().set('name', 'mani')
	//console.log(c);

	return (

	<><h1>{searchParams.q}</h1><Form /></>
	//return  <h1>Hi</h1>
	//return <h1><RandomNumber/></h1>
	)

}