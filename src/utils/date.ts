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

export const monthText: any = {
    'zh-cn': [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
    ],
    en: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
}

export const weekText = {
    'zh-cn': ['', '一', '', '三', '', '五', ''],
    en: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
}

export const formatP = function (date: any, fmt: string = 'yyyy-MM-dd') {
    var o: any = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
    }
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length)
            )
    return fmt
}

export const PrefixZero = (num, n) => {
    return (Array(n).join(0) + num).slice(-n)
}
