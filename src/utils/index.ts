import colorMap from '@/utils/color'
export const getTagBgColor = (tagName: String) => {
    return colorMap[tagName.toLowerCase()]
}