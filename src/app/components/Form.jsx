"use client"

import {useRouter, useSearchParams} from "next/navigation"

export function Form(){
	const searchParams = useSearchParams()
	const router = useRouter()
	return (
		<input value={searchParams.get('q') || ""}
		onChange={(e) => {
			const params = new URLSearchParams(searchParams)
			params.set("q", e.target.value)
			router.push(`/test/?${params.toString()}`)
		}}
		className="bg-gray-400"/>
)
}