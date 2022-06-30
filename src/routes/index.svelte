<script context="module">
   export async function load({ fetch }) {
      const get_text = await fetch(import.meta.env.VITE_URL).then(r => r.text())
      const text_to_array = get_text.split('\n')
      const find_item = text_to_array.find(e => e.includes('osx-arm64'))

      const build = find_item.split(' ')[0]
      const date = find_item.match('on(.*?)with')[1]
      const size = find_item.match('with(.*?):')[1]
      const href = find_item.match(/\bhttps?:\/\/\S+/gi)

      return { props: { build, date, size, href } }
   }
</script>

<script>
   import '@neuekit/reboot/reboot.css'
   import '../app.css'
   import { storable } from '@neuekit/utils'

   export let build
   export let date
   export let size
   export let href

   let history = storable(false)

   function greet() {
      let hr = new Date().getHours()

      if (hr <= 11) return 'Good Morning 👋'
      if (hr <= 16) return 'Good Afternoon 👋'
      if (hr <= 23) return 'Good Evening 👋'
   }
</script>

<header class="header">
   <div>Teams for Apple Silicon</div>
   <div class="meta">Get the latest build of Microsoft Teams for Apple Silicon with ease</div>
</header>

<main class="main">
   <div class="greet">{greet()}</div>
   <a class="button" {href} download on:click={() => ($history = build)}>
      <span class="overlay">Download Teams</span>
   </a>
   <div class="meta">Last updated {date}</div>
   <div class="meta" class:firm={$history !== build}>
      {$history !== build ? 'New update' : ''}
      {build} | {size}
   </div>
</main>

<footer class="footer meta">Made by Matt | In no way affiliated with Microsoft</footer>

<style>
   .header,
   .footer {
      display: grid;
      font-size: 2.25rem;
      font-weight: 600;
      place-content: center;
      padding: 2rem;
      text-align: center;
   }

   .main {
      display: grid;
      place-content: center;
      place-items: center;
   }

   .greet {
      font-size: 2rem;
      font-weight: 600;
      margin-top: -2rem;
   }

   .button {
      background: linear-gradient(135deg, var(--violet) 0%, var(--portugal) 100%);
      background-size: 200%;
      border: none;
      border-radius: 100px;
      box-shadow: inset 0 0 0 1px hsl(0 0% 100% / 0.1), 0 10px 40px hsl(0 0% 0% / 0.1);
      color: hsl(0 0% 100% / 0.5);
      font-size: 2rem;
      font-weight: 600;
      margin: 3rem 0 2rem;
      padding: 1rem 4rem;
      transition: all 0.75s ease;
   }

   .button:hover {
      background-position: 25% 25%;
      color: hsl(0 0% 100%);
      transform: translateY(-4px);
   }

   .meta {
      color: hsl(240, 20%, 55%);
      font-size: 1rem;
      font-weight: 400;
      margin-top: 1rem;
   }

   .firm {
      color: white;
   }
</style>
