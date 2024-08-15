import {revalidatePath, revalidateTag} from "next/cache";

export const revalidate = 5;
export default function Revalidate(){
	revalidatePath("/shop")
	revalidateTag("/lists")
	return <h1>Revalidated test route</h1>
}

