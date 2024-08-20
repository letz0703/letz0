import {unstable_noStore} from "next/cache"

export function RandomNumber(){
	unstable_noStore()
	return (
		<>
	{Math.random()}
		</>
	)
}