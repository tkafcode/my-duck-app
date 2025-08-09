import { useEffect, useState } from "react"

export function useScrolledPastFirstScreen() {
    const [past, setPast] = useState(false)

    useEffect(() => {
        function onScroll() {
            setPast(window.scrollY >= window.innerHeight)
        }
        window.addEventListener("scroll", onScroll)
        onScroll()
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return past
}
