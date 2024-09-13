
page.module.css : Page.module.css fix
#Cache
<!--getItemLimited() lesson13::11:28-->

2024.07.17 수 /// https://arc.net/e/4003E4B5-8225-408C-8575-9D51C7D7CCB0
[v] fix netlify error 2024.07.17 수
netlify.toml → https://arc.net/e/BC3BF0BD-ED25-4D93-9DCC-2734B09001ED
	```toml
	[build]
  	command = "next build"
  	publish = ".next"

	[[plugins]]
  	package = "@netlify/plugin-nextjs"

	[build.environment]
  	NETLIFY_NEXT_PLUGIN_SKIP = "true"
	```
[v] css container errer : https://arc.net/e/5C1339CB-FBCC-47E2-801C-D4FA30413727