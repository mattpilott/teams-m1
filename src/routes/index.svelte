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
</script>

<svelte:head>
   <title> Silicon Teams</title>
</svelte:head>

<div class="ball">
   <div class="shape" />
</div>

<main class="main">
   <header class="head"> Silicon Teams</header>
   <div class="body">
      <p>Dear downtrodden Teams user,</p>
      <p>
         Whilst your company may all use Teams on their hodgepodge collection of Dells, Acers, Lenovos and HP's you
         stand strong because you, you have Mac.
      </p>
      <p>
         Perhaps Microsoft are dragging their feet on supporting Apple Silicon (I mean they definitely are) or perhaps
         they are taking their time to make an M1 compatible version super awesome 😏 whatever the case it's taking too
         long.
      </p>
      <p>
         I'm here to bring you some good news though there is an M1 version of Teams in the works over at Microsoft.
         It's experimental but if like me you have used the Rosetta version you'll take whatever you can get.
      </p>
      <p>
         Yours,<br />
         Matt
      </p>
   </div>
   <footer class="foot">
      <div>Made by Matt | In no way affiliated with Microsoft</div>
      <a href="https://github.com/mattpilott/teams-m1" target="_blank">Github</a>
   </footer>
</main>

<aside class="aside">
   <header class="head"> Silicon Teams</header>
   <img class="image" src="/icon.png" alt="Teams icon" />
   <a class="button" {href} download on:click={() => ($history = build)}>Download</a>
   <div>
      <div class="meta">Updated {date}</div>
      <div class="meta" class:firm={$history !== build}>
         {$history !== build ? 'New build' : ''}
         {build} @ {size}
      </div>
   </div>
   <footer class="foot">
      <div>Made by Matt<br />In no way affiliated with Microsoft</div>
      <a href="https://github.com/mattpilott/teams-m1" target="_blank">Github</a>
   </footer>
</aside>

<style>
   .ball,
   .main {
      display: none;
   }

   @media (min-width: 40em) {
      @keyframes x {
         100% {
            transform: translateX(calc(100vw - 20rem));
         }
      }
      @keyframes y {
         100% {
            transform: translateY(calc(100vh - 20rem));
         }
      }

      .ball,
      .shape {
         height: 20rem;
         width: 20rem;
      }

      .ball {
         animation: x 15s linear infinite alternate;
         display: block;
         filter: blur(180px);
         left: 0;
         position: absolute;
         top: 0;
      }

      .shape {
         animation: y 10s linear infinite alternate;
         background-color: var(--blue);
         border-radius: 50%;
      }

      .main {
         background-color: white;
         border-radius: 40px;
         box-shadow: 0 5px 20px hsl(0 0% 0% / 0.2);
         display: grid;
         gap: 2.5rem;
         grid-template-rows: auto 1fr auto;
         padding: 5rem;
      }

      .head {
         font-size: 2.5rem;
         font-weight: 600;
         margin-left: -0.125rem;
      }

      .head::first-letter {
         font-size: 2.75rem;
      }

      .body {
         color: var(--ship);
         font-size: 1.25rem;
      }

      .foot {
         display: flex;
         font-size: 0.875rem;
         justify-content: space-between;
      }
   }

   .aside {
      display: grid;
      gap: 2.5rem;
      place-items: center;
   }

   @media (min-width: 40em) {
      .aside {
         place-content: center;
      }
   }

   .aside .head,
   .aside .foot {
      color: white;
      text-align: center;
   }

   @media (min-width: 40em) {
      .aside .head,
      .aside .foot {
         display: none;
      }
   }

   .head {
      font-size: 2rem;
   }

   .image {
      height: 10rem;
      width: 10rem;
   }

   @media (min-width: 40em) {
      .image {
         height: 12rem;
         width: 12rem;
      }
   }

   .button {
      background-image: linear-gradient(94deg, #5a62c9 0%, #3c44b5 100%);
      border-radius: 14px;
      box-shadow: 0 5px 20px hsl(0 0% 0% / 0.2);
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
      min-width: 18rem;
      padding: 1rem;
      text-align: center;
      text-decoration: none;
   }

   .button:hover {
      transform: translateY(-2%);
   }

   .button:active {
      transform: translateY(2%);
   }

   .meta {
      color: hsl(0 0% 60%);
      font-size: 0.875rem;
      text-align: center;
   }

   .firm {
      color: white;
   }

   .meta + .meta {
      margin-top: 0.5rem;
   }
</style>
