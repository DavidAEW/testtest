<script>
    import { browser } from '$app/environment';

    let darkMode = true;

    function handleSwitchDarkMode() {
        darkMode = !darkMode;

        localStorage.setItem('theme', darkMode ? 'dark' : 'light');

        darkMode
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark');
    }

    if (browser) {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            darkMode = true;
        } else {
            document.documentElement.classList.remove('dark');
            darkMode = false;
        }
    }
</script>

<div>
    <input checked={darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
    <label for="theme-toggle" />
</div>

<style lang="postcss">
    #theme-toggle {
        @apply invisible;
    }

    #theme-toggle + label {
        @apply inline-block cursor-pointer h-10 w-10 rounded-full duration-300 content-[''];
        background: center / contain no-repeat;
    }

    #theme-toggle:not(:checked) + label {
        @apply bg-amber-400;
        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #fbbf24, 0 0 0 5px #fff, 0 0 0 8px #fbbf24, 0 0 0 9px #fff, 0 0 0 12px #fbbf24;
        animation: spin 10s linear infinite;
    }

    #theme-toggle:checked + label {
        @apply bg-transparent;
        box-shadow: inset -18px -16px 1px 1px #ddd;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
