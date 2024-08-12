import {database} from "./firebase";

export async function getItemLimited(){
	return await get(ref(database, 'japitems',{
		next: {tags: ["japitems", "1"]}
	}))
	.then(snapshot => {
		if (snapshot.exists()) {
			const remoteJapitems = Object.values(snapshot.val());
			setJapitems(remoteJapitems);
			localStorage.setItem("japitems", JSON.stringify(remoteJapitems));
		}
	})
	.finally(() => setIsLoading(false));
}