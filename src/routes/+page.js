export async function load({ fetch }) {
   const builds = {}
   const get_text = await fetch(import.meta.env.VITE_URL).then(r => r.text())

   let name

   for (const item of get_text.split('\n')) {
      if (item.includes('URLs for')) {
         name = item.match('latest (.*?) ')[1]
      }

      if (item.includes('osx-arm64')) {
         builds[name] = {
            number: item.split(' ')[0],
            date: item.match('on(.*?)with')[1],
            size: item.match('with(.*?):')[1],
            href: item.match(/\bhttps?:\/\/\S+/gi)
         }
      }
   }

   return { builds }
}
