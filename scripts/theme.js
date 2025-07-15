export function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const savedTheme = localStorage.getItem('theme')
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    document.body.classList.toggle('dark', isDark)

    toggleBtn.addEventListener('click', () => {
        const isDarkNow = document.body.classList.toggle('dark')
        localStorage.setItem('theme', isDarkNow ? 'dark' : 'light')
    })
}