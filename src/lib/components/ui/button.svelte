<script lang="ts">
    export let theme = "white"
    export let text = "Button"
    export let variant = "default"

    let themeColor = "transparent"

    let classes = `bg-${themeColor} text-${themeColor} outline-${themeColor}`

    let outlineColor = null
    let textColor = null
    let bgColor = null
    if (theme == "white") {
        let themeColor = "white"
    }
</script>

<button class="px-6 py-3 text-lg font-medium text-white bg-transparent outline-2 outline-white rounded-lg">
    {text}
</button>
