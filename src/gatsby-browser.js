let offsetY = 0

const getTargetOffset = hash => {
    const id = window.decodeURI(
        hash.replace(`#`, ``)
            .replace(/Ğ/g, 'g')
            .replace(/Ü/g, 'u')
            .replace(/Ş/g, 's')
            .replace(/I/g, 'i')
            .replace(/İ/g, 'i')
            .replace(/Ö/g, 'o')
            .replace(/Ç/g, 'c')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/i̇/g, "i")
            .replace(/-+/g, "-")
    )
    if (id !== ``) {
        const element = document.getElementById(id)
        if (element) {
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop
            let clientTop =
                document.documentElement.clientTop || document.body.clientTop || 0
            let computedStyles = window.getComputedStyle(element)
            let scrollMarginTop =
                computedStyles.getPropertyValue(`scroll-margin-top`) ||
                computedStyles.getPropertyValue(`scroll-snap-margin-top`) ||
                `0px`

            return (
                element.getBoundingClientRect().top +
                scrollTop -
                parseInt(scrollMarginTop, 10) -
                clientTop -
                offsetY
            )
        }
    }
    return null
}

exports.onInitialClientRender = (_, pluginOptions) => {
    if (pluginOptions.offsetY) {
        offsetY = pluginOptions.offsetY
    }

    requestAnimationFrame(() => {
        const offset = getTargetOffset(window.location.hash)
        if (offset !== null) {
            window.scrollTo(0, offset)
        }
    })
}

exports.shouldUpdateScroll = ({routerProps: {location}}) => {
    const offset = getTargetOffset(location.hash)
    return offset !== null ? [0, offset] : true
}
