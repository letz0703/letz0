"use client"
import {FormEvent, useState} from "react"

const [email, setemail] = useState()
async function handleSubmit(e: FormEvent) {
  e.preventDefault()
  //if (stripe == null || elements == null || email == null) return
  if (email == null) return
  return
}
