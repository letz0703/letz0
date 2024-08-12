import {revalidatePath, revalidateTag} from "next/cache";

export default function Revalidate(){
	revalidatePath("/shop")
	revalidateTag("/lists")
	return <h1>Revalidated test route</h1>
}

