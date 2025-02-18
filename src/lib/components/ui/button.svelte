<script lang="ts">
    let { theme = "white", text = "Button", variant = "default", class: classList = '' } = $props();

    let themeColor = "transparent"

    let classes = `bg-${themeColor} text-${themeColor} outline-${themeColor}`

    if (variant == "blue") {
    }

    let outlineColor = null
    let textColor = null
    let bgColor = null
    if (theme == "white") {
        let themeColor = "white"
    }
</script>

<button class="px-6 py-3 text-lg font-medium text-white bg-transparent outline-2 outline-white rounded-lg [text-decoration:none] {classList}">
    {text}
</button>
