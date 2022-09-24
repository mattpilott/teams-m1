<script context="module">
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

      return { props: { builds } }
   }
</script>

<script>
   import '@neuekit/reboot/reboot.css'
   import '../app.css'
   import { storable } from '@neuekit/utils'

   export let builds
   export let version = Object.keys(builds).at(-1)

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
   <a class="button" href={builds[version].href} download on:click={() => ($history = builds[version].number)}
      >Download</a
   >
   <select class="drop" bind:value={version}>
      {#each Object.keys(builds) as build}
         <option value={build}>{build} build</option>
      {/each}
   </select>
   <div>
      <div class="meta">Updated {builds[version].date}</div>
      <div class="meta" class:firm={$history !== builds[version].number}>
         {$history !== builds[version].number ? 'New build' : ''}
         {builds[version].number} @ {builds[version].size}
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

   .drop {
      appearance: none;
      background-color: hsl(0 0% 100% / 0.1);
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.3856 16.6C12.9309 17.3876 12.7036 17.7814 12.4067 17.9135C12.1478 18.0288 11.8522 18.0288 11.5933 17.9135C11.2964 17.7814 11.0691 17.3876 10.6144 16.6L6.45744 9.4C6.00272 8.61241 5.77536 8.21861 5.80933 7.89547C5.83895 7.61361 5.98678 7.35757 6.21606 7.19098C6.47893 7 6.93365 7 7.84308 7L16.1569 7C17.0664 7 17.5211 7 17.7839 7.19098C18.0132 7.35757 18.1611 7.61362 18.1907 7.89547C18.2246 8.21861 17.9973 8.61241 17.5426 9.4L13.3856 16.6Z' fill='white'/%3E%3C/svg%3E");
      background-position: right 0.5rem center;
      background-size: 16px;
      border-radius: 8px;
      color: hsl(0 0% 100% / 0.8);
      display: inline-block;
      margin-top: -1.5rem;
      padding: 0.25rem 2rem 0.25rem 0.5rem;
      text-align: center;
      text-transform: capitalize;
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
