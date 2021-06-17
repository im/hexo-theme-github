export const getDateString = (date: any) => {
    if (!date) return ''
    const d = new Date(date)
    if (Number.isNaN(d.getTime())) return ''

    return d.toLocaleDateString('fr-CA', {
        timeZone: 'UTC',
    })
}

export const format = (date: any) =>
    new Date(date).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        month: 'short',
        day: 'numeric',
    })

export const getRelativeTimeFromNow = (date: any) => {
    const min = 60 * 1000
    const hour = min * 60
    const day = 24 * hour
    const week = 7 * day
    const month = 30 * day
    const year = day * 365

    const now = Date.now()
    const ts = new Date(date).getTime()
    const diff = now - ts

    const map: Record<string, number> = {
        min,
        hour,
        day,
        week,
        month,
        year,
    }

    const keys = ['min', 'hour', 'day', 'week', 'month', 'year']
    let unit = keys[0]
    for (let i = 0; i < keys.length; i++) {
        unit = keys[i]

        if (diff < map[unit]) {
            if (i === 0) {
                return 'Just now'
            } else {
                unit = keys[i - 1]
            }
            break
        }
    }

    const num = Math.ceil(diff / map[unit]) - 1
    return `${num} ${unit}${num > 1 ? 's' : ''} ago`
}
