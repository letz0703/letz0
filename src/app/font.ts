import { Inter } from "next/font/google"
import localFont from "next/font/local"

export const inter = Inter({ subsets: ["latin"], variable: "--my-font" });
//export const roboto = Roboto({ subsets: ["latin"], weight: ["400","900"], style:["normal", "italic"]});

export const gowoon = localFont({src:
	[
		{ path: "./fonts/GowunBatang-Regular.ttf",style :"normal" },
		{ path: "./fonts/GowunBatang-Bold.ttf",style :"normal" },
	 ]})